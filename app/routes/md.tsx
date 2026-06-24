import Markdoc from "@markdoc/markdoc";
import { Link, redirect } from "react-router";
import {
	DEFAULT_LOCALE,
	type Locale,
	normalizePathname,
	resolveLocaleParam,
	stripDefaultLocalePrefix,
	stripLocalePrefix,
	toLocalePath,
} from "~/i18n/config";
import { BASE_URL, isMarkdownLocaleIndexable } from "~/seo.config";
import { mergeRouteMeta } from "~/utils/meta";
import type { Route } from "./+types/md";

const KNOWN_MD_PAGES = [
	"about",
	"faq",
	"privacy",
	"terms",
	"temporary-email-24-hours",
	"temporary-email-no-registration",
	"disposable-email-for-verification",
	"temporary-email-for-registration",
	"online-temporary-email",
	"domestic-temporary-email",
	"can-temporary-email-send",
	"smail-vs-smailpro",
] as const;

type MarkdownPageSlug = (typeof KNOWN_MD_PAGES)[number];

const INFO_MD_PAGES = ["about", "faq", "privacy", "terms"] as const;
const ARTICLE_MD_PAGES = [
	"temporary-email-24-hours",
	"temporary-email-no-registration",
	"disposable-email-for-verification",
	"temporary-email-for-registration",
	"online-temporary-email",
	"domestic-temporary-email",
	"can-temporary-email-send",
	"smail-vs-smailpro",
] as const;

type InfoMarkdownSlug = (typeof INFO_MD_PAGES)[number];
type ArticleMarkdownSlug = (typeof ARTICLE_MD_PAGES)[number];

const markdownSources = import.meta.glob("../md/**/*.md", {
	query: "?raw",
	import: "default",
}) as Record<string, () => Promise<string>>;

type FaqEntry = {
	question: string;
	answer: string;
};

