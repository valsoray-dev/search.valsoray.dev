import "./style.css";
import { BANGS } from "./bangs";

const DEFAULT_BANG = "g"; // Google
const SEARCH_PLACEHOLDER = "{{{s}}}";
const BANG_PATTERN = /!(\S+)/i;
const BANG_REMOVE_PATTERN = /\s*!\S+\s*/i;

function renderPage() {
	const app = document.querySelector<HTMLDivElement>("#app");
	if (app) {
		app.innerHTML = `
      <h1>Search for <i>anything</i></h1>
      <form action="/" method="GET">
        <input type="text" name="q" />
        <button type="submit">Search</button>
      </form>
      `;
	}
}

interface UrlParams {
	query: string;
	defaultBang: string;
}

function parseUrlParams(): UrlParams {
	const params = new URLSearchParams(window.location.search);

	return {
		query: params.get("q") ?? "",
		defaultBang: params.get("default")?.trim().toLowerCase() ?? DEFAULT_BANG,
	};
}

function createRedirectUrl(bang: string, query: string): string | null {
	const url = BANGS.get(bang.toLowerCase());
	if (!url) return null;

	const encodedQuery = encodeURIComponent(query.trim());
	return url.replace(SEARCH_PLACEHOLDER, encodedQuery);
}

function main() {
	const { query, defaultBang } = parseUrlParams();

	// if no query specified, render default page
	if (!query) {
		return renderPage();
	}

	const match = query.match(BANG_PATTERN);
	if (match) {
		const bang = match[1].toLowerCase();
		const cleanQuery = query.replace(BANG_REMOVE_PATTERN, " ").trim();

		const url = createRedirectUrl(bang, cleanQuery);
		if (url) {
			return window.location.replace(url);
		}
	}

	// can be null if DEFAULT_BANG is not found in BANGS
	const defaultUrl = createRedirectUrl(defaultBang, query.trim());
	if (defaultUrl) {
		return window.location.replace(defaultUrl);
	}

	renderPage();
}

main();
