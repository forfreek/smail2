import { useEffect, useState } from "react";
import {
	data,
	Link,
	redirect,
	useFetcher,
	useRevalidator,
} from "react-router";
import { commitSession, getSession } from "~/.server/session";
import {
	DEFAULT_LOCALE,
	type Locale,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	toIntlLocale,
	toLocalePath,
} from "~/i18n/config";
import { getDictionary } from "~/i18n/messages";
import { BASE_URL } from "~/seo.config";
import type { Email, EmailDetail } from "~/types/email";
import { generateEmailAddress } from "~/utils/mail";
import { MAIL_RETENTION_MS } from "~/utils/mail-retention";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/home";

function getLocaleFromParams(lang: string | undefined): Locale {
	const { locale } = resolveLocaleParam(lang);
	return locale;
}

function formatRefreshTime(timestamp: number, locale: Locale): string {
	return new Date(timestamp).toLocaleTimeString(toIntlLocale(locale), {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC",
	});
}

const SEO_GUIDES_COPY: Record<
	Locale,
	{ title: string; items: Array<{ label: string; path: string }> }
> = {
	en: {
		title: "Choose the right inbox workflow",
		items: [
			{ label: "When a 24-hour inbox is enough", path: "/temporary-email-24-hours" },
			{
				label: "Use trashmail without registration",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Handle verification emails",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Use a disposable inbox for signup",
				path: "/temporary-email-for-registration",
			},
			{ label: "Check email in the browser", path: "/online-temporary-email" },
		],
	},
	zh: {
		title: "热门临时邮箱指南",
		items: [
			{ label: "24 小时临时邮箱", path: "/temporary-email-24-hours" },
			{ label: "免注册临时邮箱", path: "/temporary-email-no-registration" },
			{ label: "验证码一次性邮箱", path: "/disposable-email-for-verification" },
			{ label: "临时邮箱注册指南", path: "/temporary-email-for-registration" },
			{ label: "在线临时邮箱", path: "/online-temporary-email" },
		],
	},
	es: {
		title: "Guías populares de correo temporal",
		items: [
			{ label: "Cuándo basta un buzón de 24 horas", path: "/temporary-email-24-hours" },
			{
				label: "Usar trashmail sin registro",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Gestionar correos de verificación",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Usar un buzón desechable para registrarte",
				path: "/temporary-email-for-registration",
			},
			{ label: "Revisar el correo en el navegador", path: "/online-temporary-email" },
		],
	},
	fr: {
		title: "Guides populaires d'email temporaire",
		items: [
			{
				label: "Quand une boîte 24 heures suffit",
				path: "/temporary-email-24-hours",
			},
			{
				label: "Utiliser trashmail sans inscription",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Gérer les emails de vérification",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Utiliser une boîte jetable pour s'inscrire",
				path: "/temporary-email-for-registration",
			},
			{ label: "Consulter l'email dans le navigateur", path: "/online-temporary-email" },
		],
	},
	de: {
		title: "Beliebte Temp-Mail-Anleitungen",
		items: [
			{
				label: "Wann ein 24-Stunden-Postfach ausreicht",
				path: "/temporary-email-24-hours",
			},
			{
				label: "trashmail ohne Registrierung nutzen",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Verifizierungs-E-Mails abwickeln",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Ein Wegwerf-Postfach für Registrierungen nutzen",
				path: "/temporary-email-for-registration",
			},
			{ label: "E-Mails im Browser prüfen", path: "/online-temporary-email" },
		],
	},
	ja: {
		title: "人気の一時メールガイド",
		items: [
			{ label: "24時間受信箱で足りる場面", path: "/temporary-email-24-hours" },
			{
				label: "登録なしで trashmail を使う",
				path: "/temporary-email-no-registration",
			},
			{
				label: "認証メールへの対処",
				path: "/disposable-email-for-verification",
			},
			{
				label: "登録に使い捨て受信箱を使う",
				path: "/temporary-email-for-registration",
			},
			{ label: "ブラウザでメールを確認する", path: "/online-temporary-email" },
		],
	},
	ko: {
		title: "인기 임시 이메일 가이드",
		items: [
			{ label: "24시간 메일함이면 충분한 경우", path: "/temporary-email-24-hours" },
			{
				label: "가입 없이 trashmail 쓰기",
				path: "/temporary-email-no-registration",
			},
			{
				label: "인증 메일 처리하기",
				path: "/disposable-email-for-verification",
			},
			{
				label: "가입에 일회용 메일함 쓰기",
				path: "/temporary-email-for-registration",
			},
			{ label: "브라우저에서 메일 확인하기", path: "/online-temporary-email" },
		],
	},
	ru: {
		title: "Популярные гайды по временной почте",
		items: [
			{
				label: "Когда хватает ящика на 24 часа",
				path: "/temporary-email-24-hours",
			},
			{
				label: "Использовать trashmail без регистрации",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Разобраться с письмами верификации",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Использовать одноразовый ящик для регистрации",
				path: "/temporary-email-for-registration",
			},
			{ label: "Проверять почту в браузере", path: "/online-temporary-email" },
		],
	},
	pt: {
		title: "Guias populares de email temporário",
		items: [
			{ label: "Quando uma caixa de 24 horas basta", path: "/temporary-email-24-hours" },
			{
				label: "Usar trashmail sem cadastro",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Lidar com emails de verificação",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Usar uma caixa descartável no cadastro",
				path: "/temporary-email-for-registration",
			},
			{ label: "Checar o email no navegador", path: "/online-temporary-email" },
		],
	},
	ar: {
		title: "أدلة البريد المؤقت الشائعة",
		items: [
			{ label: "متى يكفي صندوق لمدة 24 ساعة", path: "/temporary-email-24-hours" },
			{
				label: "استخدام trashmail من دون تسجيل",
				path: "/temporary-email-no-registration",
			},
			{
				label: "التعامل مع رسائل التحقق",
				path: "/disposable-email-for-verification",
			},
			{ label: "استخدام صندوق مؤقت للتسجيل", path: "/temporary-email-for-registration" },
			{ label: "فحص البريد داخل المتصفح", path: "/online-temporary-email" },
		],
	},
};