const FAQ_JSON_LD_COPY: Partial<Record<Locale, FaqEntry[]>> = {
	en: [
		{
			question: "What is trashmail.space?",
			answer:
				"trashmail.space is a disposable inbox for low-risk signups, verification messages, and short-lived email checks.",
		},
		{
			question: "How long are emails kept?",
			answer:
				"Emails are retained for up to 24 hours and then removed. The inbox should be treated as temporary access, not storage.",
		},
		{
			question: "Do I need to register?",
			answer: "No account, password, or profile setup is required.",
		},
		{
			question: "Can I send emails from trashmail.space?",
			answer:
				"No outbound workflow should be assumed. trashmail.space is primarily designed for receiving messages.",
		},
		{
			question: "Can I use it for banking or critical accounts?",
			answer:
				"No. Use a permanent secure mailbox for banking, work, legal, and recovery-critical services.",
		},
	],
	zh: [
		{
			question: "trashmail.space 是什么？",
			answer: "trashmail.space 是临时邮箱服务，可用于低风险注册和验证码接收。",
		},
		{
			question: "邮件会保留多久？",
			answer: "邮件内容最多保留 24 小时，之后会自动清理。",
		},
		{
			question: "需要注册账号吗？",
			answer: "不需要账号、密码或个人资料即可使用。",
		},
		{
			question: "能用于银行或重要账号吗？",
			answer: "不建议。银行、工作、法律和账号找回等重要场景请使用长期邮箱。",
		},
		{
			question: "trashmail.space 和 smail pro / smailpro 是同一个吗？",
			answer: "不是。trashmail.space 是独立站点，与其他同名或近似名称服务没有关联。",
		},
		{
			question: "国内临时邮箱收不到验证码怎么办？",
			answer:
				"常见原因是发件方延迟或平台限制临时邮箱域名。建议先确认地址无误，再重发并刷新收件箱。",
		},
	],
	es: [
		{
			question: "?Qu? es trashmail.space?",
			answer:
				"trashmail.space es una bandeja temporal para registros de bajo riesgo, mensajes de verificaci?n y comprobaciones de correo de corta duraci?n.",
		},
		{
			question: "?Cu?nto tiempo se guardan los correos?",
			answer:
				"Los mensajes se conservan hasta 24 horas y despu?s se eliminan. Debes tratar la bandeja como acceso temporal, no como almacenamiento.",
		},
		{
			question: "?Necesito registrarme?",
			answer: "No. No hace falta cuenta, contrase?a ni perfil.",
		},
		{
			question: "?Puedo usarlo para banca o cuentas cr?ticas?",
			answer:
				"No. Para banca, trabajo, temas legales y recuperaci?n de cuentas usa un correo permanente y seguro.",
		},
		{
			question: "?Puede el correo temporal enviar mensajes?",
			answer:
				"No des por hecho el env?o. trashmail.space est? orientado principalmente a la recepci?n de mensajes.",
		},
		{
			question: "?trashmail.space es lo mismo que smailpro?",
			answer:
				"No. trashmail.space es un servicio independiente y no est? afiliado con smailpro ni con servicios de nombre parecido.",
		},
	],
	fr: [
		{
			question: "Qu'est-ce que trashmail.space ?",
			answer:
				"trashmail.space est une boîte jetable pour les inscriptions à faible risque, les messages de vérification et les contrôles email de courte durée.",
		},
		{
			question: "Combien de temps les emails sont-ils conservés ?",
			answer:
				"Les emails sont conservés jusqu'à 24 heures puis supprimés. Il faut considérer la boîte comme un accès temporaire, pas comme un stockage.",
		},
		{
			question: "Faut-il créer un compte ?",
			answer: "Non. Aucun compte, mot de passe ou profil n'est requis.",
		},
		{
			question: "Puis-je l'utiliser pour des comptes sensibles ?",
			answer:
				"Non. Pour la banque, le travail, le juridique et la récupération de compte, utilisez une boîte permanente et sécurisée.",
		},
		{
			question: "Un email temporaire peut-il envoyer des messages ?",
			answer:
				"Il ne faut pas partir de ce principe. trashmail.space est principalement conçu pour la réception de messages.",
		},
		{
			question: "trashmail.space est-il identique à smailpro ?",
			answer:
				"Non. trashmail.space est un service indépendant, sans affiliation avec smailpro ni avec des services au nom proche.",
		},
	],
	de: [
		{
			question: "Was ist trashmail.space?",
			answer:
				"trashmail.space ist ein Wegwerf-Postfach für Registrierungen mit geringem Risiko, Verifizierungsnachrichten und kurzlebige E-Mail-Prüfungen.",
		},
		{
			question: "Wie lange werden Nachrichten gespeichert?",
			answer:
				"Nachrichten bleiben bis zu 24 Stunden erhalten und werden danach gelöscht. Das Postfach sollte als temporärer Zugriff verstanden werden, nicht als Speicher.",
		},
		{
			question: "Muss ich mich registrieren?",
			answer: "Nein. Kein Konto, Passwort oder Profil ist erforderlich.",
		},
		{
			question: "Ist das für Banking oder wichtige Konten geeignet?",
			answer:
				"Nein. Für Banking, Arbeit, rechtliche Themen und Konto-Wiederherstellung solltest du ein dauerhaftes und sicheres Postfach verwenden.",
		},
		{
			question: "Kann temporäre E-Mail Nachrichten senden?",
			answer:
				"Davon solltest du nicht ausgehen. trashmail.space ist in erster Linie für den Empfang von Nachrichten gedacht.",
		},
		{
			question: "Ist trashmail.space dasselbe wie smailpro?",
			answer:
				"Nein. trashmail.space ist ein eigenständiger Dienst ohne Verbindung zu smailpro oder ähnlich benannten Angeboten.",
		},
	],
	ja: [
		{
			question: "trashmail.space とは？",
			answer:
				"trashmail.space は、低リスクな登録、認証メール、短時間の受信確認のための使い捨て受信箱です。",
		},
		{
			question: "メールはどれくらい保存されますか？",
			answer:
				"メールは最大 24 時間保持され、その後削除されます。保存場所ではなく、一時的な受信窓口として扱ってください。",
		},
		{
			question: "登録は必要ですか？",
			answer: "不要です。アカウントやパスワードなしで利用できます。",
		},
		{
			question: "銀行や重要アカウントに使えますか？",
			answer:
				"いいえ。銀行、仕事、法務、アカウント復旧には恒久的で安全なメールを使ってください。",
		},
		{
			question: "一時メールは送信できますか？",
			answer:
				"送信できる前提では使わないでください。trashmail.space は主に受信のためのサービスです。",
		},
		{
			question: "trashmail.space は smailpro と同じですか？",
			answer:
				"いいえ。trashmail.space は独立サービスで、smailpro や類似名称のサービスとの提携はありません。",
		},
	],
	ko: [
		{
			question: "trashmail.space는 무엇인가요?",
			answer:
				"trashmail.space는 저위험 가입, 인증 메일, 짧은 수신 확인을 위한 일회용 받은편지함입니다.",
		},
		{
			question: "메일은 얼마나 보관되나요?",
			answer:
				"메일은 최대 24시간 보관된 뒤 삭제됩니다. 저장소가 아니라 임시 수신 창구로 이해해야 합니다.",
		},
		{
			question: "회원가입이 필요한가요?",
			answer: "아니요. 계정, 비밀번호, 프로필 없이 사용할 수 있습니다.",
		},
		{
			question: "은행이나 중요한 계정에 써도 되나요?",
			answer:
				"권장하지 않습니다. 은행, 업무, 법률, 계정 복구에는 영구적이고 안전한 메일함을 사용해야 합니다.",
		},
		{
			question: "임시 이메일로 발신할 수 있나요?",
			answer:
				"발신이 된다고 가정하면 안 됩니다. trashmail.space는 기본적으로 수신 목적의 서비스입니다.",
		},
		{
			question: "trashmail.space는 smailpro와 같은 서비스인가요?",
			answer:
				"아니요. trashmail.space는 독립 서비스이며 smailpro 또는 유사 명칭 서비스와 제휴되어 있지 않습니다.",
		},
	],
	ru: [
		{
			question: "Что такое trashmail.space?",
			answer:
				"trashmail.space — это одноразовый почтовый ящик для низкорисковых регистраций, писем подтверждения и коротких проверок почты.",
		},
		{
			question: "Сколько хранятся письма?",
			answer:
				"Письма могут храниться до 24 часов и затем удаляются. Это временный доступ, а не постоянное хранилище.",
		},
		{
			question: "Нужна регистрация?",
			answer: "Нет. Аккаунт, пароль и профиль не требуются.",
		},
		{
			question: "Можно использовать для банковских и важных аккаунтов?",
			answer:
				"Нет. Для банковских, рабочих, юридических и recovery-критичных сценариев нужна постоянная и защищенная почта.",
		},
		{
			question: "Можно ли отправлять письма с временной почты?",
			answer:
				"Не стоит исходить из этого. trashmail.space в первую очередь рассчитан на прием сообщений.",
		},
		{
			question: "trashmail.space это то же самое, что smailpro?",
			answer:
				"Нет. trashmail.space — независимый сервис и не связан со smailpro или сервисами с похожими названиями.",
		},
	],
	pt: [
		{
			question: "O que é o trashmail.space?",
			answer:
				"trashmail.space é uma caixa descartável para cadastros de baixo risco, mensagens de verificação e checagens rápidas de email.",
		},
		{
			question: "Por quanto tempo os emails ficam disponíveis?",
			answer:
				"As mensagens podem ficar disponíveis por até 24 horas e depois ser removidas. Trate a caixa como acesso temporário, não como armazenamento.",
		},
		{
			question: "Preciso criar conta?",
			answer: "Não. Não exige conta, senha nem perfil.",
		},
		{
			question: "Posso usar para banco ou contas críticas?",
			answer:
				"Não. Para banco, trabalho, jurídico e recuperação de conta, use uma caixa permanente e segura.",
		},
		{
			question: "Email temporário pode enviar mensagens?",
			answer:
				"Não parta desse princípio. O trashmail.space é voltado principalmente ao recebimento de mensagens.",
		},
		{
			question: "trashmail.space é o mesmo serviço que smailpro?",
			answer:
				"Não. O trashmail.space é um serviço independente e não possui afiliação com smailpro nem com serviços de nome parecido.",
		},
	],
	ar: [
		{
			question: "ما هو trashmail.space؟",
			answer:
				"trashmail.space هو صندوق بريد مؤقت للتسجيلات منخفضة المخاطر، ورسائل التحقق، وفحوصات البريد القصيرة.",
		},
		{
			question: "كم مدة الاحتفاظ بالرسائل؟",
			answer:
				"قد تبقى الرسائل متاحة حتى 24 ساعة ثم تُزال. يجب التعامل مع الصندوق بوصفه وصولًا مؤقتًا لا مساحة تخزين دائمة.",
		},
		{
			question: "هل أحتاج إلى تسجيل حساب؟",
			answer: "لا. لا حاجة إلى حساب أو كلمة مرور أو ملف شخصي.",
		},
		{
			question: "هل يصلح للحسابات البنكية أو المهمة؟",
			answer:
				"لا. للحسابات البنكية، والعملية، والقانونية، واستعادة الحسابات المهمة، استخدم بريدًا دائمًا وآمنًا.",
		},
		{
			question: "هل يمكن للبريد المؤقت إرسال الرسائل؟",
			answer:
				"لا تعتمد على ذلك. trashmail.space مخصص أساسًا لاستقبال الرسائل.",
		},
		{
			question: "هل trashmail.space هو نفسه smailpro؟",
			answer:
				"لا. trashmail.space خدمة مستقلة ولا توجد علاقة بينها وبين smailpro أو الخدمات ذات الأسماء المشابهة.",
		},
	],
};

const mdMetaCopy: Record<
	MarkdownPageSlug,
	Partial<Record<Locale, { title: string; description: string }>> & {
		en: { title: string; description: string };
	}
