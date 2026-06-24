import { getAllBlogSlugs, getBlogPageCount } from "~/blog/data";
import {
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
	stripLocalePrefix,
	toIntlLocale,
	toLocalePath,
	type Locale,
} from "~/i18n/config";
import {
	BASE_URL,
	BLOG_BASE_PATH,
	BLOG_INDEXABLE_LOCALES,
	MARKDOWN_BASE_PATHS,
	MARKDOWN_INDEXABLE_LOCALES,
} from "~/seo.config";

const STATIC_PATHS = ["/", "/contact"] as const;

type SitemapEntry = {
	path: string;
	locales: readonly Locale[];
};

export async function loader() {
	const lastmod = new Date().toISOString();
	const seen = new Set<string>();
	const entries: SitemapEntry[] = [];

	function addEntry(path: string, locales: readonly Locale[]) {
		if (seen.has(path)) {
			return;
		}
		seen.add(path);
		entries.push({ path, locales });
	}

	for (const locale of SUPPORTED_LOCALES) {
		for (const staticPath of STATIC_PATHS) {
			const localizedPath = toLocalePath(staticPath, locale);
			addEntry(localizedPath, SUPPORTED_LOCALES);
		}
	}

	for (const locale of MARKDOWN_INDEXABLE_LOCALES) {
		for (const basePath of MARKDOWN_BASE_PATHS) {
			const localizedPath = toLocalePath(basePath, locale);
			addEntry(localizedPath, MARKDOWN_INDEXABLE_LOCALES);
		}
	}

	const blogSlugs = getAllBlogSlugs();
	for (const locale of BLOG_INDEXABLE_LOCALES) {
		const blogListPath = toLocalePath(BLOG_BASE_PATH, locale);
		addEntry(blogListPath, BLOG_INDEXABLE_LOCALES);

		const totalPages = getBlogPageCount(locale);
		for (let page = 2; page <= totalPages; page++) {
			const pagedPath = toLocalePath(`${BLOG_BASE_PATH}/page/${page}`, locale);
			addEntry(pagedPath, BLOG_INDEXABLE_LOCALES);
		}

		for (const slug of blogSlugs) {
			const blogPostPath = toLocalePath(`${BLOG_BASE_PATH}/${slug}`, locale);
			addEntry(blogPostPath, BLOG_INDEXABLE_LOCALES);
		}
	}

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">` +
		entries
			.map(({ path, locales }) => {
				const basePath = stripLocalePrefix(path);
				const alternates = locales
					.map((locale) => {
						return `\n    <xhtml:link rel="alternate" hreflang="${toIntlLocale(locale)}" href="${BASE_URL}${toLocalePath(basePath, locale)}" />`;
					})
					.join("");
				const xDefault = `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${toLocalePath(basePath, DEFAULT_LOCALE)}" />`;
				return `\n  <url>\n    <loc>${BASE_URL}${path}</loc>${alternates}${xDefault}\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
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
