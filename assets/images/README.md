# Adding a New Goal
(this page is a duplicate of the README found in `assets/images`)

1. Add your `.png` file in `assets/images` (e.g., `goaltypeCard.png`)
2. Add your card data to the json file in `data/goalTemplates.json`. Each object requires the following:

    * id (unique number)
    * title (string)
    * description (string)
    * images (array)
        * card (string ie. waterCard)
        * dull (string ie. waterDull)
        * color (string ie. waterColor)
    * various other data...
3. Update `imageMap.tsx` in `assets/images`:
   ```ts
   "goaltypeCard": require('@/assets/images/goaltypeCard.png')