> = {
	about: {
		en: {
			title: "About trashmail | When to Use a Disposable Inbox",
			description:
				"Learn what trashmail is for, where a disposable inbox fits, and when a permanent mailbox is the safer choice.",
		},
		zh: {
			title: "关于 trashmail.space | 临时邮箱生成器",
			description:
				"了解 trashmail.space 临时邮箱生成器的用途、适用场景与一次性邮箱使用边界。",
		},
		es: {
			title: "Sobre trashmail.space | Cu?ndo usar un buz?n temporal",
			description:
				"Entiende para qu? sirve trashmail.space, d?nde encaja un buz?n temporal y cu?ndo un correo permanente es la opci?n m?s segura.",
		},
		fr: {
			title: "À propos de trashmail | Quand utiliser une boîte jetable",
			description:
				"Comprenez à quoi sert trashmail, où une boîte temporaire a du sens et quand une adresse permanente reste le choix le plus sûr.",
		},
		de: {
			title: "Über trashmail | Wann ein Wegwerf-Postfach sinnvoll ist",
			description:
				"Erfahre, wofür trashmail gedacht ist, wo ein temporäres Postfach passt und wann ein dauerhaftes Postfach die sicherere Wahl bleibt.",
		},
		ja: {
			title: "trashmail について | 一時受信箱が向いている場面",
			description:
				"trashmail の用途、一時受信箱が役立つ場面、そして恒久メールを選ぶべきケースを確認できます。",
		},
		ko: {
			title: "trashmail 소개 | 임시 받은편지함이 맞는 경우",
			description:
				"trashmail의 목적, 임시 받은편지함이 유용한 상황, 그리고 영구 메일함이 더 안전한 경우를 확인하세요.",
		},
		ru: {
			title: "О trashmail | Когда временный ящик действительно уместен",
			description:
				"Разберитесь, для чего нужен trashmail, где временный ящик подходит лучше всего и когда постоянная почта безопаснее.",
		},
		pt: {
			title: "Sobre o trashmail | Quando uma caixa descartável faz sentido",
			description:
				"Entenda para que o trashmail serve, em quais situações uma caixa temporária ajuda e quando um email permanente é a escolha mais segura.",
		},
		ar: {
			title: "حول trashmail | متى يكون صندوق البريد المؤقت مناسبًا",
			description:
				"تعرّف على استخدامات trashmail، ومتى يفيدك البريد المؤقت، ومتى يكون البريد الدائم هو الخيار الأكثر أمانًا.",
		},
	},
	faq: {
		en: {
			title: "trashmail FAQ | Retention, Verification, and Inbox Limits",
			description:
				"Read the trashmail FAQ for message retention, delivery issues, receive-only limits, and cases where a disposable inbox should be avoided.",
		},
		zh: {
			title: "临时邮箱常见问题（验证码/收信/注册）| trashmail.space",
			description:
				"临时邮箱与一次性邮箱常见问题：24小时保留、验证码收信异常、临时邮箱注册场景、使用限制与安全建议。",
		},
		es: {
			title: "FAQ de trashmail.space | Retenci?n, verificaci?n y l?mites",
			description:
				"Consulta la FAQ de trashmail.space sobre retenci?n de mensajes, problemas de entrega, l?mites de recepci?n y casos en los que conviene evitar un correo temporal.",
		},
		fr: {
			title: "FAQ trashmail | Rétention, vérification et limites",
			description:
				"Consultez la FAQ trashmail sur la rétention des messages, les problèmes de livraison, les limites de réception et les cas où une boîte jetable doit être évitée.",
		},
		de: {
			title: "trashmail FAQ | Aufbewahrung, Verifizierung und Postfach-Grenzen",
			description:
				"Lies die trashmail FAQ zu Nachrichten-Aufbewahrung, Zustellproblemen, reinen Empfangsgrenzen und Fällen, in denen ein Wegwerf-Postfach vermieden werden sollte.",
		},
		ja: {
			title: "trashmail FAQ | 保持期間・認証・受信箱の制限",
			description:
				"保持期間、受信トラブル、受信専用の制限、一時受信箱を避けるべきケースなどを FAQ として整理しています。",
		},
		ko: {
			title: "trashmail FAQ | 보관 기간, 인증, 수신함의 한계",
			description:
				"보관 기간, 수신 지연, 수신 전용 한계, 임시 받은편지함을 피해야 할 상황을 FAQ 형식으로 정리했습니다.",
		},
		ru: {
			title: "FAQ trashmail | Хранение, верификация и ограничения ящика",
			description:
				"Собрали ответы о сроке хранения, проблемах доставки, receive-only ограничениях и случаях, когда временный ящик лучше не использовать.",
		},
		pt: {
			title: "FAQ do trashmail | Retenção, verificação e limites da caixa",
			description:
				"Consulte respostas sobre retenção de mensagens, problemas de entrega, limites de recebimento e casos em que uma caixa descartável não deve ser usada.",
		},
		ar: {
			title: "الأسئلة الشائعة في trashmail | الاحتفاظ والتحقق وحدود الصندوق",
			description:
				"استعرض إجابات حول مدة الاحتفاظ، ومشكلات التسليم، وحدود الاستقبال فقط، والحالات التي لا ينبغي فيها استخدام صندوق مؤقت.",
		},
	},
	privacy: {
		en: {
			title: "Privacy Policy | trashmail.space",
			description:
				"Read what data trashmail.space may process, how long temporary messages are kept, and what privacy limits apply to a disposable inbox.",
		},
		zh: {
			title: "隐私政策 | trashmail.space",
			description: "查看 trashmail.space 可能处理的数据类型、保留周期与隐私处理方式。",
		},
		es: {
			title: "Política de privacidad | trashmail.space",
			description:
				"Consulta qué datos puede tratar trashmail.space, cuánto tiempo se conservan y cómo se protege la privacidad.",
		},
		fr: {
			title: "Politique de confidentialité | trashmail.space",
			description:
				"Découvrez quelles données trashmail.space peut traiter, leur durée de conservation et la gestion de la confidentialité.",
		},
		de: {
			title: "Datenschutzrichtlinie | trashmail.space",
			description:
				"Sieh, welche Daten trashmail.space verarbeiten kann, wie lange sie gespeichert werden und wie Datenschutz umgesetzt wird.",
		},
		ja: {
			title: "プライバシーポリシー | trashmail.space",
			description:
				"trashmail.space が扱う可能性のあるデータ、保持期間、プライバシー保護の方針を確認できます。",
		},
		ko: {
			title: "개인정보 처리방침 | trashmail.space",
			description:
				"trashmail.space에서 처리할 수 있는 데이터 유형, 보관 기간, 개인정보 보호 방식에 대해 확인하세요.",
		},
		ru: {
			title: "Политика конфиденциальности | trashmail.space",
			description:
				"Узнайте, какие данные может обрабатывать trashmail.space, сроки хранения и подход к конфиденциальности.",
		},
		pt: {
			title: "Política de privacidade | trashmail.space",
			description:
				"Veja quais dados o trashmail.space pode processar, por quanto tempo são mantidos e como a privacidade é tratada.",
		},
		ar: {
			title: "سياسة الخصوصية | trashmail.space",
			description:
				"تعرّف على البيانات التي قد يعالجها trashmail.space ومدة الاحتفاظ بها وكيفية التعامل مع الخصوصية.",
		},
	},
	terms: {
		en: {
			title: "Terms of Use | trashmail.space",
			description:
				"Review the terms for using trashmail.space, including acceptable use, temporary inbox limits, delivery disclaimers, and account-risk boundaries.",
		},
		zh: {
			title: "使用条款 | trashmail.space",
			description: "了解 trashmail.space 的使用规则、服务边界与免责声明。",
		},
		es: {
			title: "Términos de uso | trashmail.space",
			description:
				"Revisa las reglas de uso de trashmail.space, incluyendo usos permitidos, avisos legales y límites del servicio.",
		},
		fr: {
			title: "Conditions d'utilisation | trashmail.space",
			description:
				"Consultez les conditions d'usage de trashmail.space, y compris l'usage autorisé, les exclusions et limites du service.",
		},
		de: {
			title: "Nutzungsbedingungen | trashmail.space",
			description:
				"Prüfe die Nutzungsregeln von trashmail.space inklusive zulässiger Nutzung, Haftungsausschlüssen und Servicegrenzen.",
		},
		ja: {
			title: "利用規約 | trashmail.space",
			description:
				"trashmail.space の利用条件、許容される利用、免責事項、サービス範囲の制限を確認できます。",
		},
		ko: {
			title: "이용약관 | trashmail.space",
			description:
				"trashmail.space 이용 규정, 허용 범위, 면책 고지, 서비스 제한 사항을 확인하세요.",
		},
		ru: {
			title: "Условия использования | trashmail.space",
			description:
				"Ознакомьтесь с правилами использования trashmail.space, допустимым применением, отказом от ответственности и ограничениями.",
		},
		pt: {
			title: "Termos de uso | trashmail.space",
			description:
				"Revise os termos do trashmail.space, incluindo uso aceitável, avisos legais e limitações do serviço.",
		},
		ar: {
			title: "شروط الاستخدام | trashmail.space",
			description:
				"راجع شروط استخدام trashmail.space بما يشمل الاستخدام المقبول وإخلاء المسؤولية وحدود الخدمة.",
		},
	},
	"temporary-email-24-hours": {
		en: {
			title: "24-Hour Temporary Inbox | When More Than 10 Minutes Matters",
			description:
				"Use the trashmail 24-hour inbox when a signup or verification flow may stretch across delays, retries, or multiple sessions.",
		},
		zh: {
			title: "24小时临时邮箱（24小时邮箱）| trashmail.space",
			description:
				"获取 24 小时临时邮箱（一次性邮箱），用于临时邮箱注册、验证码与短期收信，自动过期更省心。",
		},
		es: {
			title: "Correo temporal de 24 horas | Cu?ndo basta una bandeja corta",
			description:
				"Usa trashmail cuando solo necesites una bandeja durante un registro, una prueba o una verificaci?n puntual dentro de una ventana corta.",
		},
		fr: {
			title: "Boîte temporaire 24 heures | Quand une fenêtre plus longue est utile",
			description:
				"Utilisez la boîte 24 heures de trashmail quand une inscription ou une vérification peut s'étaler entre retards, renvois et plusieurs sessions.",
		},
		de: {
			title: "24-Stunden-Temporärpostfach | Wenn mehr als 10 Minuten zählen",
			description:
				"Nutze das 24-Stunden-Postfach von trashmail, wenn sich eine Registrierung oder Verifizierung über Verzögerungen, Wiederholungen oder mehrere Sitzungen ziehen kann.",
		},
		ja: {
			title: "24時間一時メール | 10分では足りない場面向け",
			description:
				"登録や認証がすぐ終わらないときに、遅延メールや複数セッションを吸収しやすい 24 時間受信箱を使えます。",
		},
		ko: {
			title: "24시간 임시 이메일 | 10분으로 부족한 흐름을 위한 선택",
			description:
				"가입이나 인증이 바로 끝나지 않을 때, 지연 메일과 여러 세션을 감당하기 쉬운 24시간 수신함을 사용할 수 있습니다.",
		},
		ru: {
			title: "24-часовой временный ящик | Когда 10 минут уже мало",
			description:
				"Используйте 24-часовой ящик trashmail, если регистрация или верификация может растянуться из-за задержек, повторов или нескольких сессий.",
		},
		pt: {
			title: "Inbox temporário de 24 horas | Quando 10 minutos já não bastam",
			description:
				"Use o inbox de 24 horas do trashmail quando o cadastro ou a verificação pode se estender por atrasos, reenvios ou várias sessões.",
		},
		ar: {
			title: "صندوق مؤقت لمدة 24 ساعة | عندما لا تكفي 10 دقائق",
			description:
				"استخدم صندوق 24 ساعة من trashmail عندما يمتد التسجيل أو التحقق بسبب التأخير أو إعادة الطلب أو تعدد الجلسات.",
		},
	},
	"temporary-email-no-registration": {
		en: {
			title: "Temporary Email Without Registration | Immediate Inbox Access",
			description:
				"Use trashmail without account creation when you need immediate access to a disposable inbox for short-lived verification, signup, or download flows.",
		},
		zh: {
			title: "免注册临时邮箱（无需注册）| trashmail.space",
			description:
				"免注册临时邮箱，无需账号和密码即可快速生成一次性邮箱，适合临时邮箱注册与验证码收信。",
		},
		es: {
			title: "Correo temporal sin registro | Acceso r?pido sin cuenta",
			description:
				"Recibe correos en segundos sin crear cuenta ni contrase?a cuando solo necesitas una bandeja temporal para completar un registro o una verificaci?n.",
		},
		fr: {
			title: "Email temporaire sans inscription | Accès immédiat à la boîte",
			description:
				"Utilisez trashmail sans créer de compte quand vous avez besoin d'un accès immédiat à une boîte jetable pour une vérification, une inscription ou un téléchargement court.",
		},
		de: {
			title: "Temporäre E-Mail ohne Registrierung | Sofortiger Postfach-Zugriff",
			description:
				"Nutze trashmail ohne Kontoerstellung, wenn du sofortigen Zugriff auf ein Wegwerf-Postfach für kurze Verifizierung, Registrierung oder Download-Flows brauchst.",
		},
		ja: {
			title: "登録不要の一時メール | アカウント不要ですぐ受信",
			description:
				"アカウント作成なしで、短い認証、登録、ダウンロードのための一時受信箱にすぐアクセスできます。",
		},
		ko: {
			title: "가입 없는 임시 이메일 | 계정 없이 바로 받는 수신함",
			description:
				"계정 생성 없이 짧은 인증, 가입, 다운로드 흐름에 바로 쓸 수 있는 일회용 받은편지함입니다.",
		},
		ru: {
			title: "Временная почта без регистрации | Мгновенный доступ к ящику",
			description:
				"Используйте trashmail без создания аккаунта, когда нужен моментальный доступ к одноразовому ящику для короткой верификации, регистрации или загрузки.",
		},
		pt: {
			title: "Email temporário sem cadastro | Acesso imediato à caixa",
			description:
				"Use o trashmail sem criar conta quando você precisa de acesso imediato a uma caixa descartável para verificação, cadastro ou download curto.",
		},
		ar: {
			title: "بريد مؤقت بدون تسجيل | وصول فوري إلى الصندوق",
			description:
				"استخدم trashmail من دون إنشاء حساب عندما تحتاج إلى صندوق فوري لعملية تحقق أو تسجيل أو تنزيل قصير.",
		},
	},
	"disposable-email-for-verification": {
		en: {
			title: "Disposable Email for Verification | When a One-Off Inbox Is Enough",
			description:
				"Use trashmail for OTP codes, activation messages, and confirmation links when the inbox only needs to last long enough to finish verification.",
		},
		zh: {
			title: "验证码一次性邮箱（OTP临时邮箱）| trashmail.space",
			description:
				"使用验证码一次性邮箱接收 OTP 与确认邮件，适合临时邮箱注册场景，减少垃圾邮件并保护真实邮箱隐私。",
		},
		es: {
			title: "Correo desechable para verificaci?n | OTP y enlaces de confirmaci?n",
			description:
				"Usa trashmail para c?digos OTP, mensajes de activaci?n y enlaces de confirmaci?n cuando la bandeja solo necesita durar hasta terminar la verificaci?n.",
		},
		fr: {
			title: "Email jetable pour vérification | Quand une boîte ponctuelle suffit",
			description:
				"Utilisez trashmail pour les codes OTP, messages d'activation et liens de confirmation quand la boîte n'a besoin d'exister que le temps de terminer la vérification.",
		},
		de: {
			title: "Wegwerf-E-Mail für Verifizierung | Wenn ein einmaliges Postfach reicht",
			description:
				"Nutze trashmail für OTP-Codes, Aktivierungsnachrichten und Bestätigungslinks, wenn das Postfach nur lange genug bestehen muss, um die Verifizierung abzuschließen.",
		},
		ja: {
			title: "認証コード向け使い捨てメール | 単発認証に向いた受信箱",
			description:
				"OTP、確認リンク、アクティベーション通知を、メイン受信箱を汚さずに受け取りたいときに使えます。",
		},
		ko: {
			title: "인증 코드용 일회용 이메일 | 한 번 쓰는 인증에 맞는 수신함",
			description:
				"OTP, 확인 링크, 활성화 메시지를 메인 받은편지함을 어지럽히지 않고 받고 싶을 때 적합합니다.",
		},
		ru: {
			title: "Одноразовая почта для верификации | Когда разового ящика достаточно",
			description:
				"Используйте trashmail для OTP-кодов, писем активации и ссылок подтверждения, когда ящик нужен только до завершения верификации.",
		},
		pt: {
			title: "Email descartável para verificação | Quando uma caixa pontual basta",
			description:
				"Use o trashmail para OTP, mensagens de ativação e links de confirmação quando a caixa só precisa existir até o fim da verificação.",
		},
		ar: {
			title: "بريد مؤقت للتحقق | عندما يكفي صندوق لمرة واحدة",
			description:
				"استخدم trashmail لرموز OTP ورسائل التفعيل وروابط التأكيد عندما لا تحتاج إلى الصندوق إلا حتى نهاية التحقق.",
		},
	},
	"temporary-email-for-registration": {
		en: {
			title: "Temporary Email for Registration | When a Disposable Inbox Makes Sense",
			description:
				"Use trashmail for low-risk registrations, trial accounts, and one-off signups when the inbox does not need to remain part of long-term account ownership.",
		},
		zh: {
			title: "临时邮箱注册专用（注册临时邮箱）| trashmail.space",
			description:
				"用于临时邮箱注册、试用账号和低风险平台注册，快速收验证码并减少真实邮箱暴露。",
		},
		es: {
			title: "Correo temporal para registro | Cu?ndo tiene sentido usarlo",
			description:
				"Usa trashmail para registros de bajo riesgo, cuentas de prueba y altas puntuales cuando la direcci?n no vaya a formar parte de la cuenta a largo plazo.",
		},
		fr: {
			title: "Email temporaire pour inscription | Quand cela a du sens",
			description:
				"Utilisez trashmail pour les inscriptions à faible risque, les comptes d'essai et les accès ponctuels quand l'adresse n'a pas vocation à rester liée au compte.",
		},
		de: {
			title: "Temporäre E-Mail für Registrierungen | Wann sie sinnvoll ist",
			description:
				"Nutze trashmail für Registrierungen mit geringem Risiko, Testkonten und einmalige Anmeldungen, wenn die Adresse nicht dauerhaft zum Konto gehören muss.",
		},
		ja: {
			title: "登録向け一時メール | 低リスク登録に使う判断基準",
			description:
				"低リスク登録、試用アカウント、単発のサインアップに、一時アドレスが向いているかを判断できます。",
		},
		ko: {
			title: "가입용 임시 이메일 | 저위험 가입에 맞는 판단 기준",
			description:
				"저위험 가입, 체험 계정, 단발성 등록에 임시 주소가 적합한지 판단할 수 있습니다.",
		},
		ru: {
			title: "Временная почта для регистрации | Когда это действительно имеет смысл",
			description:
				"Используйте trashmail для низкорисковых регистраций, тестовых аккаунтов и разовых signup-сценариев, когда адрес не должен оставаться частью аккаунта надолго.",
		},
		pt: {
			title: "Email temporário para cadastro | Quando vale a pena usar",
			description:
				"Use o trashmail em cadastros de baixo risco, contas de teste e inscrições pontuais quando o endereço não precisa permanecer ligado à conta.",
		},
		ar: {
			title: "بريد مؤقت للتسجيل | متى يكون منطقيًا استخدامه",
			description:
				"استخدم trashmail للتسجيلات منخفضة المخاطر والحسابات التجريبية والاشتراكات المؤقتة عندما لا يحتاج العنوان إلى البقاء جزءًا دائمًا من الحساب.",
		},
	},
	"online-temporary-email": {
		en: {
			title: "Online Temporary Inbox | Browser Access Without Setup",
			description:
				"Use the trashmail online inbox when you need immediate browser access to OTP messages, verification links, or other short-lived email checks.",
		},
		zh: {
			title: "在线临时邮箱（即时收信）| trashmail.space",
			description:
				"在线临时邮箱即时可用，适合验证码、确认链接和短期收信场景，支持快速刷新。",
		},
		es: {
			title: "Bandeja temporal online | Acceso desde el navegador sin configurar nada",
			description:
				"Abre la bandeja online de trashmail cuando necesites acceso inmediato desde el navegador a c?digos OTP, enlaces de verificaci?n u otras comprobaciones cortas.",
		},
		fr: {
			title: "Boîte temporaire en ligne | Accès navigateur sans configuration",
			description:
				"Utilisez la boîte en ligne de trashmail quand vous avez besoin d'un accès immédiat dans le navigateur à un OTP, un lien de vérification ou un contrôle email de courte durée.",
		},
		de: {
			title: "Online-Temporärpostfach | Browser-Zugriff ohne Einrichtung",
			description:
				"Nutze das Online-Postfach von trashmail, wenn du sofortigen Browser-Zugriff auf OTP-Nachrichten, Bestätigungslinks oder andere kurzlebige E-Mail-Prüfungen brauchst.",
		},
		ja: {
			title: "オンライン一時メール | ブラウザだけですぐ受信",
			description:
				"OTP や確認リンクを、アプリ設定なしでブラウザからすぐ確認したいときの一時受信箱です。",
		},
		ko: {
			title: "온라인 임시 이메일 | 브라우저에서 바로 확인하는 수신함",
			description:
				"앱 설정 없이 브라우저에서 OTP와 확인 링크를 바로 확인하고 싶을 때 쓰는 임시 받은편지함입니다.",
		},
		ru: {
			title: "Онлайн временный ящик | Доступ из браузера без настройки",
			description:
				"Используйте онлайн-ящик trashmail, когда нужен мгновенный доступ из браузера к OTP, ссылкам подтверждения и другим коротким email-проверкам.",
		},
		pt: {
			title: "Caixa temporária online | Acesso pelo navegador sem configurar nada",
			description:
				"Use a caixa online do trashmail quando você precisa de acesso imediato pelo navegador a OTPs, links de confirmação e outras checagens curtas de email.",
		},
		ar: {
			title: "بريد مؤقت أونلاين | وصول من المتصفح من دون إعداد",
			description:
				"استخدم صندوق trashmail الأونلاين عندما تحتاج إلى وصول فوري من المتصفح إلى OTP أو روابط التأكيد أو رسائل قصيرة العمر.",
		},
	},
	"domestic-temporary-email": {
		en: {
			title:
				"Domestic Temporary Email | Regional OTP Delivery Troubleshooting",
			description:
				"Use this guide when regional or local platforms delay OTP delivery, filter disposable domains, or behave inconsistently during verification.",
		},
		zh: {
			title: "国内临时邮箱收信指南 | trashmail.space",
			description:
				"国内临时邮箱场景下的验证码接收建议：常见延迟原因、重发步骤和收信排查方法。",
		},
		es: {
			title: "Correo temporal y entrega regional | Gu?a para retrasos de OTP",
			description:
				"Usa esta gu?a cuando una plataforma local retrasa OTP, filtra dominios temporales o se comporta de forma irregular durante la verificaci?n.",
		},
		fr: {
			title: "Email temporaire local | Guide de diagnostic pour les OTP régionaux",
			description:
				"Utilisez ce guide quand une plateforme régionale retarde les OTP, filtre les domaines temporaires ou se comporte de manière irrégulière pendant la vérification.",
		},
		de: {
			title: "Lokale temporäre E-Mail | Zustellhilfe für regionale OTPs",
			description:
				"Nutze diesen Leitfaden, wenn regionale Plattformen OTP-Zustellung verzögern, Wegwerf-Domains filtern oder sich bei Verifizierungen ungleichmäßig verhalten.",
		},
		ja: {
			title: "国内向け一時メール | 地域サービスの受信確認ガイド",
			description:
				"国内サービスで OTP が遅れる、一時ドメインが制限される、挙動が不安定になる場合の確認手順をまとめています。",
		},
		ko: {
			title: "국내용 임시 이메일 | 지역 서비스 수신 체크 가이드",
			description:
				"국내 서비스에서 OTP 지연, 임시 도메인 제한, 불안정한 수신이 생길 때 점검할 순서를 정리했습니다.",
		},
		ru: {
			title: "Локальная временная почта | Диагностика региональной доставки OTP",
			description:
				"Используйте это руководство, если региональные платформы задерживают OTP, фильтруют временные домены или ведут себя нестабильно во время верификации.",
		},
		pt: {
			title: "Email temporário local | Guia para entrega regional de OTP",
			description:
				"Use este guia quando plataformas regionais atrasarem OTPs, filtrarem domínios temporários ou se comportarem de forma irregular na verificação.",
		},
		ar: {
			title: "البريد المؤقت المحلي | دليل فحص تسليم OTP الإقليمي",
			description:
				"استخدم هذا الدليل عندما تؤخر المنصات الإقليمية رسائل OTP أو تحظر النطاقات المؤقتة أو تتصرف بشكل غير منتظم أثناء التحقق.",
		},
	},
	"can-temporary-email-send": {
		en: {
			title:
				"Can Temporary Email Send Messages? | Why Disposable Inboxes Are Receive-Only",
			description:
				"Learn why most temporary inboxes are receive-only, what that means in practice, and when a permanent mailbox is required instead.",
		},
		zh: {
			title: "临时邮箱可以发送邮件吗？| trashmail.space",
			description:
				"解释临时邮箱发送能力与限制：为什么多数临时邮箱仅收信，以及何时应切换到长期邮箱。",
		},
		es: {
			title: "?El correo temporal puede enviar mensajes? | Por qu? suele ser solo de recepci?n",
			description:
				"Entiende por qu? la mayor?a de buzones temporales son solo de recepci?n, qu? implica eso en la pr?ctica y cu?ndo necesitas un correo permanente.",
		},
		fr: {
			title: "Un email temporaire peut-il envoyer des messages ? | Pourquoi ces boîtes restent surtout en réception",
			description:
				"Comprenez pourquoi la plupart des boîtes temporaires restent en réception seule, ce que cela implique concrètement et quand une boîte permanente devient nécessaire.",
		},
		de: {
			title: "Kann temporäre E-Mail Nachrichten senden? | Warum Wegwerf-Postfächer nur empfangen",
			description:
				"Erfahre, warum die meisten temporären Postfächer nur empfangen, was das praktisch bedeutet und wann stattdessen ein dauerhaftes Postfach nötig ist.",
		},
		ja: {
			title: "一時メールは送信できる？ | 受信専用である理由",
			description:
				"一時受信箱の多くが受信専用である理由と、送信や継続連絡が必要な場面で恒久メールを選ぶべき理由を説明します。",
		},
		ko: {
			title: "임시 이메일로 발신할 수 있나요? | 왜 수신 전용으로 남는가",
			description:
				"임시 받은편지함이 수신 전용인 이유와, 발신이나 지속적 연락이 필요할 때 왜 영구 메일함이 필요한지 설명합니다.",
		},
		ru: {
			title: "Можно ли отправлять письма с временной почты? | Почему такие ящики работают только на прием",
			description:
				"Разбираем, почему большинство временных ящиков работают только на прием, что это значит на практике и когда нужен постоянный адрес.",
		},
		pt: {
			title: "Email temporário pode enviar mensagens? | Por que essas caixas ficam só no recebimento",
			description:
				"Entenda por que a maioria das caixas temporárias fica só no recebimento, o que isso significa na prática e quando um email permanente é necessário.",
		},
		ar: {
			title: "هل يمكن للبريد المؤقت إرسال رسائل؟ | لماذا يبقى غالبًا للاستقبال فقط",
			description:
				"افهم لماذا تكون معظم صناديق البريد المؤقت للاستقبال فقط، وما الذي يعنيه ذلك عمليًا، ومتى تحتاج إلى بريد دائم.",
		},
	},
	"smail-vs-smailpro": {
		en: {
			title: "trashmail.space vs smailpro | Service Distinction",
			description:
				"Explains that trashmail.space and smailpro are different services. trashmail.space operates independently with its own policies and infrastructure.",
		},
		zh: {
			title: "trashmail.space 与 smailpro / smail pro 关系说明",
			description:
				"官方说明：trashmail.space 是独立临时邮箱服务，与 smailpro 或同名近似产品无隶属关系。",
		},
		es: {
			title: "trashmail.space vs smailpro | Aclaraci?n de marca",
			description:
				"Aclaraci?n oficial: trashmail.space opera como servicio independiente, con su propia infraestructura y sin afiliaci?n con smailpro.",
		},
		fr: {
			title: "trashmail.space vs smailpro | Clarification de marque",
			description:
				"Clarification officielle : trashmail.space est un service indépendant avec sa propre infrastructure, sans affiliation avec smailpro.",
		},
		de: {
			title: "trashmail.space vs smailpro | Markenhinweis",
			description:
				"Offizieller Hinweis: trashmail.space arbeitet als eigenständiger Dienst mit eigener Infrastruktur und ohne Verbindung zu smailpro.",
		},
		ja: {
			title: "trashmail.space と smailpro の違い | 公式説明",
			description:
				"公式説明: trashmail.space は独立した一時メールサービスであり、独自運営で smailpro との提携はありません。",
		},
		ko: {
			title: "trashmail.space vs smailpro | 브랜드 안내",
			description:
				"공식 안내: trashmail.space는 자체 인프라로 운영되는 독립 서비스이며 smailpro와 같은 서비스가 아닙니다.",
		},
		ru: {
			title: "trashmail.space и smailpro | Разъяснение бренда",
			description:
				"Официальное пояснение: trashmail.space — независимый сервис со своей инфраструктурой и без связи со smailpro.",
		},
		pt: {
			title: "trashmail.space vs smailpro | Esclarecimento de marca",
			description:
				"Esclarecimento oficial: trashmail.space é um serviço independente, com infraestrutura própria e sem vínculo com o smailpro.",
		},
		ar: {
			title: "trashmail.space مقابل smailpro | توضيح العلامة",
			description:
				"توضيح رسمي: trashmail.space خدمة مستقلة ببنيتها الخاصة وليست جزءًا من smailpro أو من خدمات مشابهة الاسم.",
		},
	},
};