function getSeoGuides(locale: Locale): {
	title: string;
	items: Array<{ label: string; path: string }>;
} {
	return SEO_GUIDES_COPY[locale] ?? SEO_GUIDES_COPY.en;
}

type SeoNarrative = {
	title: string;
	description: string;
	points: string[];
};

const SEO_NARRATIVE_COPY: Record<Locale, SeoNarrative> = {
	en: {
		title: "What trashmail is for",
		description:
			"trashmail is a short-lived inbox for moments when a website needs an address, but the email is not important enough for your primary mailbox.",
		points: [
			"Use it for trials, low-risk signups, confirmation links, and OTP codes",
			"No account setup is required before you create an address",
			"Messages stay available for up to 24 hours instead of disappearing like a 10-minute inbox",
			"Use your permanent mailbox for banking, work, legal, and recovery-critical accounts",
		],
	},
	zh: {
		title: "trashmail 适合什么场景",
		description:
			"trashmail 是给短期任务准备的一次性收件箱。网站要求你填邮箱，但这封邮件又不值得进入主邮箱时，用它更合适。",
		points: [
			"适合试用账号、低风险注册、确认链接和验证码",
			"生成地址前不需要创建账号，也不需要额外设置",
			"邮件最多保留 24 小时，不像 10 分钟邮箱那样很快失效",
			"银行、工作、法律事务和账号找回，必须使用长期邮箱",
		],
	},
	es: {
		title: "Para qué sirve trashmail",
		description:
			"trashmail es un buzón de corta duración para momentos en los que un sitio pide una dirección, pero el correo no es lo bastante importante para tu bandeja principal.",
		points: [
			"Úsalo para pruebas, registros de bajo riesgo, enlaces de confirmación y códigos OTP",
			"No necesitas crear una cuenta antes de generar una dirección",
			"Los mensajes siguen disponibles hasta 24 horas en lugar de desaparecer como en una bandeja de 10 minutos",
			"Usa tu correo permanente para banca, trabajo, asuntos legales y recuperación de cuentas",
		],
	},
	fr: {
		title: "À quoi sert trashmail",
		description:
			"trashmail est une boîte de courte durée pour les moments où un site demande une adresse, mais où l'email n'est pas assez important pour votre boîte principale.",
		points: [
			"Utilisez-la pour les essais, les inscriptions à faible risque, les liens de confirmation et les codes OTP",
			"Aucune création de compte n'est requise avant de générer une adresse",
			"Les messages restent disponibles jusqu'à 24 heures au lieu de disparaître comme dans une boîte de 10 minutes",
			"Gardez votre boîte permanente pour la banque, le travail, le juridique et la récupération de compte",
		],
	},
	de: {
		title: "Wofür trashmail gedacht ist",
		description:
			"trashmail ist ein kurzlebiges Postfach für Situationen, in denen eine Website eine Adresse verlangt, die E-Mail aber nicht wichtig genug für dein Hauptpostfach ist.",
		points: [
			"Nutze es für Testzugänge, Registrierungen mit geringem Risiko, Bestätigungslinks und OTP-Codes",
			"Du musst vor dem Erstellen keiner Adresse ein Konto anlegen",
			"Nachrichten bleiben bis zu 24 Stunden verfügbar, statt wie bei einem 10-Minuten-Postfach zu verschwinden",
			"Verwende dein dauerhaftes Postfach für Banking, Arbeit, Rechtliches und Konto-Wiederherstellung",
		],
	},
	ja: {
		title: "trashmail の用途",
		description:
			"trashmail は、サイトがアドレスを求めても、そのメールが主要メールに入るほど重要ではない場面向けの短期受信箱です。",
		points: [
			"試用登録、低リスクのサインアップ、確認リンク、OTP コードに使えます",
			"アドレス生成前にアカウント作成は不要です",
			"10 分メールのようにすぐ消えず、メッセージは最大 24 時間保持されます",
			"銀行、仕事、法務、アカウント復旧には常用メールを使ってください",
		],
	},
	ko: {
		title: "trashmail이 맞는 용도",
		description:
			"trashmail은 사이트가 주소를 요구하지만 그 메일이 주 메일함에 들어갈 만큼 중요하지 않은 상황을 위한 짧은 수명의 메일함입니다.",
		points: [
			"체험 가입, 저위험 회원가입, 확인 링크, OTP 코드에 사용하세요",
			"주소를 만들기 전에 계정을 만들 필요가 없습니다",
			"10분 메일처럼 바로 사라지지 않고 메시지는 최대 24시간 유지됩니다",
			"은행, 업무, 법적 용도, 계정 복구에는 상시 메일함을 사용하세요",
		],
	},
	ru: {
		title: "Для чего нужен trashmail",
		description:
			"trashmail — это краткоживущий ящик для случаев, когда сайт просит адрес, но письмо не настолько важно, чтобы попадать в основную почту.",
		points: [
			"Используйте его для пробных доступов, регистраций с низким риском, ссылок подтверждения и OTP-кодов",
			"Перед созданием адреса не нужно заводить аккаунт",
			"Сообщения доступны до 24 часов, а не исчезают, как в 10-минутном ящике",
			"Постоянную почту оставьте для банка, работы, юридически важных сервисов и восстановления аккаунта",
		],
	},
	pt: {
		title: "Para que serve o trashmail",
		description:
			"trashmail é uma caixa de curta duração para momentos em que um site pede um endereço, mas a mensagem não é importante o bastante para sua caixa principal.",
		points: [
			"Use para testes, cadastros de baixo risco, links de confirmação e códigos OTP",
			"Não é preciso criar conta antes de gerar um endereço",
			"As mensagens ficam disponíveis por até 24 horas em vez de sumirem como numa caixa de 10 minutos",
			"Use seu email permanente para banco, trabalho, temas legais e recuperação de conta",
		],
	},
	ar: {
		title: "ما الذي يصلح له trashmail",
		description:
			"trashmail هو صندوق قصير العمر للحالات التي يطلب فيها الموقع عنوانًا، لكن الرسالة لا تستحق أن تدخل بريدك الأساسي.",
		points: [
			"استخدمه للحسابات التجريبية، والتسجيلات منخفضة المخاطر، وروابط التأكيد، ورموز OTP",
			"لا تحتاج إلى إنشاء حساب قبل توليد العنوان",
			"تبقى الرسائل متاحة حتى 24 ساعة بدل أن تختفي مثل صندوق 10 دقائق",
			"استخدم بريدك الدائم للبنوك والعمل والخدمات القانونية واستعادة الحساب",
		],
	},
};

