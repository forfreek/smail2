import type { Locale } from "./config";

export interface Dictionary {
	home: {
		title: string;
		description: string;
		keywords: string;
		heroTag: string;
		heroTitle: string;
		heroDescription: string;
		loadingAddresses: string;
		currentAddress: string;
		copy: string;
		copied: string;
		deleteAddress: string;
		deleting: string;
		generateNew: string;
		generating: string;
		noAddressTitle: string;
		noAddressDescription: string;
		generateAddress: string;
		stats: {
			lifetimeValue: string;
			refreshValue: string;
			registrationValue: string;
			lifetime: string;
			refresh: string;
			registration: string;
		};
		inboxTag: string;
		inboxTitle: string;
		tapToOpen: string;
		loadingEmails: string;
		emptyInboxTitle: string;
		emptyInboxDescription: string;
		refreshInbox: string;
		refreshingInbox: string;
		lastRefresh: string;
		safetyHint: string;
		modal: {
			title: string;
			from: string;
			time: string;
			loading: string;
			empty: string;
		};
	};
	layout: {
		siteSubtitle: string;
		nav: {
			home: string;
			about: string;
			faq: string;
		};
		footerTag: string;
		footerDescription: string;
		footerLinks: {
			faq: string;
			privacy: string;
			terms: string;
			about: string;
		};
		copyright: string;
		themeToLight: string;
		themeToDark: string;
	};
}

const en: Dictionary = {
	home: {
		title: "trashmail | 24-Hour Disposable Inbox for Verification and Trials",
		description:
			"Create a 24-hour disposable inbox on trashmail.space for trials, verification codes, and short-lived email checks without using your primary mailbox.",
		keywords:
			"trashmail, trashmail.space, temporary inbox, disposable inbox, temporary email, temp mail, 24 hour email, otp inbox, no registration email",
		heroTag: "24-hour inbox",
		heroTitle: "Create a disposable inbox before you use your primary mailbox.",
		heroDescription:
			"Use trashmail for trial accounts, verification codes, and short-lived email flows. Messages stay available for up to 24 hours, then clear automatically.",
		loadingAddresses: "Loading addresses...",
		currentAddress: "Current disposable address",
		copy: "Copy",
		copied: "Copied",
		deleteAddress: "Delete address",
		deleting: "Deleting...",
		generateNew: "Generate new",
		generating: "Generating...",
		noAddressTitle: "No inbox created yet",
		noAddressDescription:
			"Generate an address when you need a short-lived inbox for signup, verification, or a one-off download flow.",
		generateAddress: "Generate address",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Instant",
			registrationValue: "Zero",
			lifetime: "Email retention",
			refresh: "Inbox refresh",
			registration: "Registration",
		},
		inboxTag: "Inbox",
		inboxTitle: "Latest emails",
		tapToOpen: "Tap to open",
		loadingEmails: "Loading emails...",
		emptyInboxTitle: "Your inbox is ready",
		emptyInboxDescription:
			"No messages yet. New mail will appear here after delivery.",
		refreshInbox: "Refresh",
		refreshingInbox: "Refreshing...",
		lastRefresh: "Last refresh",
		safetyHint:
			"Do not use this inbox for banking, work, recovery, or other critical accounts. Messages are removed after the retention window ends.",
		modal: {
			title: "Message preview",
			from: "From",
			time: "Time",
			loading: "Loading...",
			empty: "No content",
		},
	},
	layout: {
		siteSubtitle: "disposable inbox",
		nav: {
			home: "Home",
			about: "About",
			faq: "FAQ",
		},
		footerTag: "short-lived inbox utility",
		footerDescription:
			"Use trashmail when a site asks for an address but the message does not belong in your long-term inbox.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Privacy Policy",
			terms: "Terms of Use",
			about: "About trashmail.space",
		},
		copyright: "Use a disposable inbox when the task is temporary.",
		themeToLight: "☀ Light",
		themeToDark: "🌙 Dark",
	},
};

