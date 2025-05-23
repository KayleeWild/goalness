# GoalTracker App

GoalTracker is a React Native app built with Expo and TypeScript that helps users set and track personal goals. Users can browse goal templates, learn why they matter, and add them to their homepage for daily tracking.

## ✨ Features

* Explore a library of goal templates with descriptions and visuals
* Add goals to your personal dashboard
* Animated splash screen using a custom video
* Modular component structure for easy scaling

## 💦 Tech Stack

* **React Native** (with Expo)
* **TypeScript**
* **expo-router** for navigation
* **expo-av** for splash screen animation
* **Static assets** organized under `/assets`

## 📦 Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/goaltracker.git
   cd goaltracker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npx expo start
   ```

---

## 📁 Project Structure

```
/assets
  /images         ← Static background images for goal cards
  /videos         ← Splash screen animation
/components       ← Reusable UI components (e.g. InfoGoal)
/app/(tabs)       ← App screens (Explore, Home, etc.)
```

---

## 🤩 Adding a New Goal Template

1. Add a new `.png` file to `assets/images/`.

2. Open `imageMap` (in `app/(tabs)/explore.tsx`), and register the image:

   ```ts
   "newGoalBackground.png": require('@/assets/images/newGoalBackground.png')
   ```

3. Inside the JSON file (in `data/goalTemplates.json`), add a new entry:

   ```json
   {
     "id": "new goal",
     "title": "New Goal",
     "description": "Why this goal is important...",
     "backgroundImage": "newGoalBackground.png"
   }
   ```


---

## 🎬 Splash Screen (Video)

* Splash screen is handled via a custom video using `expo-av`.
* The video is centered with padding and plays automatically on app load.
* Be aware that `expo-av` is deprecating; migration to `expo-video` may be required in the future.

---

## 🔮 Coming Soon

* Custom goal creation
* Habit tracking and analytics
* User accounts and syncing

---

## 🧠 Notes

* Metro (React Native's bundler) does **not** support dynamic `require()` — image and video assets must be statically referenced.
* The goal card descriptions are scrollable. You can adjust the scroll area height via the `descriptionBox` style in the `InfoGoal` component.

---

## 🚫 License

Copyright © 2025 Kaylee Wright

This project is private and proprietary. All rights reserved.  
You may not use, copy, distribute, or modify any part of this code without explicit permission from the author.