function getSeoNarrative(locale: Locale): SeoNarrative {
	return SEO_NARRATIVE_COPY[locale] ?? SEO_NARRATIVE_COPY.en;
}

function getHomeJsonLd(locale: Locale) {
	const localizedHomeUrl = `${BASE_URL}${toLocalePath("/", locale)}`;
	const descriptionByLocale: Record<Locale, string> = {
		en: "trashmail.space provides a 24-hour disposable inbox for low-risk signups, verification codes, and short-lived email checks.",
		zh: "trashmail.space 提供 24 小时一次性收件箱，适合低风险注册、验证码接收和短期收信。",
		es: "trashmail.space ofrece un buzón desechable de 24 horas para registros de bajo riesgo, códigos de verificación y revisiones de correo de corta duración.",
		fr: "trashmail.space propose une boîte jetable 24h pour les inscriptions à faible risque, les codes de vérification et les contrôles email de courte durée.",
		de: "trashmail.space bietet ein Wegwerf-Postfach für 24 Stunden für Registrierungen mit geringem Risiko, Verifizierungscodes und kurzlebige E-Mail-Prüfungen.",
		ja: "trashmail.space は、低リスクの登録、認証コード、短期のメール確認向けに 24 時間使える使い捨て受信箱を提供します。",
		ko: "trashmail.space는 저위험 가입, 인증 코드, 짧은 이메일 확인에 맞는 24시간 일회용 메일함을 제공합니다.",
		ru: "trashmail.space предоставляет одноразовый ящик на 24 часа для низкорисковых регистраций, кодов подтверждения и коротких email-проверок.",
		pt: "trashmail.space oferece uma caixa descartável de 24 horas para cadastros de baixo risco, códigos de verificação e checagens curtas de email.",
		ar: "يوفر trashmail.space صندوقًا مؤقتًا لمدة 24 ساعة للتسجيلات منخفضة المخاطر ورسائل التحقق وفحوصات البريد القصيرة.",
	};
	const description = descriptionByLocale[locale] ?? descriptionByLocale.en;

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				name: "trashmail.space",
				url: localizedHomeUrl,
				inLanguage: locale,
				description,
				potentialAction: {
					"@type": "UseAction",
					target: localizedHomeUrl,
				},
			},
			{
				"@type": "WebApplication",
				name: "trashmail.space Temporary Email",
				url: localizedHomeUrl,
				applicationCategory: "UtilitiesApplication",
				operatingSystem: "Web",
				inLanguage: locale,
				description,
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
				},
			},
		],
	};
}