const zh: Dictionary = {
	home: {
		title: "临时邮箱生成器（24小时）- 免费一次性邮箱免注册收验证码 | trashmail.space",
		description:
			"在 trashmail.space 创建 24 小时一次性收件箱，用于试用注册、验证码接收和短期收信，不必暴露你的主邮箱。",
		keywords:
			"临时邮箱, 一次性邮箱, 临时邮箱生成器, 免费临时邮箱, 24小时临时邮箱, 24小时邮箱, 验证码邮箱, 免注册临时邮箱, 在线临时邮箱, 国内临时邮箱, 临时邮箱注册, 邮箱生成器",
		heroTag: "24小时收件箱",
		heroTitle: "先生成一次性收件箱，再决定要不要暴露主邮箱。",
		heroDescription:
			"trashmail 适合试用账号、验证码和短期收信流程。邮件最多保留 24 小时，之后自动清理。",
		loadingAddresses: "正在加载邮箱地址...",
		currentAddress: "当前一次性地址",
		copy: "复制",
		copied: "已复制",
		deleteAddress: "删除地址",
		deleting: "删除中...",
		generateNew: "生成新地址",
		generating: "生成中...",
		noAddressTitle: "还没有生成收件箱",
		noAddressDescription: "只有在你需要短期收信、注册验证或一次性下载时，再生成一个地址。",
		generateAddress: "生成地址",
		stats: {
			lifetimeValue: "24小时",
			refreshValue: "即时",
			registrationValue: "零门槛",
			lifetime: "邮件保留",
			refresh: "收件箱刷新",
			registration: "无需注册",
		},
		inboxTag: "收件箱",
		inboxTitle: "最新邮件",
		tapToOpen: "点击查看",
		loadingEmails: "正在加载邮件...",
		emptyInboxTitle: "收件箱已准备好",
		emptyInboxDescription: "暂时还没有邮件。新邮件送达后，会显示在这里。",
		refreshInbox: "刷新",
		refreshingInbox: "刷新中...",
		lastRefresh: "最近刷新",
		safetyHint:
			"不要把这个收件箱用于银行、工作、账号找回或其他关键访问。保留窗口结束后，邮件会被自动删除。",
		modal: {
			title: "邮件预览",
			from: "发件人",
			time: "时间",
			loading: "加载中...",
			empty: "暂无内容",
		},
	},
	layout: {
		siteSubtitle: "一次性收件箱",
		nav: {
			home: "首页",
			about: "关于",
			faq: "常见问题",
		},
		footerTag: "短期收件箱工具",
		footerDescription:
			"当网站要求填写邮箱，但这封邮件并不值得进入你的长期邮箱时，就用 trashmail。",
		footerLinks: {
			faq: "常见问题",
			privacy: "隐私政策",
			terms: "使用条款",
			about: "关于 trashmail.space",
		},
		copyright: "任务是临时的，就用一次性收件箱。",
		themeToLight: "☀ 浅色",
		themeToDark: "🌙 深色",
	},
};

