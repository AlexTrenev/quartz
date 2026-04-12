---
title: Film Index
draft: false
tags:
status: ej färdig!
---
En filmsajt som visar filmer i ett galleriformat med bilder och metadata hämtad från externa APIer. Byggd för att lära mig API-hantering och hur man strukturerar API-logik på ett rent sätt inom ett projekt.

Tech: React, TypeScript, Tailwind CSS, Vite, REST-API

![[Pasted image 20260312161029.png]]
*Startsida*
## Hur den fungerar

Sidan använder två olika APIer: [TMDB](https://www.themoviedb.org/) som primär källa för filmdata och bilder, och [OMDB](https://www.omdbapi.com/) för berikande med IMDB-betyg. 

Alla API-anrop hanteras genom en dedikerad fil i projektet, vilket håller frontend-komponenterna rena och API-logiken samlad på ett ställe.

## Hitta film-funktion

Inkluderar även en "Hitta film"-funktion där användaren får tre skräddarsydda filmtips baserat på val som era, känsla och längd. 

“Hitta film” är en interaktiv rekommendationsdel där användarens val omvandlas till konkreta API-filter för att generera relevanta resultat.
## Genre mapping / data transformation

[TMDB](https://www.themoviedb.org/) använder numeriska genre-ID:n och varje film kan ha flera genrer samtidigt, vilket gjorde den första implementationen av filtreringen inkonsekvent.

För att lösa detta skapade jag en `GENRE_MAP` som översätter mina egna kategorier till en kontrollerad kombination av inkluderade och exkluderade genrer. Detta gav mer stabil och förutsägbar filtrering baserat på användarens input.

![[findmovie.gif]]
## Vad jag lärde mig
- Hålla API-logik separerad från frontend-komponenter
- Hantera och kombinera svar från två olika datakällor
- Mappa/transformera data
- Använda [[Postman]] för att testa api:er innan integration



![[Skärmavbild 2026-04-02 kl. 23.39.14.png]]
*Galleri-vy*

![[Skärmavbild 2026-04-02 kl. 23.38.55.png]]
*Info-vy*

## Övrigt

*Detta projektet är ej färdigt!*