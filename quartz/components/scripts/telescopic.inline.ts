document.addEventListener("nav", () => {
  const telescopics = document.querySelectorAll(".telescopic-container")
  if (telescopics.length === 0) return

  telescopics.forEach((tel) => {
    const el = tel.querySelector("#telescope")
    if (!el) return

    const expandable = el.querySelectorAll("span.details")

    function expandNext() {
      const firstHidden = Array.from(expandable).find((span) => {
        if (!span.classList.contains("close")) return false
        const parentDetails = span.parentElement?.closest(".details")
        return !parentDetails || parentDetails.classList.contains("open")
      })
      if (firstHidden) {
        firstHidden.classList.remove("close")
        firstHidden.classList.add("open")
      }
    }

    expandable.forEach((span) => {
      function onClick(e: Event) {
        e.stopPropagation()
        expandNext()
      }
      span.addEventListener("click", onClick)
      window.addCleanup(() => span.removeEventListener("click", onClick))
    })

    tel.querySelectorAll(".replay").forEach((rpl) => {
      function onClick() {
        expandable.forEach((open) => {
          open.classList.toggle("close", true)
          open.classList.toggle("open", false)
        })
      }
      rpl.addEventListener("click", onClick)
      window.addCleanup(() => rpl.removeEventListener("click", onClick))
    })

    tel.querySelectorAll(".expand").forEach((exp) => {
      function onClick() {
        expandNext()
      }
      exp.addEventListener("click", onClick)
      window.addCleanup(() => exp.removeEventListener("click", onClick))
    })
  })
})