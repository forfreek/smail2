import { nanoid } from "nanoid";
import Parser from "postal-mime";
import { createRequestHandler } from "react-router";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

trashmail.space {
	// 1. 【保持原样】处理网页访问和接收邮件（这是你原本的代码，原封不动）
	async fetch(request, env, ctx) {
		return requestHandler(request, {
			cloudflare: { env, ctx },
		});
	},

	// 2. 【保持原样】接收邮件并存入 D1 数据库和 R2 存储（这是你原本的代码，原封不动）
	async email(msg, env) {
		const parser = new Parser();
		const ab = await new Response(msg.raw).arrayBuffer();
		const parsed = await parser.parse(ab);
		const id = nanoid();

		await env.D1.prepare(
			"INSERT INTO emails (id, to_address, from_name, from_address, subject, time) VALUES (?, ?, ?, ?, ?, ?)",
		)
			.bind(id, msg.to, parsed.from?.name, parsed.from?.address, parsed.subject, Date.now())
			.run();

		await env.R2.put(id, ab);
	},

	// 3. 【全新添加】24小时自动双重清理逻辑（精准清理 D1 和 R2，防止爆盘）
	async scheduled(event, env, ctx) {
		// 计算 24 小时前的时间戳（1天 = 24小时 * 60分钟 * 60秒 * 1000毫秒）
		const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

		try {
			// 第一步：从 D1 数据库中找出所有 24 小时以前的过期邮件 ID
			const { results } = await env.D1.prepare("SELECT id FROM emails WHERE time < ?")
				.bind(oneDayAgo)
				.all();

			if (results && results.length > 0) {
				// 第二步：循环把这些过期的邮件从 R2 和 D1 里全部彻底销毁
				for (const row of results) {
					// 1. 从 R2 对象存储中删除对应的邮件源文件
					await env.R2.delete(row.id);
					// 2. 从 D1 数据库中删除该条邮件记录
					await env.D1.prepare("DELETE FROM emails WHERE id = ?").bind(row.id).run();
				}
				console.log(`【定时清理】成功销毁了 ${results.length} 封过期邮件及关联文件！`);
			} else {
				console.log("【定时清理】没有发现需要清理的过期邮件。");
			}
		} catch (err) {
			console.error("【定时清理】发生错误:", err);
		}
	},
} satisfies ExportedHandler<Env>;
