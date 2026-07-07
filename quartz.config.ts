import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Sameer's Data Garden 🌱",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "sameerrk27.github.io/sameerrrk",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Merriweather",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#f0f0f0",
          lightgray: "#e0e0e0",
          gray: "#666666",
          darkgray: "#333333",
          dark: "#333333",
          secondary: "#606060",
          tertiary: "#c0c0c0",
          highlight: "rgba(96, 96, 96, 0.15)",
          textHighlight: "#c0c0c0",
        },
        darkMode: {
          light: "#1a1a1a",
          lightgray: "#303030",
          gray: "#808080",
          darkgray: "#d9d9d9",
          dark: "#d9d9d9",
          secondary: "#a0a0a0",
          tertiary: "#404040",
          highlight: "rgba(160, 160, 160, 0.15)",
          textHighlight: "#404040",
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
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
