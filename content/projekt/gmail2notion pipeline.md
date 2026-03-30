---
title: gmail2notion
draft: false
tags:
---
`node.js` `oauth 2.0` `rest api` `notion api` `gmail api`
Gmail to Notion-pipeline

en Node.js-server som automatiskt spårar jobbansökningar genom att
övervaka en gmail-inkorg och logga relevanta mejl till en notion-databas.

byggd för att lära mig oauth 2.0 och vad det faktiskt innebär att
koppla ihop två tredjeparts-api:er från början till slut.



---

## hur det fungerar

1. autentiserar med gmail via oauth 2.0 — fullt authorization code flow med access- och refresh-tokens
2. hämtar mejl via gmail api med paginering, filtrerat på jobbrelerade nyckelord
3. klassificerar varje mejl som ansökt, intervju, avslag eller okänt via en nyckelordsklassificerare
4. kontrollerar notion efter befintliga poster via gmail-meddelande-id för att undvika dubletter
5. loggar nya poster till notion med företag, ämne, datum och status

---

## vad jag lärde mig

- oauth 2.0-implementation från grunden
- konsumera och kombinera två rest api:er
- paginering för stora datamängder
- datatransformation och mappning

---

## nästa steg

ersätta manuell polling med gmail push-notiser via google cloud pub/sub
för att göra det helt event-drivet.