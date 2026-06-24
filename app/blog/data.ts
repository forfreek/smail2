import type { Locale } from "~/i18n/config";

export const BLOG_LOCALES = [
	"en",
	"zh",
	"es",
	"fr",
	"de",
	"ja",
	"ko",
	"ru",
	"pt",
	"ar",
] as const;
export const BLOG_PAGE_SIZE = 6;

export type BlogLocale = (typeof BLOG_LOCALES)[number];

export type BlogPostMeta = {
	slug: string;
	title: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	readingMinutes: number;
};

const BLOG_POSTS: Record<BlogLocale, BlogPostMeta[]> = {
	en: [
		{
			slug: "temporary-email-best-practices",
			title: "Temporary Email Best Practices for Safer Sign-Ups",
			description:
				"Use temporary email more safely with clear rules for low-risk signups, 24-hour inboxes, saved codes, and fallback addresses.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Temporary Email vs Email Alias: Which One Should You Use?",
			description:
				"Compare temporary email and email aliases by privacy, recovery, account lifespan, and when each option makes sense.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP Email Not Arriving? 8 Checks Before You Start Over",
			description:
				"A practical checklist for delayed verification emails, covering inbox refresh, resend timing, typos, and blocked temporary domains.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	zh: [
		{
			slug: "temporary-email-best-practices",
			title: "临时邮箱最佳实践：更稳地完成注册",
			description:
				"用更稳的方式使用临时邮箱：低风险注册、24 小时窗口、信息转存和正式邮箱兜底。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "临时邮箱和邮箱别名，应该怎么选？",
			description:
				"从隐私、找回能力和账号寿命出发，判断临时邮箱和邮箱别名分别适合什么场景。",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "收不到 OTP 邮件？先做这 8 个检查",
			description:
				"按顺序排查验证码邮件延迟、地址错误、域名屏蔽和重发节奏，不要一上来就重开流程。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	es: [
		{
			slug: "temporary-email-best-practices",
			title: "Buenas pr?cticas de correo temporal para registros m?s seguros",
			description:
				"Usa el correo temporal con m?s criterio: registros de bajo riesgo, ventanas de 24 horas, datos guardados y direcciones de respaldo.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Correo temporal vs alias de correo: ?cu?l deber?as usar?",
			description:
				"Compara correo temporal y alias por privacidad, recuperaci?n, vida ?til de la cuenta y cu?ndo conviene cada opci?n.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "?No llega el correo OTP? 8 comprobaciones antes de empezar de cero",
			description:
				"Sigue un orden claro para revisar retrasos, errores en la direcci?n, bloqueos de dominios temporales y reenv?os.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	fr: [
		{
			slug: "temporary-email-best-practices",
			title:
				"Bonnes pratiques d'email temporaire pour des inscriptions plus sûres",
			description:
				"Utilisez l'email temporaire avec méthode : comptes de faible enjeu, fenêtre de 24 heures, informations sauvegardées et adresse de secours.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Email temporaire vs alias email : lequel faut-il utiliser ?",
			description:
				"Comparez email temporaire et alias selon la confidentialité, la récupération, la durée de vie du compte et le bon cas d'usage.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "Email OTP non reçu ? 8 vérifications avant de tout recommencer",
			description:
				"Suivez un ordre clair pour vérifier retards, fautes d'adresse, blocage des domaines temporaires et renvois.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	de: [
		{
			slug: "temporary-email-best-practices",
			title:
				"Best Practices für temporäre E-Mails bei sichereren Registrierungen",
			description:
				"Nutze temporäre E-Mail mit klaren Regeln: risikoarme Konten, 24-Stunden-Fenster, gesicherte Infos und stabile Fallback-Adresse.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Temporäre E-Mail vs. E-Mail-Alias: Welche solltest du verwenden?",
			description:
				"Vergleiche temporäre E-Mail und Alias nach Datenschutz, Wiederherstellung, Kontolebensdauer und dem passenden Einsatzfall.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP-E-Mail kommt nicht an? 8 Prüfungen, bevor du neu anfängst",
			description:
				"Prüfe in klarer Reihenfolge Verzögerung, Tippfehler, Blockierung temporärer Domains und erneutes Senden.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ja: [
		{
			slug: "temporary-email-best-practices",
			title: "安全な登録のための一時メール活用ベストプラクティス",
			description:
				"低リスク登録、24時間の受信窓口、必要情報の保存、安定した代替手段まで含めた使い方を整理します。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "一時メールとメールエイリアスの違い：どちらを使うべきか",
			description:
				"プライバシー、復旧性、アカウント寿命、使いどころの違いから一時メールとエイリアスを比較します。",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTPメールが届かない？やり直す前に確認したい 8 項目",
			description:
				"遅延、入力ミス、一時ドメイン制限、再送の扱いを順番に確認するための実用チェックです。",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ko: [
		{
			slug: "temporary-email-best-practices",
			title: "더 안전한 가입을 위한 임시 이메일 활용 원칙",
			description:
				"저위험 가입, 24시간 수신 창구, 정보 저장, 안정적인 대체 수단까지 포함한 임시 이메일 사용 원칙을 정리합니다.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "임시 이메일과 이메일 별칭의 차이: 무엇을 써야 할까",
			description:
				"프라이버시, 복구성, 계정 수명, 사용 목적의 차이로 임시 이메일과 이메일 별칭을 비교합니다.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP 메일이 안 오나요? 다시 시작하기 전에 확인할 8가지",
			description:
				"지연, 입력 오류, 임시 도메인 제한, 재전송 처리 순서를 차례대로 확인하는 실전 점검표입니다.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ru: [
		{
			slug: "temporary-email-best-practices",
			title: "Лучшие практики временной почты для более безопасных регистраций",
			description:
				"Разберите правила использования временной почты: низкий риск, 24-часовое окно, сохранение данных и стабильный запасной адрес.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Временная почта и почтовый алиас: что лучше использовать?",
			description:
				"Сравните временную почту и алиасы по приватности, восстановлению, сроку жизни аккаунта и подходящим сценариям.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "OTP-письмо не приходит? 8 проверок, прежде чем начинать заново",
			description:
				"Проверьте по порядку задержку, опечатки, блокировку временных доменов и корректный повторный запрос кода.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	pt: [
		{
			slug: "temporary-email-best-practices",
			title: "Boas práticas de email temporário para cadastros mais seguros",
			description:
				"Entenda regras de uso do email temporário: contas de baixo risco, janela de 24 horas, salvamento de dados e endereço de reserva.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "Email temporário e alias de email: qual vale mais a pena usar?",
			description:
				"Compare email temporário e alias por privacidade, recuperação, duração da conta e cenário de uso mais adequado.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "Email OTP não chega? 8 verificações antes de começar tudo de novo",
			description:
				"Verifique em ordem atrasos, erros no endereço, bloqueio de domínios temporários e o uso correto do reenvio.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
	ar: [
		{
			slug: "temporary-email-best-practices",
			title: "أفضل ممارسات البريد المؤقت لتسجيلات أكثر أمانًا",
			description:
				"راجع قواعد استخدام البريد المؤقت: حسابات منخفضة المخاطر، نافذة 24 ساعة، حفظ المعلومات، وخيار بديل أكثر استقرارًا.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
		{
			slug: "temporary-email-vs-email-alias",
			title: "البريد المؤقت والاسم المستعار للبريد: أيهما أفضل للاستخدام؟",
			description:
				"قارن بين البريد المؤقت والاسم المستعار من حيث الخصوصية، والاسترداد، وعمر الحساب، وسيناريو الاستخدام الأنسب.",
			publishedAt: "2026-02-12",
			readingMinutes: 5,
		},
		{
			slug: "otp-email-not-arriving-fixes",
			title: "لا تصلك رسالة OTP؟ 8 نقاط تحقّق قبل أن تبدأ من جديد",
			description:
				"افحص التأخير، وخطأ العنوان، وحظر النطاقات المؤقتة، والتعامل الصحيح مع إعادة الإرسال بالترتيب.",
			publishedAt: "2026-02-12",
			readingMinutes: 4,
		},
	],
};

export function toBlogLocale(locale: Locale): BlogLocale {
	if ((BLOG_LOCALES as readonly string[]).includes(locale)) {
		return locale as BlogLocale;
	}
	return "en";
}

export function listBlogPosts(locale: Locale): BlogPostMeta[] {
	return BLOG_POSTS[toBlogLocale(locale)];
}

export function getBlogPageCount(locale: Locale): number {
	const totalPosts = listBlogPosts(locale).length;
	return Math.max(1, Math.ceil(totalPosts / BLOG_PAGE_SIZE));
}

export function getBlogPostsByPage(
	locale: Locale,
	page: number,
): BlogPostMeta[] {
	const safePage = Math.max(1, page);
	const start = (safePage - 1) * BLOG_PAGE_SIZE;
	return listBlogPosts(locale).slice(start, start + BLOG_PAGE_SIZE);
}

export function getBlogPostMeta(
	locale: Locale,
	slug: string,
): BlogPostMeta | null {
	const posts = listBlogPosts(locale);
	return posts.find((post) => post.slug === slug) ?? null;
}

export function getAllBlogSlugs(): string[] {
	const slugs = new Set<string>();
	for (const locale of BLOG_LOCALES) {
		for (const post of BLOG_POSTS[locale]) {
			slugs.add(post.slug);
		}
	}
	return Array.from(slugs);
}