const es: Dictionary = {
	home: {
		title: "Correo temporal gratis 24h sin registro para OTP | trashmail.space",
		description:
			"Crea un buzón desechable de 24 horas en trashmail.space para pruebas, códigos de verificación y revisiones de correo de corta duración sin usar tu bandeja principal.",
		keywords:
			"correo temporal, correo temporal gratis, email temporal, email desechable, temp mail, 24 horas, sin registro, codigo otp, trashmail.space",
		heroTag: "Buzón de 24 horas",
		heroTitle: "Crea un buzón desechable antes de usar tu correo principal.",
		heroDescription:
			"Usa trashmail para cuentas de prueba, códigos de verificación y flujos de correo de corta duración. Los mensajes permanecen disponibles hasta 24 horas y luego se eliminan automáticamente.",
		loadingAddresses: "Cargando direcciones...",
		currentAddress: "Dirección desechable actual",
		copy: "Copiar",
		copied: "Copiado",
		deleteAddress: "Eliminar dirección",
		deleting: "Eliminando...",
		generateNew: "Generar otra",
		generating: "Generando...",
		noAddressTitle: "Aún no has creado un buzón",
		noAddressDescription:
			"Genera una dirección cuando necesites un buzón de corta duración para registros, verificaciones o una descarga puntual.",
		generateAddress: "Generar dirección",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Instantáneo",
			registrationValue: "Cero",
			lifetime: "Retención del correo",
			refresh: "Actualización del buzón",
			registration: "Registro",
		},
		inboxTag: "Bandeja",
		inboxTitle: "Últimos correos",
		tapToOpen: "Toca para abrir",
		loadingEmails: "Cargando correos...",
		emptyInboxTitle: "Tu buzón está listo",
		emptyInboxDescription: "Todavía no hay mensajes. El correo nuevo aparecerá aquí cuando llegue.",
		refreshInbox: "Actualizar",
		refreshingInbox: "Actualizando...",
		lastRefresh: "Última actualización",
		safetyHint:
			"No uses este buzón para banca, trabajo, recuperación de cuentas ni otros accesos críticos. Los mensajes se eliminan cuando termina la ventana de retención.",
		modal: {
			title: "Vista previa del mensaje",
			from: "De",
			time: "Hora",
			loading: "Cargando...",
			empty: "Sin contenido",
		},
	},
	layout: {
		siteSubtitle: "buzón desechable",
		nav: { home: "Inicio", about: "Acerca de", faq: "FAQ" },
		footerTag: "utilidad de buzón de corta duración",
		footerDescription:
			"Usa trashmail cuando un sitio te pida una dirección, pero el mensaje no merezca entrar en tu bandeja de largo plazo.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Privacidad",
			terms: "Términos",
			about: "Sobre trashmail.space",
		},
		copyright: "Usa un buzón desechable cuando la tarea sea temporal.",
		themeToLight: "☀ Claro",
		themeToDark: "🌙 Oscuro",
	},
};

const fr: Dictionary = {
	home: {
		title: "Email temporaire gratuit 24h sans inscription | trashmail.space",
		description:
			"Créez une boîte jetable 24h sur trashmail.space pour essais, codes de vérification et contrôles email de courte durée sans utiliser votre boîte principale.",
		keywords:
			"email temporaire, email jetable, temp mail, 24h, sans inscription, code otp, boite mail temporaire, trashmail.space",
		heroTag: "Boîte 24 heures",
		heroTitle: "Créez une boîte jetable avant d'utiliser votre adresse principale.",
		heroDescription:
			"Utilisez trashmail pour les comptes d'essai, les codes de vérification et les usages email de courte durée. Les messages restent disponibles jusqu'à 24 heures puis sont supprimés automatiquement.",
		loadingAddresses: "Chargement des adresses...",
		currentAddress: "Adresse temporaire actuelle",
		copy: "Copier",
		copied: "Copié",
		deleteAddress: "Supprimer l'adresse",
		deleting: "Suppression...",
		generateNew: "Générer une autre adresse",
		generating: "Génération...",
		noAddressTitle: "Aucune boîte créée pour le moment",
		noAddressDescription:
			"Générez une adresse quand vous avez besoin d'une boîte de courte durée pour une inscription, une vérification ou un téléchargement ponctuel.",
		generateAddress: "Générer une adresse",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Instantané",
			registrationValue: "Zéro",
			lifetime: "Rétention des emails",
			refresh: "Actualisation de la boîte",
			registration: "Inscription",
		},
		inboxTag: "Boîte",
		inboxTitle: "Derniers emails",
		tapToOpen: "Touchez pour ouvrir",
		loadingEmails: "Chargement des emails...",
		emptyInboxTitle: "Votre boîte est prête",
		emptyInboxDescription: "Aucun message pour le moment. Les nouveaux emails apparaîtront ici après réception.",
		refreshInbox: "Rafraîchir",
		refreshingInbox: "Actualisation...",
		lastRefresh: "Dernière mise à jour",
		safetyHint:
			"N'utilisez pas cette boîte pour la banque, le travail, la récupération de compte ou d'autres accès critiques. Les messages sont supprimés à la fin de la fenêtre de rétention.",
		modal: {
			title: "Aperçu du message",
			from: "De",
			time: "Heure",
			loading: "Chargement...",
			empty: "Aucun contenu",
		},
	},
	layout: {
		siteSubtitle: "boîte jetable",
		nav: { home: "Accueil", about: "À propos", faq: "FAQ" },
		footerTag: "utilitaire de boîte courte durée",
		footerDescription:
			"Utilisez trashmail quand un site demande une adresse, mais que le message ne mérite pas votre boîte de long terme.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Confidentialité",
			terms: "Conditions",
			about: "À propos de trashmail.space",
		},
		copyright: "Utilisez une boîte jetable quand la tâche est temporaire.",
		themeToLight: "☀ Clair",
		themeToDark: "🌙 Sombre",
	},
};

