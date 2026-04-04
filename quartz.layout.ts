import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import SplitPanel from "./quartz/components/SplitPanel"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.Breadcrumbs(),
    Component.Darkmode(),
  ],
  afterBody: [SplitPanel(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/AlexTrenev",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta({
      showReadingTime: true,
      showComma: false,
      }
    ),
    Component.TagList(),
  ],
  left: [],
  right: [],
}





export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [],
  right: [],
}