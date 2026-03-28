(function () {
  const container = document.createElement("div")
  container.style.cssText = `
    position: fixed;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 100;
    pointer-events: none;
  `
  document.body.appendChild(container)

  const LINES = 10
  const lines = []

  for (let i = 0; i < LINES; i++) {
    const line = document.createElement("div")
    line.style.cssText = `
      width: 24px;
      height: 2px;
      background: var(--darkgray);
      opacity: 0;
      transform: translateX(20px);
    `
    container.appendChild(line)
    lines.push(line)
  }

  let revealed = false
  let animating = false

  function reveal() {
    if (revealed || animating) return
    animating = true
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.style.transition = "opacity 0.3s ease, transform 0.3s ease"
        line.style.opacity = "0.2"
        line.style.transform = "translateX(0)"
        if (i === LINES - 1) {
          animating = false
          revealed = true
        }
      }, i * 60)
    })
  }

  function update() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? scrollTop / docHeight : 0
    const filled = Math.round(progress * LINES)

    if (scrollTop > 10) reveal()

    if (!revealed) return

    lines.forEach((line, i) => {
      // endast ändra färg, ingen transition på transform efter reveal
      line.style.transition = "opacity 0.2s ease, background 0.2s ease"
      line.style.transform = "translateX(0)"
      if (i < filled) {
        line.style.background = "var(--secondary)"
        line.style.opacity = "0.9"
      } else {
        line.style.background = "var(--darkgray)"
        line.style.opacity = "0.2"
      }
    })
  }

  function reset() {
    revealed = false
    animating = false
    lines.forEach(line => {
      line.style.transition = "none"
      line.style.opacity = "0"
      line.style.transform = "translateX(20px)"
      line.style.background = "var(--darkgray)"
    })
    setTimeout(update, 150)
  }

  window.addEventListener("scroll", update)
  document.addEventListener("nav", reset)
  update()
})()