const de: Dictionary = {
	home: {
		title: "Temporäre E-Mail kostenlos (24h) ohne Registrierung | trashmail.space",
		description:
			"Erstelle auf trashmail.space ein Wegwerf-Postfach für 24 Stunden für Testzugänge, Verifizierungscodes und kurzlebige E-Mail-Prüfungen, ohne dein Hauptpostfach zu verwenden.",
		keywords:
			"temporäre email, wegwerf-email, temp mail, 24h email, ohne registrierung, otp code email, trashmail.space",
		heroTag: "24-Stunden-Postfach",
		heroTitle: "Erstelle erst ein Wegwerf-Postfach, bevor du dein Hauptpostfach benutzt.",
		heroDescription:
			"Nutze trashmail für Testkonten, Verifizierungscodes und kurzlebige E-Mail-Abläufe. Nachrichten bleiben bis zu 24 Stunden verfügbar und werden danach automatisch entfernt.",
		loadingAddresses: "Adressen werden geladen...",
		currentAddress: "Aktuelle Wegwerfadresse",
		copy: "Kopieren",
		copied: "Kopiert",
		deleteAddress: "Adresse löschen",
		deleting: "Wird gelöscht...",
		generateNew: "Neu generieren",
		generating: "Wird generiert...",
		noAddressTitle: "Noch kein Postfach erstellt",
		noAddressDescription:
			"Erzeuge eine Adresse, wenn du ein kurzlebiges Postfach für Registrierung, Verifizierung oder einen einmaligen Download brauchst.",
		generateAddress: "Adresse erzeugen",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Sofort",
			registrationValue: "Null",
			lifetime: "E-Mail-Aufbewahrung",
			refresh: "Postfach-Aktualisierung",
			registration: "Registrierung",
		},
		inboxTag: "Posteingang",
		inboxTitle: "Neueste E-Mails",
		tapToOpen: "Zum Öffnen tippen",
		loadingEmails: "E-Mails werden geladen...",
		emptyInboxTitle: "Dein Postfach ist bereit",
		emptyInboxDescription: "Noch keine Nachrichten. Neue E-Mails erscheinen hier nach der Zustellung.",
		refreshInbox: "Aktualisieren",
		refreshingInbox: "Wird aktualisiert...",
		lastRefresh: "Zuletzt aktualisiert",
		safetyHint:
			"Nutze dieses Postfach nicht für Banking, Arbeit, Konto-Wiederherstellung oder andere kritische Zugänge. Nachrichten werden nach Ablauf des Aufbewahrungsfensters entfernt.",
		modal: {
			title: "Nachrichtenvorschau",
			from: "Von",
			time: "Zeit",
			loading: "Lädt...",
			empty: "Kein Inhalt",
		},
	},
	layout: {
		siteSubtitle: "Wegwerf-Postfach",
		nav: { home: "Start", about: "Über", faq: "FAQ" },
		footerTag: "Kurzzeit-Postfach als Dienstprogramm",
		footerDescription:
			"Nutze trashmail, wenn eine Website eine Adresse verlangt, die Nachricht aber nicht in dein langfristiges Postfach gehört.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Datenschutz",
			terms: "Nutzungsbedingungen",
			about: "Über trashmail.space",
		},
		copyright: "Nutze ein Wegwerf-Postfach, wenn die Aufgabe nur vorübergehend ist.",
		themeToLight: "☀ Hell",
		themeToDark: "🌙 Dunkel",
	},
};

