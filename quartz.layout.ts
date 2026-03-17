import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/AlexTrenev",
    },
  }),
}

const explorerConfig = Component.Explorer({
  folderClickBehavior: "link",
  folderDefaultState: "open",
  useSavedState: true,
  filterFn: (node) => {
    const hidden = ["_templates", "Example Title", "tags"]
    return !hidden.includes(node.displayName)
  },
  order: ["filter", "map", "sort"],
})

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    explorerConfig,
    Component.Breadcrumbs(),
    Component.Spacer(),
    Component.Darkmode(),
  ],
  right: [],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    explorerConfig,
    Component.Breadcrumbs(),
    Component.Spacer(),
    Component.Darkmode(),
  ],
  right: [],
}