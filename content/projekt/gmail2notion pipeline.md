---
title: Gmail to Notion-pipeline
draft: false
tags:
---
**tech**: node.js. ouath 2.0, rest api, notion api, gmail api

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
    <span style="color: var(--tertiary);">Node.js</span>
    <span style="opacity: 0.4;">/</span>
    <span style="color: var(--tertiary);">OAuth2</span>
    <span style="opacity: 0.4;">/</span>
    <span style="color: var(--tertiary);">REST-API</span>
    <span style="opacity: 0.4;">/</span>
  </div>
</div>


En Node.js-server som automatiskt spårar jobbansökningar genom att
övervaka en gmail-inkorg och logga relevanta mail till en notion-databas.

byggd för att lära mig oauth 2.0 och vad det faktiskt innebär att
koppla ihop två tredjeparts-api:er från början till slut.



---

## hur det fungerar

1. autentiserar med gmail via oauth 2.0 - fullt authorization code flow med access- och refresh-tokens
2. hämtar mail via gmail api med paginering, filtrerat på jobbreleterade nyckelord
3. klassificerar varje mail som ansökt, intervju, avslag eller okänt via en nyckelordsklassificerare
4. kontrollerar notion efter befintliga poster via gmail-meddelande-id för att undvika dubletter
5. loggar nya poster till notion med företag, ämne, datum och status

---

## vad jag lärde mig

- oauth 2.0-implementation från grunden
- paginering för stora datamängder
- datatransformation och mappning

---

## nästa steg

ersätta manuell polling med gmail push-notiser via google cloud pub/sub för att göra det helt event-drivet.