const ja: Dictionary = {
	home: {
		title: "一時メール（24時間）無料・登録不要でOTP受信 | trashmail.space",
		description:
			"trashmail.space で 24 時間使える使い捨て受信箱を作成し、試用登録、認証コード、短期のメール確認に使えます。主要メールを出す必要はありません。",
		keywords:
			"一時メール, 使い捨てメール, テンプメール, 24時間メール, 登録不要メール, OTP, 認証メール, trashmail.space",
		heroTag: "24時間受信箱",
		heroTitle: "主要メールを使う前に、使い捨て受信箱を作成してください。",
		heroDescription:
			"trashmail は試用アカウント、認証コード、短期のメールフロー向けです。メッセージは最大 24 時間保持され、その後自動で消去されます。",
		loadingAddresses: "アドレスを読み込み中...",
		currentAddress: "現在の一時アドレス",
		copy: "コピー",
		copied: "コピー済み",
		deleteAddress: "アドレス削除",
		deleting: "削除中...",
		generateNew: "別のアドレスを生成",
		generating: "生成中...",
		noAddressTitle: "まだ受信箱が作成されていません",
		noAddressDescription: "登録、認証、単発ダウンロード向けに短期受信箱が必要なときだけアドレスを生成してください。",
		generateAddress: "アドレス生成",
		stats: {
			lifetimeValue: "24時間",
			refreshValue: "即時",
			registrationValue: "不要",
			lifetime: "メール保持",
			refresh: "受信箱更新",
			registration: "登録",
		},
		inboxTag: "受信箱",
		inboxTitle: "最新メール",
		tapToOpen: "タップして開く",
		loadingEmails: "メールを読み込み中...",
		emptyInboxTitle: "受信箱の準備ができました",
		emptyInboxDescription: "まだメッセージはありません。新着メールは届いたあとここに表示されます。",
		refreshInbox: "更新",
		refreshingInbox: "更新中...",
		lastRefresh: "最終更新",
		safetyHint:
			"銀行、仕事、アカウント復旧、その他の重要なアクセスには使わないでください。保持期間が終わるとメッセージは削除されます。",
		modal: {
			title: "メッセージプレビュー",
			from: "差出人",
			time: "時刻",
			loading: "読み込み中...",
			empty: "内容なし",
		},
	},
	layout: {
		siteSubtitle: "使い捨て受信箱",
		nav: { home: "ホーム", about: "概要", faq: "FAQ" },
		footerTag: "短期受信箱ユーティリティ",
		footerDescription:
			"サイトがアドレスを求めても、そのメールが長期保管に値しないなら trashmail を使ってください。",
		footerLinks: {
			faq: "FAQ",
			privacy: "プライバシー",
			terms: "利用規約",
			about: "trashmail.space について",
		},
		copyright: "一時的な作業には使い捨て受信箱を使ってください。",
		themeToLight: "☀ ライト",
		themeToDark: "🌙 ダーク",
	},
};

