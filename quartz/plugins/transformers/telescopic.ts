import { QuartzTransformerPlugin } from "../types"
import { Root, Element, Content as HastContent } from "hast"
import { visit } from "unist-util-visit"
import { toString } from "hast-util-to-string"
import { h, s } from "hastscript"
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic"

interface NewContent {
  text: string
  expansions?: NewContent[]
}

const svgOptions = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3",
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

const clickLogic = `
  window.telescopicNext = (btn) => {
    const container = btn.closest('.telescopic-container');
    const telescope = container.querySelector('#telescope');
    const firstHidden = Array.from(telescope.querySelectorAll('.details.close')).find(el => {
      const parentDetails = el.parentElement?.closest('.details');
      return !parentDetails || parentDetails.classList.contains('open');
    });
    if (firstHidden) {
      firstHidden.classList.remove('close');
      firstHidden.classList.add('open');
    }
  };
  window.telescopicReset = (btn) => {
    const container = btn.closest('.telescopic-container');
    container.querySelectorAll('.details.open').forEach(el => {
      el.classList.remove('open');
      el.classList.add('close');
    });
  };
  window.telescopicToggle = (el) => {
    el.classList.toggle('close');
    el.classList.toggle('open');
  };
`

function parseMarkdown(mdContent: string): NewContent[] {
  const lines = mdContent.split("\n")
  const root: NewContent[] = []
  const nodeStack: { depth: number; telescopicOut: NewContent[] }[] = [{ depth: 0, telescopicOut: root }]
  const firstNonEmptyLine = lines.find((l) => l.trim().length > 0)
  const firstMatch = firstNonEmptyLine?.match(/^(\s*)([*+\-])/)
  const defaultDepth = firstMatch ? firstMatch[0].length - 1 : 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed.length || !["*", "-", "+"].some(sep => trimmed.startsWith(sep))) continue
    const currentMatch = line.match(/^(\s*)([*+\-])/)
    const currentDepth = currentMatch ? currentMatch[0].length - 1 : 0
    while (nodeStack.length > 1 && currentDepth <= nodeStack[nodeStack.length - 1].depth) nodeStack.pop()
    const stripped = trimmed.substring(1).trim()
    const current: NewContent = { text: stripped, expansions: [] }
    if (currentDepth === defaultDepth) {
      nodeStack[nodeStack.length - 1].telescopicOut.push(current)
    } else {
      const parent = nodeStack[nodeStack.length - 1].telescopicOut
      parent[parent.length - 1].expansions!.push(current)
      nodeStack.push({ depth: currentDepth, telescopicOut: [current] })
    }
  }
  return root
}

function contentToHast(content: NewContent[]): HastContent[] {
  const hastFromHtml = (v: string): Element => fromHtmlIsomorphic(v, { fragment: true }) as unknown as Element

  function process(items: NewContent[]): HastContent[] {
    return items.flatMap((item, idx) => {
      const nodes: HastContent[] = []
      if (idx > 0) nodes.push(hastFromHtml(" "))
      if (!item.expansions?.length) {
        nodes.push(hastFromHtml(mdLinks(item.text)))
      } else {
        nodes.push(h("span.details.close", {
          onclick: "window.telescopicToggle(this); event.stopPropagation();",
          style: "cursor: pointer;"
        }, [
          h("span.summary", [hastFromHtml(mdLinks(item.text))]),
          hastFromHtml(" "),
          h("span.expanded", process(item.expansions))
        ]))
      }
      return nodes
    })
  }
  return process(content)
}

function mdLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

export const TelescopicText: QuartzTransformerPlugin<any> = () => {
  return {
    name: "TelescopicText",
    htmlPlugins() {
      return [() => (tree: Root) => {
        visit(tree, "element", (node: Element, index, parent) => {
          if (node.tagName !== "pre") return
          const code = node.children?.find((c) => c.type === "element" && (c as Element).tagName === "code") as Element | undefined
          if (!code?.properties?.className || !(code.properties.className as string[]).includes("language-telescopic")) return

          const content = parseMarkdown(toString(code))
          if (parent && typeof index === "number") {
            parent.children.splice(index, 1, h("div.telescopic-container", [
              // Replay – stannar uppe till vänster
              h("span.replay", {
                onclick: "window.telescopicReset(this)",
                style: "cursor: pointer; display: inline-flex; align-self: flex-start; margin-top: 2px; margin-right: 2px;"
              }, [
                s("svg", { ...svgOptions, height: 11, width: 11, style: "opacity: 0.8;" }, [
                  s("path", { d: "M23 4v6h-6" }), s("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" })
                ])
              ]),
              // Text + plus inline
              h("span#telescope", { style: "display: inline; vertical-align: middle;" }, [
                ...contentToHast(content),
                // Plus – inline direkt efter texten
                h("span.expand", {
                  onclick: "window.telescopicNext(this)",
                  style: "cursor: pointer; display: inline-flex; vertical-align: middle; margin-left: 2px;"
                }, [
                  s("svg", { ...svgOptions, height: 15, width: 15, style: "opacity: 0.8;" }, [
                    s("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), s("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
                  ])
                ])
              ]),
            ]))
          }
        })
      }]
    },
    externalResources: () => ({
      js: [{ script: clickLogic, contentType: "inline", loadTime: "afterDOMReady" }],
    }),
  }
}
