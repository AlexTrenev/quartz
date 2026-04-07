---
title: Gmail-Notion Pipeline
draft: false
tags:
---
En Node.js-baserad backend som automatiskt övervakar en Gmail-inkorg och strukturerar relevanta mail i en Notion-databas.

Projektet är byggt för att förstå hur autentisering, API-integration och datatransformation fungerar i ett end-to-end flöde mellan externa tjänster.

Tech: Node.js, OAuth2, REST-API, Cron

## hur det fungerar

Autentisering sker via OAuth2 med authorization code flow, där både access- och refresh tokens används för att få långvarig åtkomst till Gmail API.

Mail hämtas från Gmail och pagineras för att hantera större inkorgar. Innehållet filtreras baserat på nyckelord för att identifiera relevanta mail kopplade till jobbansökningar och relaterad kommunikation. Varje relevant mail klassificeras och kontrolleras mot befintliga poster i Notion genom Gmail message ID.

Slutligen lagras utvalda mail som strukturerade entries i Notion med information som avsändare, ämne och datum.

## Vad jag lärde mig

- praktisk implementation av OAuth2 (authorization flow + token lifecycle)
- hur man bygger API-integrationer mellan externa tjänster
- hantering av paginerad data

## Nästa steg

Ersätta cron-baserad körning med Gmail push-notiser via Google Cloud Pub/Sub för att göra systemet mer realtidsbaserat och event-driven