const ko: Dictionary = {
	home: {
		title: "임시 이메일 24시간 무료, 가입 없이 OTP 수신 | trashmail.space",
		description:
			"trashmail.space에서 24시간 유지되는 일회용 메일함을 만들어 체험 가입, 인증 코드, 짧은 이메일 확인에 쓰세요. 주 메일함을 노출할 필요가 없습니다.",
		keywords:
			"임시 이메일, 일회용 이메일, 템프 메일, 24시간 메일, 가입 없는 이메일, OTP 메일, 인증 메일, trashmail.space",
		heroTag: "24시간 메일함",
		heroTitle: "주 메일함을 쓰기 전에 일회용 메일함부터 만드세요.",
		heroDescription:
			"trashmail은 체험 계정, 인증 코드, 짧게 끝나는 메일 흐름에 맞춰져 있습니다. 메시지는 최대 24시간 유지된 뒤 자동으로 정리됩니다.",
		loadingAddresses: "주소 불러오는 중...",
		currentAddress: "현재 임시 주소",
		copy: "복사",
		copied: "복사됨",
		deleteAddress: "주소 삭제",
		deleting: "삭제 중...",
		generateNew: "새로 생성",
		generating: "생성 중...",
		noAddressTitle: "아직 메일함이 만들어지지 않았습니다",
		noAddressDescription: "가입, 인증, 일회성 다운로드에 잠깐 쓸 메일함이 필요할 때만 주소를 생성하세요.",
		generateAddress: "주소 생성",
		stats: {
			lifetimeValue: "24시간",
			refreshValue: "즉시",
			registrationValue: "없음",
			lifetime: "메일 보관",
			refresh: "받은편지함 새로고침",
			registration: "가입",
		},
		inboxTag: "받은편지함",
		inboxTitle: "최신 메일",
		tapToOpen: "탭하여 열기",
		loadingEmails: "메일 불러오는 중...",
		emptyInboxTitle: "메일함이 준비되었습니다",
		emptyInboxDescription: "아직 메시지가 없습니다. 새 메일은 도착 후 여기에 표시됩니다.",
		refreshInbox: "새로고침",
		refreshingInbox: "새로고침 중...",
		lastRefresh: "최근 새로고침",
		safetyHint:
			"은행, 업무, 계정 복구, 그 밖의 중요한 접근에는 이 메일함을 쓰지 마세요. 보관 시간이 끝나면 메시지는 삭제됩니다.",
		modal: {
			title: "메일 미리보기",
			from: "보낸사람",
			time: "시간",
			loading: "불러오는 중...",
			empty: "내용 없음",
		},
	},
	layout: {
		siteSubtitle: "일회용 메일함",
		nav: { home: "홈", about: "소개", faq: "FAQ" },
		footerTag: "단기 메일함 도구",
		footerDescription:
			"사이트가 주소를 요구하지만 그 메일이 장기 보관함에 들어갈 필요는 없을 때 trashmail을 쓰세요.",
		footerLinks: {
			faq: "FAQ",
			privacy: "개인정보",
			terms: "이용약관",
			about: "trashmail.space 소개",
		},
		copyright: "작업이 일시적일 때는 일회용 메일함을 쓰세요.",
		themeToLight: "☀ 라이트",
		themeToDark: "🌙 다크",
	},
};

const ru: Dictionary = {
	home: {
		title: "Временная почта 24 часа бесплатно без регистрации | trashmail.space",
		description:
			"Создайте на trashmail.space одноразовый ящик на 24 часа для пробных регистраций, кодов подтверждения и коротких email-проверок без использования основной почты.",
		keywords:
			"временная почта, одноразовая почта, temp mail, почта 24 часа, без регистрации, otp код, trashmail.space",
		heroTag: "Ящик на 24 часа",
		heroTitle: "Сначала создайте одноразовый ящик, а уже потом используйте основную почту.",
		heroDescription:
			"Используйте trashmail для пробных аккаунтов, кодов подтверждения и коротких почтовых сценариев. Сообщения доступны до 24 часов, после чего удаляются автоматически.",
		loadingAddresses: "Загрузка адресов...",
		currentAddress: "Текущий временный адрес",
		copy: "Копировать",
		copied: "Скопировано",
		deleteAddress: "Удалить адрес",
		deleting: "Удаление...",
		generateNew: "Создать другой",
		generating: "Создание...",
		noAddressTitle: "Ящик пока не создан",
		noAddressDescription:
			"Создайте адрес, когда нужен короткоживущий ящик для регистрации, подтверждения или разовой загрузки.",
		generateAddress: "Создать адрес",
		stats: {
			lifetimeValue: "24ч",
			refreshValue: "Мгновенно",
			registrationValue: "Ноль",
			lifetime: "Хранение писем",
			refresh: "Обновление ящика",
			registration: "Регистрация",
		},
		inboxTag: "Входящие",
		inboxTitle: "Последние письма",
		tapToOpen: "Нажмите, чтобы открыть",
		loadingEmails: "Загрузка писем...",
		emptyInboxTitle: "Ваш ящик готов",
		emptyInboxDescription: "Пока сообщений нет. Новая почта появится здесь после доставки.",
		refreshInbox: "Обновить",
		refreshingInbox: "Обновление...",
		lastRefresh: "Последнее обновление",
		safetyHint:
			"Не используйте этот ящик для банковских, рабочих, восстановительных и других критичных доступов. Сообщения удаляются после окончания окна хранения.",
		modal: {
			title: "Предпросмотр",
			from: "От",
			time: "Время",
			loading: "Загрузка...",
			empty: "Нет содержимого",
		},
	},
	layout: {
		siteSubtitle: "одноразовый ящик",
		nav: { home: "Главная", about: "О сервисе", faq: "FAQ" },
		footerTag: "утилита для краткоживущего ящика",
		footerDescription:
			"Используйте trashmail, когда сайт просит адрес, но письмо не должно попадать в вашу долгосрочную почту.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Конфиденциальность",
			terms: "Условия",
			about: "О trashmail.space",
		},
		copyright: "Используйте одноразовый ящик, когда задача временная.",
		themeToLight: "☀ Светлая",
		themeToDark: "🌙 Тёмная",
	},
};

