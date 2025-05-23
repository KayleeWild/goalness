# Adding a New Card Image
(this page is a duplicate of the README found in `/data`)
1. Add your `.png` file in `assets/images` (e.g., `goaltypeBackground.png`)
2. Add your card data to the json file in `data/goalTemplates.json`. Each object requires the following:

    * id
    * title
    * description
    * image filename (png is best)
3. Update `imageMap` in `app/(tabs)/explore.tsx`:
   ```ts
   "goaltypeBackground.png": require('@/assets/images/goaltypeBackground.png')
