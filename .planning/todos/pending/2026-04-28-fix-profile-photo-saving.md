---
created: 2026-04-28T11:57:45+05:30
title: Fix Profile Photo Saving
area: ui
files:
  - src/components/ProfilePage.tsx
---

## Problem

After setting up the profile photo, it does not get saved. The user's uploaded image state is lost upon refresh or not successfully committed to the backend.

## Solution

Ensure image upload is wired to the backend and the new URL is saved to the User document in MongoDB and synchronized to the local session/localStorage.
