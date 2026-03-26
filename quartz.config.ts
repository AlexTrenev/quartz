import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Trenev.xyz",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "trenev.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter", //Manrope
        code: "DM Mono",
      },
      colors: {
        lightMode: {
        light: 'rgb(255, 252, 240)',
        lightgray: 'rgb(230, 228, 217)',
        gray: 'rgb(183, 181, 172)',
        darkgray: 'rgb(111, 110, 105)',
        dark: 'rgb(16, 15, 15)',
        secondary: 'rgb(205, 213, 151)',
        tertiary: 'rgb(252, 193, 146)',
        highlight: 'rgb(218, 216, 206)',
        textHighlight: "#44403c88",
        },
        darkMode: {
          light: "#141412",
          lightgray: "#262422",
          gray: "#605a56",
          darkgray: "#c4bfbb",
          dark: "#f5f3f0",
          secondary: "#d4cfc9",
          tertiary: "#8a8480",
          highlight: "rgba(201, 212, 202, 0.08)",
          textHighlight: "#44403c88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config