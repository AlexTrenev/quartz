import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const PageNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug === "index") return null

  return (
    <nav class="page-nav">
      <a href="/" class="page-nav-home">
        ← Home
      </a>
    </nav>
  )
}

PageNav.css = `
.page-nav {
  margin-bottom: 1.5rem;
}

.page-nav-home {
  font-size: 0.875em;
  color: var(--gray);
  text-decoration: none;
  transition: color 0.15s ease;
  opacity: 0.6;
}

.page-nav-home:hover {
  color: var(--dark);
  opacity: 1;
}

@media (min-width: 1400px) {
  .page-nav {
    position: fixed;
    top: 3rem;
    left: calc(50vw - 480px - 6rem);
    margin: 0;
  }
}
`

export default (() => PageNav) satisfies QuartzComponentConstructor
