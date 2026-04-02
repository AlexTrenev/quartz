---
title: Film Index
draft: false
tags:
status: ej färdig!
---
<div style="
  display: flex; 
  align-items: center; 
  gap: 12px; 
  margin: 0.5rem 0 1.5rem 0;
  font-family: var(--codeFont);
  font-size: 0.85rem;
">
  <span style="
    color: var(--secondary);
    border-right: 1px solid var(--gray);
    padding-right: 12px;
    font-weight: 600;
  ">
    Pågående
  </span>

  <div style="display: flex; gap: 8px; color: var(--gray);">
    <span style="color: var(--tertiary);">React</span>
    <span style="opacity: 0.4;">/</span>
    <span style="color: var(--tertiary);">Vite</span>
    <span style="opacity: 0.4;">/</span>
    <span style="color: var(--tertiary);">REST-API</span>
    <span style="opacity: 0.4;">/</span>
    <span style="color: var(--tertiary);">Postman</span>
  </div>
</div>

En filmsajt som visar filmer i ett galleriformat med bilder och metadata hämtad från externa api:er.

Byggd för att lära mig api-hantering och hur man strukturerar api-logik på ett rent sätt inom ett projekt.

---

![[Pasted image 20260312161029.png]]

---
## Hur den fungerar

Sidan använder två olika api:er: [*TMDB*](https://www.themoviedb.org/) som primär källa för filmdata och bilder, och [*OMDB*](https://www.omdbapi.com/) för berikande med IMDB-betyg. 

Alla api-anrop hanteras genom en dedikerad fil i projektet, vilket håller frontend-komponenterna rena och api-logiken samlad på ett ställe.

Inkluderar även en "Hitta film"-funktion. utifrån användarens val hämtas tre skräddarsydda filmtips.

---


![[Skärmavbild 2026-04-02 kl. 23.38.55.png]]
![[Skärmavbild 2026-04-02 kl. 23.39.14.png]]

---
## Vad jag lärde mig

- Hålla api-logik separerad från frontend-komponenter
- Hantera och kombinera svar från två olika datakällor
- Använda [[Postman]] för att testa api:er innan integration