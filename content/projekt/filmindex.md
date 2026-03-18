---
title: film index
draft: false
tags:
  - "#projekt"
status: ej färdig!
---
`React`  `REST-api`

status: `ej färdig!`

en filmsajt som visar filmer i ett galleriformat med bilder och metadata hämtad från externa api:er.

byggd för att lära mig api-hantering och hur man strukturerar api-logik på ett rent sätt inom ett projekt.


### startsida:
![[Pasted image 20260312161029.png]]

---
## hur den fungerar

sidan använder två olika api:er; [*TMDB*](https://www.themoviedb.org/) som primär källa för filmdata och bilder, och [*OMDB*](https://www.omdbapi.com/) för berikande med IMDB-betyg. 

alla api-anrop hanteras genom en dedikerad fil i projektet, vilket håller frontend-komponenterna rena och api-logiken samlad på ett ställe.

inkluderar även en "hitta film"-funktion. utifrån användarens val hämtas tre skräddarsydda filmtips.

---

## vad jag lärde mig

- hålla api-logik separerad från frontend-komponenter
- hantera och kombinera svar från två olika datakällor
- använda [[Postman]] för att testa api:er innan integration

---
