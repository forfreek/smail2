import { getAllBlogSlugs, getBlogPageCount } from "~/blog/data";
import { SUPPORTED_LOCALES, toLocalePath } from "~/i18n/config";
import {
	BASE_URL,
	BLOG_BASE_PATH,
	BLOG_INDEXABLE_LOCALES,
	MARKDOWN_BASE_PATHS,
	MARKDOWN_INDEXABLE_LOCALES,
} from "~/seo.config";

const STATIC_PATHS = ["/", "/contact"] as const;

export async function loader() {
	const seen = new Set<string>();
	const paths: string[] = [];

	function addPath(path: string) {
		if (seen.has(path)) {
			return;
		}
		seen.add(path);
		paths.push(path);
	}

	for (const locale of SUPPORTED_LOCALES) {
		for (const staticPath of STATIC_PATHS) {
			const localizedPath = toLocalePath(staticPath, locale);
			addPath(localizedPath);
		}
	}

	for (const locale of MARKDOWN_INDEXABLE_LOCALES) {
		for (const basePath of MARKDOWN_BASE_PATHS) {
			const localizedPath = toLocalePath(basePath, locale);
			addPath(localizedPath);
		}
	}

	const blogSlugs = getAllBlogSlugs();
	for (const locale of BLOG_INDEXABLE_LOCALES) {
		const blogListPath = toLocalePath(BLOG_BASE_PATH, locale);
		addPath(blogListPath);

		const totalPages = getBlogPageCount(locale);
		for (let page = 2; page <= totalPages; page++) {
			const pagedPath = toLocalePath(`${BLOG_BASE_PATH}/page/${page}`, locale);
			addPath(pagedPath);
		}

		for (const slug of blogSlugs) {
			const blogPostPath = toLocalePath(`${BLOG_BASE_PATH}/${slug}`, locale);
			addPath(blogPostPath);
		}
	}

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
		paths
			.map((path) => {
				return `\n  <url>\n    <loc>${BASE_URL}${path}</loc>\n  </url>`;
			})
			.join("") +
		"\n</urlset>\n";

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
}
