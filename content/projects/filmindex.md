---
title: film index
draft: false
tags:
  - project
---
a film browsing site. search and view movies in a gallery format with images and metadata pulled from external apis.

built to learn api handling and and how to structure api logic cleanly within a project.

==hightlight==
### homepage:
![[Pasted image 20260312161029.png]]

---
## how it works

uses two apis: tmdb as the primary source for movie data and images, and omdb for enrichment with imdb ratings.

all api calls are handled through a dedicated file within the project, keeping the frontend components clean and the api logic in one place.

also includes a curator feature. given some user inputs, it fetches three tailored movie picks.

---

## what i learned

- keeping api logic separated from frontend components
- handling responses from two different data sources