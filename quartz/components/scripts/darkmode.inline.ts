const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

const applyTheme = (newTheme: "light" | "dark", x?: number, y?: number) => {
  const root = document.documentElement

  const doSwitch = () => {
    root.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  // @ts-ignore
  if (!document.startViewTransition || x === undefined || y === undefined) {
    doSwitch()
    return
  }

  root.style.setProperty("--vt-x", `${x}px`)
  root.style.setProperty("--vt-y", `${y}px`)

  // @ts-ignore
  document.startViewTransition(doSwitch)
}

document.addEventListener("nav", () => {
  const switchTheme = (e: MouseEvent) => {
    const newTheme =
      document.documentElement.getAttribute("saved-theme") === "dark" ? "light" : "dark"
    applyTheme(newTheme, e.clientX, e.clientY)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    applyTheme(newTheme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme as EventListener)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme as EventListener))
  }

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
