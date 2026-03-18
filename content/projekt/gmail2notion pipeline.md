---
title: gmail2notion
draft: false
tags:
  - project
---

a Node.js server that automatically tracks job applications by monitoring a gmail inbox and logging relevant emails to a notion database.

built to learn oauth 2.0 and what it actually takes to wire
two third-party apis together end to end.

---

## how it works

1. authenticates with gmail via oauth 2.0 — full authorization code
   flow with access and refresh tokens
2. fetches emails via the gmail api with pagination, filtered by
   job-related keywords
3. classifies each email as applied, interview, rejected or unknown using a keyword classifier
4. checks notion for existing entries via gmail message id to prevent
   duplicates
5. logs new entries to notion with company, subject, date and status

---

## what i learned

- oauth 2.0 implementation
- consuming and combining two rest apis
- pagination handling for large data sets
- data transformation

---

## next

replace manual polling with gmail push notifications via
google cloud pub/sub making it fully event-driven.