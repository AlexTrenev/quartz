---
title: Paintracker
draft: false
tags:
---
## 2024--2025

En applikation för att registrera och följa skador och smärta över tid, framtagen för idrottare och fysioterapeuter.

Användare loggar smärtnivåer och återhämtning i en mobilapp, medan fysioterapeuter får en översikt över patienternas historik via ett separat webbgränssnitt.

Projektet är byggt som ett grupprojekt i ett team på fyra personer.

**Tech:** Flutter (Dart), React, TypeScript, Firebase

## Hur den fungerar

Systemet består av två separata klienter:

Mobilapplikationen (Flutter) används av användare för att logga skador, smärtnivåer och återhämtningsstatus över tid.

Webbapplikationen (React) fungerar som en dashboard för fysioterapeuter där de kan följa patienthistorik och utveckling.

All data synkas via Firebase och delas mellan de två klienterna i realtid.

## Arkitektur & fokus

Projektet var uppdelat i tydliga ansvarsområden mellan mobil- och webbdel, med fokus på gemensam datamodell via Firebase.

- separata klienter för olika användargrupper
- realtidsdata via Firebase
- strukturerad datamodell för medicinsk information
- fokus på enkelhet och tydlighet i användarflöden

## Vad jag lärde mig
- kravhantering i ett teamprojekt
- hur man designar system för flera användartyper
- att översätta användarbehov till konkreta features
- arbete i team med tydliga ansvarsområden
- utveckling inom en känslig domän (hälso-/vårdinformation)
- hur realtidsdata fungerar med Firebase