const HOME_BREADCRUMB_LABEL: Record<Locale, string> = {
	en: "Home",
	zh: "首页",
	es: "Inicio",
	fr: "Accueil",
	de: "Startseite",
	ja: "ホーム",
	ko: "홈",
	ru: "Главная",
	pt: "Início",
	ar: "الرئيسية",
};

type InternalCtaCopy = {
	title: string;
	description: string;
	links: Array<{ label: string; path: string }>;
};

const INTERNAL_CTA_COPY: Record<Locale, InternalCtaCopy> = {
	en: {
		title: "Start your temporary inbox now",
		description:
			"Create a disposable address now, then open the most common signup and OTP guides below.",
		links: [
			{ label: "Generate temporary email", path: "/" },
			{
				label: "Temporary email for registration",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Disposable email for verification",
				path: "/disposable-email-for-verification",
			},
		],
	},
	zh: {
		title: "立即开始使用临时邮箱",
		description: "一键生成一次性邮箱，再查看常用的临时邮箱注册与验证码指南。",
		links: [
			{ label: "生成临时邮箱", path: "/" },
			{ label: "临时邮箱注册指南", path: "/temporary-email-for-registration" },
			{ label: "验证码一次性邮箱", path: "/disposable-email-for-verification" },
		],
	},
	es: {
		title: "Empieza ahora con correo temporal",
		description:
			"Genera una dirección desechable en un clic y revisa las guías clave para registro y OTP.",
		links: [
			{ label: "Generar correo temporal", path: "/" },
			{
				label: "Correo temporal para registro",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Correo para verificación OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	fr: {
		title: "Démarrez votre boîte temporaire",
		description:
			"Créez une adresse jetable en un clic puis consultez les guides essentiels inscription et OTP.",
		links: [
			{ label: "Générer un email temporaire", path: "/" },
			{
				label: "Email temporaire pour inscription",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Email pour vérification OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	de: {
		title: "Temporäres Postfach sofort starten",
		description:
			"Erstelle eine Wegwerfadresse mit einem Klick und nutze die wichtigsten Guides zu Anmeldung und OTP.",
		links: [
			{ label: "Temporäre E-Mail erzeugen", path: "/" },
			{
				label: "Temporäre E-Mail für Registrierung",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Wegwerf-E-Mail für OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	ja: {
		title: "今すぐ一時メールを開始",
		description:
			"ワンタップで使い捨てアドレスを作成し、登録とOTPの主要ガイドを確認できます。",
		links: [
			{ label: "一時メールを生成", path: "/" },
			{
				label: "登録向け一時メール",
				path: "/temporary-email-for-registration",
			},
			{
				label: "OTP認証向け使い捨てメール",
				path: "/disposable-email-for-verification",
			},
		],
	},
	ko: {
		title: "지금 임시 이메일 시작하기",
		description:
			"한 번에 일회용 주소를 만들고 가입/OTP 핵심 가이드를 바로 확인하세요.",
		links: [
			{ label: "임시 이메일 생성", path: "/" },
			{
				label: "가입용 임시 이메일",
				path: "/temporary-email-for-registration",
			},
			{
				label: "OTP 인증용 일회용 이메일",
				path: "/disposable-email-for-verification",
			},
		],
	},
	ru: {
		title: "Запустите временный ящик сейчас",
		description:
			"Создайте одноразовый адрес в один клик и изучите ключевые гайды по регистрации и OTP.",
		links: [
			{ label: "Создать временную почту", path: "/" },
			{
				label: "Временная почта для регистрации",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Одноразовая почта для OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	pt: {
		title: "Comece sua caixa temporária agora",
		description:
			"Gere um endereço descartável em um clique e acesse os guias mais úteis para cadastro e OTP.",
		links: [
			{ label: "Gerar email temporário", path: "/" },
			{
				label: "Email temporário para cadastro",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Email para verificação OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
	ar: {
		title: "ابدأ صندوق البريد المؤقت الآن",
		description:
			"أنشئ عنوانًا مؤقتًا بنقرة واحدة ثم راجع أهم أدلة التسجيل والتحقق عبر OTP.",
		links: [
			{ label: "إنشاء بريد مؤقت", path: "/" },
			{ label: "بريد مؤقت للتسجيل", path: "/temporary-email-for-registration" },
			{
				label: "بريد مؤقت لرموز OTP",
				path: "/disposable-email-for-verification",
			},
		],
	},
};

function isKnownMarkdownSlug(value: string): value is MarkdownPageSlug {
	return (KNOWN_MD_PAGES as readonly string[]).includes(value);
}

function isInfoMarkdownSlug(
	value: MarkdownPageSlug,
): value is InfoMarkdownSlug {
	return (INFO_MD_PAGES as readonly string[]).includes(value);
}

function isArticleMarkdownSlug(
	value: MarkdownPageSlug,
): value is ArticleMarkdownSlug {
	return (ARTICLE_MD_PAGES as readonly string[]).includes(value);
}

function getMarkdownSeoCopy(locale: Locale, slug: MarkdownPageSlug) {
	return mdMetaCopy[slug][locale] ?? mdMetaCopy[slug][DEFAULT_LOCALE];
}

function getMarkdownSlugFromPathname(
	pathname: string,
): MarkdownPageSlug | null {
	const normalized = normalizePathname(pathname);
	const basePath = stripLocalePrefix(normalized);
	const slug = basePath.replace(/^\//, "");
	if (!isKnownMarkdownSlug(slug)) {
		return null;
	}
	return slug;
}

function getFaqJsonLd(locale: Locale, pageUrl: string) {
	const entries =
		FAQ_JSON_LD_COPY[locale] ?? FAQ_JSON_LD_COPY[DEFAULT_LOCALE] ?? [];
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: entries.map((entry) => ({
			"@type": "Question",
			name: entry.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: entry.answer,
			},
		})),
		url: pageUrl,
	};
}

function getHeadlineFromMetaTitle(title: string): string {
	const [headline] = title.split("|");
	return headline?.trim() || title;
}

function getArticleJsonLd(
	locale: Locale,
	slug: ArticleMarkdownSlug,
	pageUrl: string,
) {
	const pageMeta = getMarkdownSeoCopy(locale, slug);
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: getHeadlineFromMetaTitle(pageMeta.title),
		description: pageMeta.description,
		inLanguage: locale,
		mainEntityOfPage: pageUrl,
		datePublished: "2026-03-01",
		dateModified: "2026-03-01",
		author: {
			"@type": "Organization",
			name: "trashmail.space",
		},
		publisher: {
			"@type": "Organization",
			name: "trashmail.space",
			url: BASE_URL,
		},
	};
}

function getBreadcrumbJsonLd(
	locale: Locale,
	slug: ArticleMarkdownSlug,
	pageUrl: string,
) {
	const pageMeta = getMarkdownSeoCopy(locale, slug);
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name:
					HOME_BREADCRUMB_LABEL[locale] ??
					HOME_BREADCRUMB_LABEL[DEFAULT_LOCALE],
				item: `${BASE_URL}${toLocalePath("/", locale)}`,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: getHeadlineFromMetaTitle(pageMeta.title),
				item: pageUrl,
			},
		],
	};
}

function getInternalCtaCopy(locale: Locale): InternalCtaCopy {
	return INTERNAL_CTA_COPY[locale] ?? INTERNAL_CTA_COPY[DEFAULT_LOCALE];
}

export function meta({ params, location, matches }: Route.MetaArgs) {
	const { locale } = resolveLocaleParam(params.lang);
	const slug = getMarkdownSlugFromPathname(location.pathname);
	if (!slug) {
		return mergeRouteMeta(matches, []);
	}
	const pageMeta = getMarkdownSeoCopy(locale, slug);

	return mergeRouteMeta(matches, [
		{ title: pageMeta.title },
		{ name: "description", content: pageMeta.description },
		{
			name: "robots",
			content: isMarkdownLocaleIndexable(locale)
				? "index, follow"
				: "noindex, follow",
		},
	]);
}

export async function loader({ params, request }: Route.LoaderArgs) {
	const { locale, shouldRedirectToDefault, isInvalid } = resolveLocaleParam(
		params.lang,
	);
	if (isInvalid) {
		throw new Response("Not Found", { status: 404 });
	}

	const url = new URL(request.url);
	if (shouldRedirectToDefault) {
		const normalizedPath = stripDefaultLocalePrefix(url.pathname);
		throw redirect(`${normalizedPath}${url.search}`, 301);
	}

	const pathname =
		url.pathname.endsWith("/") && url.pathname.length > 1
			? url.pathname.slice(0, -1)
			: url.pathname;
	const segments = pathname.split("/").filter(Boolean);
	const slug = segments[segments.length - 1] ?? "";
	if (!slug || slug === locale || slug === DEFAULT_LOCALE) {
		throw new Response("Not Found", { status: 404 });
	}
	if (!isKnownMarkdownSlug(slug)) {
		throw new Response("Not Found", { status: 404 });
	}

	const preferredPath = `../md/${locale}/${slug}.md`;
	const fallbackPath = `../md/${DEFAULT_LOCALE}/${slug}.md`;
	const sourceLoader =
		markdownSources[preferredPath] ??
		(locale !== DEFAULT_LOCALE ? markdownSources[fallbackPath] : undefined);
	const source = sourceLoader ? await sourceLoader().catch(() => null) : null;

	if (!source) {
		throw new Response("Not Found", { status: 404 });
	}
	const ast = Markdoc.parse(source);
	const content = Markdoc.transform(ast);
	const html = Markdoc.renderers.html(content);

	return { html, locale, slug: slug as MarkdownPageSlug };
}

export default function MarkdownPage({ loaderData }: Route.ComponentProps) {
	const pageUrl = `${BASE_URL}${toLocalePath(`/${loaderData.slug}`, loaderData.locale)}`;
	const faqJsonLd =
		loaderData.slug === "faq" ? getFaqJsonLd(loaderData.locale, pageUrl) : null;
	const articleJsonLd = isArticleMarkdownSlug(loaderData.slug)
		? getArticleJsonLd(loaderData.locale, loaderData.slug, pageUrl)
		: null;
	const breadcrumbJsonLd = isArticleMarkdownSlug(loaderData.slug)
		? getBreadcrumbJsonLd(loaderData.locale, loaderData.slug, pageUrl)
		: null;
	const infoCta = isInfoMarkdownSlug(loaderData.slug)
		? getInternalCtaCopy(loaderData.locale)
		: null;

	return (
		<div className="flex flex-1 py-3 sm:py-4">
			{faqJsonLd && faqJsonLd.mainEntity.length > 0 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
				/>
			)}
			{articleJsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
				/>
			)}
			{breadcrumbJsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
				/>
			)}
			<div className="markdown-shell w-full">
				<article
					className="prose prose-sm sm:prose-base max-w-none"
					dangerouslySetInnerHTML={{ __html: loaderData.html }}
				/>
				{infoCta && (
					<section
						className="theme-card mt-6 space-y-3 p-4 sm:p-5"
						aria-label="Related temporary email pages"
					>
						<h2 className="text-theme-primary font-display text-lg font-semibold">
							{infoCta.title}
						</h2>
						<p className="text-theme-secondary text-sm leading-relaxed">
							{infoCta.description}
						</p>
						<div className="grid gap-2 sm:grid-cols-3">
							{infoCta.links.map((link) => (
								<Link
									key={link.path}
									to={toLocalePath(link.path, loaderData.locale)}
									prefetch="viewport"
									className="theme-badge flex items-center justify-between px-3 py-2 text-xs font-medium"
								>
									<span>{link.label}</span>
									<span aria-hidden="true">{"->"}</span>
								</Link>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
