import type { Links, Page, Site, Socials } from "@types";

// Global
export const SITE: Site = {
	TITLE: "fgbyte",
	DESCRIPTION:
		"An Innovative Software Developer. Let's Connect and Build Something Amazing Together.",
	AUTHOR: "fgbyte",
};

// Work Page
export const WORK: Page = {
	TITLE: "Work",
	DESCRIPTION: "Places I have worked.",
};

// Blog Page
export const BLOG: Page = {
	TITLE: "Blog",
	DESCRIPTION: "Writing on topics I am passionate about.",
};

// Projects Page
export const PROJECTS: Page = {
	TITLE: "Projects",
	DESCRIPTION: "Recent projects I have worked on.",
};

// Search Page
export const SEARCH: Page = {
	TITLE: "Search",
	DESCRIPTION: "Search all posts and projects by keyword.",
};

// Links
export const LINKS: Links = [
	{
		TEXT: "Home",
		HREF: "/",
	},
	{
		TEXT: "Projects",
		HREF: "/projects",
	},
	{
		TEXT: "Work",
		HREF: "/work",
	},
	{
		TEXT: "Blog",
		HREF: "/blog",
	},
];

// Socials
export const SOCIALS: Socials = [
	{
		NAME: "Email",
		ICON: "email",
		TEXT: "fer.garciabayon@gmail.com",
		HREF: "mailto:fer.garciabayon@gmail.com",
	},
	{
		NAME: "Github",
		ICON: "github",
		TEXT: "@fgbyte",
		HREF: "https://github.com/fgbyte",
	},
	{
		NAME: "LinkedIn",
		ICON: "linkedin",
		TEXT: "@fgbyte",
		HREF: "https://www.linkedin.com/in/fgbyte/",
	},
	{
		NAME: "Twitter-X",
		ICON: "twitter-x",
		TEXT: "@fgbyte",
		HREF: "https://x.com/fgbyte",
	},
];