export function meta({ params, matches }: Route.MetaArgs) {
	const locale = getLocaleFromParams(params.lang);
	const copy = getDictionary(locale).home;

	return mergeRouteMeta(matches, [
		{
			title: copy.title,
		},
		{
			name: "description",
			content: copy.description,
		},
		{
			name: "keywords",
			content: copy.keywords,
		},
		{
			name: "robots",
			content: "index, follow",
		},
	]);
}

function isAddressExpired(
	addressIssuedAt: number | undefined,
	now = Date.now(),
): boolean {
	if (!addressIssuedAt) {
		return false;
	}
	return now - addressIssuedAt >= MAIL_RETENTION_MS;
}

function EmailModal({
	email,
	onClose,
	copy,
}: {
	email: Email;
	onClose: () => void;
	copy: ReturnType<typeof getDictionary>["home"]["modal"];
}) {
	const [detail, setDetail] = useState<EmailDetail | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch(`/api/email/${email.id}`, {
			credentials: "include",
		})
			.then((res) => res.json() as Promise<EmailDetail>)
			.then((emailDetail) => {
				setDetail(emailDetail);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [email.id]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	return (
		<div
			className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="email-preview-title"
				className="glass-panel modal-sheet flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="border-theme-soft flex items-start justify-between gap-3 border-b px-4 py-4 sm:px-5">
					<div className="space-y-1">
						<div className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
							{copy.title}
						</div>
						<div
							id="email-preview-title"
							className="text-theme-primary font-display max-w-xl truncate pr-2 text-base font-semibold sm:text-[1.05rem]"
						>
							{email.subject}
						</div>
					</div>
					<button
						type="button"
						aria-label="Close email preview"
						onClick={onClose}
						className="border-theme-strong text-theme-secondary bg-theme-soft inline-flex h-8 w-8 items-center justify-center rounded-full border hover:brightness-95"
					>
						<svg
							viewBox="0 0 20 20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8"
							className="h-4 w-4"
							aria-hidden="true"
						>
							<path d="M5 5L15 15M15 5L5 15" strokeLinecap="round" />
						</svg>
					</button>
				</div>

				<div className="border-theme-soft text-theme-secondary grid gap-2.5 border-b px-4 py-3 text-[12px] leading-relaxed sm:grid-cols-2 sm:px-5">
					<div className="border-theme-soft bg-theme-subtle min-w-0 rounded-lg border px-3 py-2.5">
						<span className="text-theme-faint block text-[11px] font-semibold uppercase tracking-[0.1em]">
							{copy.from}
						</span>
						<p className="mt-1 break-all">
							{email.from_name} &lt;{email.from_address}&gt;
						</p>
					</div>
					<div className="border-theme-soft bg-theme-subtle rounded-lg border px-3 py-2.5">
						<span className="text-theme-faint block text-[11px] font-semibold uppercase tracking-[0.1em]">
							{copy.time}
						</span>
						<p className="mt-1">{new Date(email.time).toLocaleString()}</p>
					</div>
				</div>

				<div className="p-4 sm:p-5">
					{loading ? (
						<div className="text-theme-muted flex h-[min(62vh,700px)] items-center justify-center rounded-xl border border-dashed border-theme-soft text-[13px]">
							{copy.loading}
						</div>
					) : detail?.body ? (
						<iframe
							srcDoc={detail.body}
							title="Email content"
							className="border-theme-soft h-[min(62vh,700px)] w-full overflow-hidden rounded-xl border bg-white"
							sandbox=""
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="text-theme-muted flex h-[min(62vh,700px)] items-center justify-center rounded-xl border border-dashed border-theme-soft text-[13px]">
							{copy.empty}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function formatTime(
	timestamp: number,
	locale: Locale,
	referenceNow: number,
): string {
	const intlLocale = toIntlLocale(locale);
	const relative = new Intl.RelativeTimeFormat(intlLocale, { numeric: "auto" });
	const diffSeconds = Math.round((timestamp - referenceNow) / 1000);

	if (Math.abs(diffSeconds) < 60) {
		return relative.format(diffSeconds, "second");
	}

	const diffMinutes = Math.round(diffSeconds / 60);
	if (Math.abs(diffMinutes) < 60) {
		return relative.format(diffMinutes, "minute");
	}

	const diffHours = Math.round(diffMinutes / 60);
	if (Math.abs(diffHours) < 24) {
		return relative.format(diffHours, "hour");
	}

	const diffDays = Math.round(diffHours / 24);
	if (Math.abs(diffDays) < 7) {
		return relative.format(diffDays, "day");
	}

	return new Date(timestamp).toLocaleDateString(intlLocale, {
		timeZone: "UTC",
	});
}

async function getEmails(d1: D1Database, toAddress: string) {
	const { results } = await d1
		.prepare(
			"SELECT * FROM emails WHERE to_address = ? ORDER BY time DESC LIMIT 100",
		)
		.bind(toAddress)
		.all();
	return results as Email[];
}

export async function loader({ request, context, params }: Route.LoaderArgs) {
	const { locale, shouldRedirectToDefault, isInvalid } = resolveLocaleParam(
		params.lang,
	);
	if (isInvalid) {
		throw new Response("Not Found", { status: 404 });
	}
	if (shouldRedirectToDefault) {
		const url = new URL(request.url);
		const normalizedPath = stripDefaultLocalePrefix(url.pathname);
		throw redirect(`${normalizedPath}${url.search}`, 301);
	}

	const cookieHeader = request.headers.get("Cookie");
	const session = await getSession(cookieHeader);
	let addresses = (session.get("addresses") || []) as string[];
	const addressIssuedAt = session.get("addressIssuedAt");
	const now = Date.now();
	let shouldCommitSession = false;

	if (addresses.length > 0 && isAddressExpired(addressIssuedAt, now)) {
		addresses = [generateEmailAddress()];
		session.set("addresses", addresses);
		session.set("addressIssuedAt", now);
		shouldCommitSession = true;
	} else if (addresses.length > 0 && !addressIssuedAt) {
		session.set("addressIssuedAt", now);
		shouldCommitSession = true;
	}

	const emails =
		addresses.length > 0
			? await getEmails(context.cloudflare.env.D1, addresses[0]!)
			: [];

	if (shouldCommitSession) {
		const headers = new Headers();
		headers.set("Set-Cookie", await commitSession(session));
		return data(
			{
				addresses,
				emails,
				locale,
				renderedAt: now,
			},
			{ headers },
		);
	}

	return {
		addresses,
		emails,
		locale,
		renderedAt: now,
	};
}

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const intent = formData.get("intent");
	const cookieHeader = request.headers.get("Cookie");
	const session = await getSession(cookieHeader);
	let addresses: string[] = (session.get("addresses") || []) as string[];
	switch (intent) {
		case "generate": {
			addresses = [generateEmailAddress()];
			session.set("addressIssuedAt", Date.now());
			break;
		}
		case "delete": {
			addresses = [];
			session.unset("addressIssuedAt");
			break;
		}
	}
	session.set("addresses", addresses);
	const cookie = await commitSession(session);
	const headers = new Headers();
	headers.set("Set-Cookie", cookie);
	return data(
		{
			addresses: session.get("addresses") || [],
		},
		{
			headers,
		},
	);
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
	const fetcher = useFetcher<typeof actionData>();
	const revalidator = useRevalidator();
	const [copied, setCopied] = useState(false);
	const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
	const [lastInboxRefreshAt, setLastInboxRefreshAt] = useState(() =>
		loaderData.renderedAt,
	);
	const locale = loaderData.locale || DEFAULT_LOCALE;
	const copy = getDictionary(locale).home;
	const seoGuides = getSeoGuides(locale);
	const seoNarrative = getSeoNarrative(locale);
	const homeJsonLd = getHomeJsonLd(locale);
	const addresses = fetcher.data?.addresses || loaderData.addresses;
	const emails = loaderData.emails;
	const isSubmitting = fetcher.state === "submitting";
	const submittingIntent = fetcher.formData?.get("intent");
	const isRefreshingInbox = revalidator.state !== "idle";

	useEffect(() => {
		setLastInboxRefreshAt(loaderData.renderedAt);
	}, [loaderData.renderedAt]);

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
			/>
			<div className="grid w-full gap-4">
				<section className="glass-panel relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
					<div
						className="absolute -left-20 -top-24 h-44 w-44 rounded-full opacity-80 blur-[88px]"
						style={{ background: "var(--accent-a)" }}
					/>
					<div
						className="absolute -right-14 top-20 h-36 w-36 rounded-full opacity-75 blur-[82px]"
						style={{ background: "var(--accent-b)" }}
					/>
					<div className="relative space-y-3">
						<header className="space-y-2.5">
							<p className="soft-tag">{copy.heroTag}</p>
							<h1 className="text-theme-primary font-display max-w-2xl text-xl leading-tight font-bold sm:text-3xl">
								{copy.heroTitle}
							</h1>
							<p className="text-theme-secondary max-w-xl text-sm leading-relaxed">
								{copy.heroDescription}
							</p>
						</header>

						<div className="theme-badge flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-1.5 text-[10px] sm:text-[11px]">
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.lifetimeValue}
								</span>{" "}
								{copy.stats.lifetime}
							</span>
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.refreshValue}
								</span>{" "}
								{copy.stats.refresh}
							</span>
							<span className="text-theme-faint">
								<span className="text-theme-primary font-display font-semibold">
									{copy.stats.registrationValue}
								</span>{" "}
								{copy.stats.registration}
							</span>
						</div>
					</div>
				</section>

				<section className="glass-panel px-4 py-4 sm:px-5 sm:py-4">
					<div className="grid gap-4">
						<div>
							<div className="mb-3 space-y-1">
								<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
									{copy.currentAddress}
								</p>
								<p className="text-theme-muted hidden text-xs sm:block">
									{copy.noAddressDescription}
								</p>
							</div>
							<div className="space-y-4">
								{addresses.length > 0 ? (
									<>
										<div className="theme-card p-3">
												<div className="border-theme-soft bg-theme-subtle flex flex-col gap-2 rounded-xl border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
													<div className="text-theme-primary min-w-0 text-sm font-semibold break-all sm:truncate">
														{addresses[0]}
													</div>
													<button
														type="button"
														className="neo-button-secondary w-full sm:w-auto sm:min-w-20"
														onClick={async () => {
															if (
																typeof navigator !== "undefined" &&
															navigator.clipboard
														) {
															try {
																await navigator.clipboard.writeText(
																	addresses[0] ?? "",
																);
																setCopied(true);
																setTimeout(() => setCopied(false), 1500);
															} catch {
																// ignore clipboard errors
															}
														}
													}}
												>
													{copied ? copy.copied : copy.copy}
												</button>
											</div>
										</div>

										<div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
											<button
												type="button"
												name="intent"
												value="generate"
												className="neo-button w-full justify-center sm:min-w-[10.5rem] sm:w-auto"
												onClick={() => {
													fetcher.submit(
														{ intent: "generate" },
														{ method: "post" },
													);
												}}
												disabled={isSubmitting}
											>
												{submittingIntent === "generate" && isSubmitting
													? copy.generating
													: copy.generateNew}
											</button>
											<button
												type="button"
												name="intent"
												value="delete"
												className="neo-button-secondary w-full justify-center sm:w-auto"
												onClick={() => {
													fetcher.submit(
														{ intent: "delete" },
														{ method: "post" },
													);
												}}
												disabled={isSubmitting}
											>
												{submittingIntent === "delete" && isSubmitting
													? copy.deleting
													: copy.deleteAddress}
											</button>
										</div>

										<p className="border-theme-soft bg-theme-subtle text-theme-faint rounded-lg border px-3 py-2 text-[11px] leading-relaxed">
											{copy.safetyHint}
										</p>
									</>
								) : (
									<div className="theme-card p-3">
										<div className="text-theme-primary text-sm font-semibold">
											{copy.noAddressTitle}
										</div>
										<p className="text-theme-muted mt-1 text-xs leading-relaxed">
											{copy.noAddressDescription}
										</p>
										<button
											type="button"
											name="intent"
											value="generate"
											className="neo-button mt-3 w-full justify-center sm:w-auto sm:min-w-[10.5rem]"
											onClick={() => {
												fetcher.submit(
													{ intent: "generate" },
													{ method: "post" },
												);
											}}
											disabled={isSubmitting}
										>
											{submittingIntent === "generate" && isSubmitting
												? copy.generating
												: copy.generateAddress}
										</button>
										<p className="border-theme-soft bg-theme-subtle text-theme-faint mt-3 rounded-lg border px-3 py-2 text-[11px] leading-relaxed">
											{copy.safetyHint}
										</p>
									</div>
								)}
							</div>
						</div>

						<div className="border-theme-soft border-t border-dashed pt-3">
							<div className="mb-3 flex items-start justify-between gap-3">
								<div>
									<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
										{copy.inboxTag}
									</p>
									<p className="text-theme-primary font-display text-xl font-semibold">
										{copy.inboxTitle}
									</p>
									<p className="text-theme-faint mt-1 text-[11px]">
										{copy.lastRefresh}:{" "}
										{formatRefreshTime(lastInboxRefreshAt, locale)}
									</p>
								</div>
								<div className="flex flex-col items-end gap-2">
									<span className="theme-badge hidden px-3 py-1 text-[11px] font-medium sm:inline-flex">
										{copy.tapToOpen}
									</span>
									<button
										type="button"
										className="theme-badge px-3 py-1 text-[11px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
										onClick={() => {
											revalidator.revalidate();
										}}
										disabled={isRefreshingInbox}
									>
										{isRefreshingInbox
											? copy.refreshingInbox
											: copy.refreshInbox}
									</button>
								</div>
							</div>

							<div className="flex min-h-[360px] flex-col gap-2.5 overflow-y-auto py-1 pr-0.5">
								{emails.length === 0 ? (
									<div className="border-theme-strong bg-theme-subtle mt-6 rounded-2xl border border-dashed px-4 py-10 text-center">
										<p className="text-theme-primary font-display text-lg font-semibold">
											{copy.emptyInboxTitle}
										</p>
										<p className="text-theme-muted mt-1 text-sm">
											{copy.emptyInboxDescription}
										</p>
									</div>
								) : (
									emails.map((email) => (
										<button
											key={email.id}
											type="button"
											className="email-item"
											onClick={() => setSelectedEmail(email)}
										>
											<div className="min-w-0">
												<div className="flex items-start justify-between gap-3">
													<div className="text-theme-primary font-display truncate text-sm font-semibold">
														{email.subject}
													</div>
													<div className="text-theme-faint whitespace-nowrap text-[11px]">
														{formatTime(
															email.time,
															locale,
															loaderData.renderedAt,
														)}
													</div>
												</div>
												<div className="text-theme-muted mt-1 truncate text-xs">
													{email.from_name}
													<span className="text-theme-faint">
														{" "}
														&lt;{email.from_address}&gt;
													</span>
												</div>
											</div>
										</button>
									))
								)}
							</div>
						</div>
					</div>
				</section>

				<section className="glass-panel px-4 py-4 sm:px-5 sm:py-5">
					<h2 className="text-theme-primary font-display mb-3 text-lg font-semibold sm:text-xl">
						{seoNarrative.title}
					</h2>
					<div className="grid gap-3 lg:grid-cols-[0.92fr,1.08fr]">
						<div className="theme-card space-y-3 p-4">
							<p className="text-theme-faint text-[11px] font-semibold uppercase tracking-[0.16em]">
								{seoGuides.title}
							</p>
							<div className="grid gap-2 sm:grid-cols-2">
								{seoGuides.items.map((item) => (
									<Link
										key={item.path}
										to={toLocalePath(item.path, locale)}
										prefetch="viewport"
										className="theme-badge flex items-center justify-between px-3 py-1.5 text-[11px] font-medium"
									>
										<span>{item.label}</span>
										<span aria-hidden="true">{"->"}</span>
									</Link>
								))}
							</div>
						</div>

						<div className="theme-card space-y-3 p-4">
							<p className="text-theme-secondary text-xs leading-relaxed sm:text-sm">
								{seoNarrative.description}
							</p>
							<ul className="text-theme-muted list-disc space-y-1 pl-5 text-[11px] leading-relaxed sm:text-xs">
								{seoNarrative.points.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>
						</div>
					</div>
				</section>
			</div>

			{selectedEmail && (
				<EmailModal
					email={selectedEmail}
					onClose={() => setSelectedEmail(null)}
					copy={copy.modal}
				/>
			)}
		</div>
	);
}
