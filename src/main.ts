import { BANGS } from "./bangs";

const DEFAULT_BANG = "g"; // Google
const SEARCH_PLACEHOLDER = "{{{s}}}";
const BANG_PATTERN = /!(\S+)/i;
const BANG_REMOVE_PATTERN = /\s*!\S+\s*/i;

function renderPage() {
	const app = document.querySelector<HTMLDivElement>("#app");
	if (app) {
		app.innerHTML = "<h1>Hello World!</h1>";
	}
}

function createRedirectUrl(bang: string, query: string): string | null {
	const url = BANGS.get(bang.toLowerCase());
	return url
		? url.replace(SEARCH_PLACEHOLDER, encodeURIComponent(query))
		: null;
}

function main() {
	const params = new URLSearchParams(window.location.search);
	const query = params.get("q")?.trim() ?? "";
	if (!query) {
		return renderPage();
	}

	const defaultBang =
		params.get("default")?.trim().toLowerCase() ?? DEFAULT_BANG;

	const match = query.match(BANG_PATTERN);
	if (match) {
		const bang = match[1].toLowerCase();
		const cleanQuery = query.replace(BANG_REMOVE_PATTERN, " ").trim();

		const url = createRedirectUrl(bang, cleanQuery);
		if (url) {
			return window.location.replace(url);
		}
	}

	const defaultUrl = createRedirectUrl(defaultBang, query);
	if (defaultUrl) {
		return window.location.replace(defaultUrl);
	}

	renderPage();
}

main();
