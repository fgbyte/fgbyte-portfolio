import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://www.fgbyte.com",
	integrations: [
		mdx(),
		sitemap(),
		solidJs(),
		tailwind({ applyBaseStyles: false }),
	],
	server: {
		port: 3000,
	},
});
