import { QuartzComponent, QuartzComponentConstructor } from "./types"

const SplitPanel: QuartzComponent = ({ fileData }) => {
  if (fileData.slug !== "index") return null

  return (
    <div id="split-pane-container">
      <div id="split-pane-right">
        <button id="split-pane-close">✕</button>
        <div id="split-pane-content"></div>
      </div>
    </div>
  )
}

SplitPanel.css = `
#split-pane-right {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 45%;
  min-width: 320px;
  height: 100vh;
  overflow-y: auto;
  padding: 3rem 3rem 6rem 3rem;
  background: var(--light);
  z-index: 100;
  box-sizing: border-box;
}

@media (min-width: 1400px) {
  #split-pane-right {
    padding-top: 6vh;
    padding-right: 6rem;
  }
}

@media (max-width: 768px) {
  #split-pane-right {
    display: none !important;
  }
}

@media (min-width: 769px) and (max-width: 1399px) {
  body.split-pane-open .center {
    width: calc(58% - 2rem) !important;
    max-width: calc(58% - 2rem) !important;
    min-width: 0 !important;
    margin-left: 1rem !important;
    margin-right: 0 !important;
    transition: all 0.2s ease;
  }

  #split-pane-right {
    width: 40%;
  }
}

#split-pane-close {
  position: fixed;
  top: 0.6rem;
  right: 0.8rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--darkgray);
  font-size: 0.85rem;
  opacity: 0.3;
  transition: opacity 0.2s ease;
  z-index: 101;
  padding: 0;
}

#split-pane-close:hover {
  opacity: 0.8;
}

#split-pane-content {
  font-size: 1rem;
  line-height: 1.44;
}


#split-pane-content a.internal {
  color: var(--gray);
  text-decoration: underline;
  text-decoration-color: var(--gray);
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

#split-pane-content a.internal:hover {
  color: var(--tertiary);
  text-decoration-color: var(--tertiary);
}

@media (max-width: 1400px) {
  body.split-pane-open .center {
    width: 52vw !important;
    max-width: 52vw !important;
    min-width: 0 !important;
    margin-left: 1rem !important;
    margin-right: 0 !important;
    transition: all 0.2s ease;
  }
}

@media (max-width: 768px) {
  #split-pane-right {
    display: none !important;
  }
}
`


SplitPanel.afterDOMLoaded = `
(function() {
  const FULL_PAGE = ['Setup']

  function initSplitPanel() {
    const panel = document.getElementById("split-pane-right")
    const content = document.getElementById("split-pane-content")
    const closeBtn = document.getElementById("split-pane-close")

    if (!panel || !content || !closeBtn) return

    closeBtn.onclick = () => {
      panel.style.display = "none"
      document.body.classList.remove("split-pane-open")
    }

    window.addEventListener("resize", function() {
      if (!panel) return
      if (window.innerWidth <= 768) {
        panel.style.display = "none"
        document.body.classList.remove("split-pane-open")
      } else if (panel.style.display === "block") {
        document.body.classList.add("split-pane-open")
      }
    })

    document.querySelectorAll(".center a[href^='/'], .center a[href^='./']").forEach(function(link) {
      link.addEventListener("click", async function(e) {
        if (window.innerWidth <= 768) return

        const href = link.getAttribute("href")
        if (!href) return

        const normalized = href.replace(/^\\.?\\//, '')
        if (FULL_PAGE.some(function(p) { return normalized.toLowerCase() === p.toLowerCase() })) return

        e.preventDefault()
        e.stopImmediatePropagation()

        try {
          const res = await fetch(href)
          const html = await res.text()
          const doc = new DOMParser().parseFromString(html, "text/html")
          const article = doc.querySelector("article")

            if (article) {
            const title = doc.querySelector("h1.article-title")
            const titleHtml = title 
                ? '<p style="font-weight:800; margin-bottom: 1rem;">' + title.innerText + '</p>'
                : ''
            content.innerHTML = titleHtml + article.outerHTML
            panel.style.display = "block"
            document.body.classList.add("split-pane-open")
            panel.scrollTop = 0
            }
        } catch (err) {
          console.error("Split pane fetch failed:", err)
        }
      }, { capture: true })
    })
  }

  initSplitPanel()
  document.addEventListener("nav", initSplitPanel)
})()
`

export default (() => SplitPanel) satisfies QuartzComponentConstructor