const pt: Dictionary = {
	home: {
		title: "Email temporário grátis 24h sem cadastro para OTP | trashmail.space",
		description:
			"Crie uma caixa descartável de 24 horas na trashmail.space para testes, códigos de verificação e checagens curtas de email sem usar sua caixa principal.",
		keywords:
			"email temporario, email temporário, email descartavel, temp mail, 24h, sem cadastro, codigo otp, trashmail.space",
		heroTag: "Caixa de 24 horas",
		heroTitle: "Crie uma caixa descartável antes de usar seu email principal.",
		heroDescription:
			"Use trashmail para contas de teste, códigos de verificação e fluxos curtos de email. As mensagens ficam disponíveis por até 24 horas e depois são removidas automaticamente.",
		loadingAddresses: "Carregando endereços...",
		currentAddress: "Endereço temporário atual",
		copy: "Copiar",
		copied: "Copiado",
		deleteAddress: "Excluir endereço",
		deleting: "Excluindo...",
		generateNew: "Gerar novo",
		generating: "Gerando...",
		noAddressTitle: "Ainda não há caixa criada",
		noAddressDescription:
			"Gere um endereço quando precisar de uma caixa de curta duração para cadastro, verificação ou download pontual.",
		generateAddress: "Gerar endereço",
		stats: {
			lifetimeValue: "24h",
			refreshValue: "Instantâneo",
			registrationValue: "Zero",
			lifetime: "Retenção de emails",
			refresh: "Atualização da caixa",
			registration: "Cadastro",
		},
		inboxTag: "Caixa de entrada",
		inboxTitle: "E-mails recentes",
		tapToOpen: "Toque para abrir",
		loadingEmails: "Carregando e-mails...",
		emptyInboxTitle: "Sua caixa está pronta",
		emptyInboxDescription: "Ainda não há mensagens. Novos emails aparecerão aqui após a entrega.",
		refreshInbox: "Atualizar",
		refreshingInbox: "Atualizando...",
		lastRefresh: "Última atualização",
		safetyHint:
			"Não use esta caixa para banco, trabalho, recuperação de conta ou outros acessos críticos. As mensagens são removidas quando a janela de retenção termina.",
		modal: {
			title: "Pré-visualização",
			from: "De",
			time: "Hora",
			loading: "Carregando...",
			empty: "Sem conteúdo",
		},
	},
	layout: {
		siteSubtitle: "caixa descartável",
		nav: { home: "Início", about: "Sobre", faq: "FAQ" },
		footerTag: "utilitário de caixa curta",
		footerDescription:
			"Use trashmail quando um site pedir um endereço, mas a mensagem não merecer entrar na sua caixa de longo prazo.",
		footerLinks: {
			faq: "FAQ",
			privacy: "Privacidade",
			terms: "Termos",
			about: "Sobre trashmail.space",
		},
		copyright: "Use uma caixa descartável quando a tarefa for temporária.",
		themeToLight: "☀ Claro",
		themeToDark: "🌙 Escuro",
	},
};

