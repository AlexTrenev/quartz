import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { TelescopicText } from "./quartz/plugins/transformers/telescopic"

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
        body: "Manrope", //Manrope
        code: "DM Mono",
      },
      colors: {
        lightMode: {
          light: "rgb(255, 252, 240)",
          lightgray: "rgb(230, 228, 217)",
          gray: "rgb(16, 15, 15)",
          darkgray: "rgb(16, 15, 15)",
          dark: "#1c1917",
          secondary: "rgb(94, 64, 157)",
          tertiary: "#500750",
          highlight: "rgba(25, 20, 173, 0.82)",
          textHighlight: "#e7e5e488",
        },
        darkMode: {
          light: "rgb(16, 15, 15)",
          lightgray: "rgb(28, 27, 26)",
          gray: "#6c6865",
          darkgray: "rgb(206, 205, 195)",
          dark: "#f5f3f0",
          secondary: "rgb(87, 86, 83)",
          tertiary: "#F5FFFA",
          highlight: "rgba(201, 212, 202, 0.08)",
          textHighlight: "#44403c88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      TelescopicText(),
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