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
          light: "#FEFEFA",
          lightgray: "#e8e6e3",
          gray: "#985D98",
          darkgray: "#4a4744",
          dark: "#1c1917",
          secondary: "#44403c",
          tertiary: "#500750",
          highlight: "rgba(25, 20, 173, 0.82)",
          textHighlight: "#e7e5e488",
        },
        darkMode: {
          light: "#141412",
          lightgray: "#262422",
          gray: "#605a56",
          darkgray: "#c4bfbb",
          dark: "#f5f3f0",
          secondary: "#d4cfc9",
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