const ar: Dictionary = {
	home: {
		title: "بريد مؤقت مجاني 24 ساعة بدون تسجيل لاستلام OTP | trashmail.space",
		description:
			"أنشئ صندوق بريد مؤقتًا لمدة 24 ساعة على trashmail.space للتجارب السريعة، ورسائل التحقق، وفحوصات البريد القصيرة من دون استخدام بريدك الأساسي.",
		keywords:
			"بريد مؤقت, بريد مؤقت مجاني, بريد للاستخدام مرة واحدة, temp mail, بريد 24 ساعة, بدون تسجيل, رمز otp, trashmail.space",
		heroTag: "صندوق 24 ساعة",
		heroTitle: "أنشئ صندوقًا مؤقتًا قبل أن تستخدم بريدك الأساسي.",
		heroDescription:
			"استخدم trashmail للحسابات التجريبية، ورموز التحقق، ورسائل البريد قصيرة العمر. تبقى الرسائل متاحة حتى 24 ساعة ثم تُحذف تلقائيًا.",
		loadingAddresses: "جارٍ تحميل العناوين...",
		currentAddress: "العنوان المؤقت الحالي",
		copy: "نسخ",
		copied: "تم النسخ",
		deleteAddress: "حذف العنوان",
		deleting: "جارٍ الحذف...",
		generateNew: "إنشاء جديد",
		generating: "جارٍ الإنشاء...",
		noAddressTitle: "لم يتم إنشاء صندوق بعد",
		noAddressDescription: "أنشئ عنوانًا عندما تحتاج إلى صندوق قصير العمر للتسجيل أو التحقق أو تنزيل لمرة واحدة.",
		generateAddress: "إنشاء عنوان",
		stats: {
			lifetimeValue: "24س",
			refreshValue: "فوري",
			registrationValue: "صفر",
			lifetime: "الاحتفاظ بالرسائل",
			refresh: "التحديث",
			registration: "التسجيل",
		},
		inboxTag: "الوارد",
		inboxTitle: "أحدث الرسائل",
		tapToOpen: "اضغط للفتح",
		loadingEmails: "جارٍ تحميل الرسائل...",
		emptyInboxTitle: "صندوقك جاهز",
		emptyInboxDescription: "لا توجد رسائل بعد. ستظهر الرسائل الجديدة هنا بعد وصولها.",
		refreshInbox: "تحديث",
		refreshingInbox: "جارٍ التحديث...",
		lastRefresh: "آخر تحديث",
		safetyHint:
			"لا تستخدم هذا الصندوق للبنوك أو العمل أو استعادة الحسابات أو أي وصول حساس. تُزال الرسائل بعد انتهاء مدة الاحتفاظ.",
		modal: {
			title: "معاينة الرسالة",
			from: "من",
			time: "الوقت",
			loading: "جارٍ التحميل...",
			empty: "لا يوجد محتوى",
		},
	},
	layout: {
		siteSubtitle: "صندوق للاستخدام المؤقت",
		nav: { home: "الرئيسية", about: "حول", faq: "الأسئلة الشائعة" },
		footerTag: "أداة لصندوق قصير العمر",
		footerDescription:
			"استخدم trashmail عندما يطلب موقع ما عنوانًا، لكن الرسالة لا تستحق أن تدخل بريدك الطويل الأمد.",
		footerLinks: {
			faq: "الأسئلة الشائعة",
			privacy: "الخصوصية",
			terms: "الشروط",
			about: "حول trashmail.space",
		},
		copyright: "استخدم صندوقًا مؤقتًا عندما تكون المهمة مؤقتة.",
		themeToLight: "☀ فاتح",
		themeToDark: "🌙 داكن",
	},
};

const messages: Record<Locale, Dictionary> = {
	en,
	zh,
	es,
	fr,
	de,
	ja,
	ko,
	ru,
	pt,
	ar,
};

export function getDictionary(locale: Locale): Dictionary {
	return messages[locale];
}
