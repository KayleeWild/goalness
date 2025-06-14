# Goalness

Goalness is a React Native app built with Expo and TypeScript that helps users set and track personal goals. Users can browse goal templates, learn why they matter, and add them to their homepage for daily tracking. The name "goalness" comes from a blend between the words goal and wellness. 

## ✨ Features

* Explore a library of goal templates with descriptions and visuals
* Add goals to your personal dashboard
* Animated splash screen using a custom video
* Modular component structure for easy scaling

## 💻 Tech Stack

* **React Native** (with Expo)
* **TypeScript**
* **expo-router** for navigation

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
   - LTS of Node.js
   - May need to install various packages as prompted

3. Run the app:

   ```bash
   npx expo start
   ```
   - I recommend installing the Expo Go app on your mobile device for testing. It's free on the app/play stores. I also recommend installing the Expo Tools extension if using Visual Studio Code.

---

## 📁 Project Structure

```
/assets
  /images         ← Static background images for goal cards
  /videos         ← Splash screen animation
/components       ← Reusable UI components
/app/(tabs)       ← App screens (Explore, Home, etc.)
```

---

## 🤩 Adding a New Goal Template

1. Add a new `.png` file to `assets/images/`.

2. Open `imageMap` (in `assets/images`), and register the image:

   ```ts
   "newGoalCard": require('@/assets/images/newGoalCard.png')
   ```

3. Inside the JSON file (in `data/goalTemplates.json`), add a new entry:

   ```json
   {
     "id": 0, // must be unique number
     "title": "New Goal", // goal's title
     "description": "Why this goal is important...",
     "images": { // replace [title] with the title
         "card": "[title]Card",
         "dull": "[title]Dull",
         "color": "[title]Color"
      },
      "increment": 0, // how much it changes by when you press +/- buttons
      "suggestedAmount": 0, // default goal #
      "unit": "g" // could be oz, hrs, etc.
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

## 🚫 License

Copyright © 2025 Kaylee Wright

This project is private and proprietary. All rights reserved.  
You may not use, copy, distribute, or modify any part of this code without explicit permission from the author.

