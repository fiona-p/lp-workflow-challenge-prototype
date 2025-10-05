# Front-End Developer Technical Challenge

This submission is for the Biglight Front-End Developer technical challenge.

Built with **Vite**, **React**, and **TypeScript**.

---

## Explanation of Task

- **Task 1** is written out in the ADR: [Task one](/docs/adr/task1.md)

- **Task 2** can be viewed by:

  1. Installing and running this repository (instructions below)
  2. Updating the Google Sheet [described here](/docs/adr/googleSheetStructure.md)

     **External link** to [Example Google Sheet](https://docs.google.com/spreadsheets/d/1O1_HiT9m0oKcRss_ZCx58W5wjwU486WA2UMyDCcSzxA/edit?usp=sharing)

     **_To keep this page open, please open the google sheet link in a new tab (e.g., right-click and select "Open in new tab")_**

  3. Importing the updated CSV into `scripts/csv/input.csv`
  4. Running the script:

     ```bash
     npx vite-node scripts/fetchFromSheets.ts
     ```

     OR

     ```bash
     npm run fetchCsv
     ```

  5. Running the local server to view the changes:

     ```bash
     npm run dev
     ```

  **Please note that the links to placeholder images are online, so you will need to be connected to the internet to view the images.**

---

## Install and Run

```bash
git clone https://github.com/fiona-p/lp-workflow-challenge-prototype.git
cd lp-workflow-challenge-prototype

# Install dependencies
npm install

# Run the project
npm run dev
```
