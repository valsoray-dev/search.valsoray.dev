import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "script-defer",
			includeAssets: ["favicon.ico", "opensearch.xml"],

			manifest: {
				name: "search.valsoray.dev",
				short_name: "search.valsoray.dev",
				description: "undefined",
			},
		}),
	],
});
