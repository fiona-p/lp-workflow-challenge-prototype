# Front-End Developer Technical Challenge

This submission is for the Biglight Front-End Developer technical challenge.

Built with **Vite**, **React**, and **TypeScript**.

---

## Explanation of Task

- **Task 1** is explained in the ADR: [link to Task one](/docs/adr/task1.md)

- **Task 2** can be viewed by:

  1. Installing and running this repository (instructions below)
  2. Updating the Google Sheet [described here](/docs/adr/googleSheetStructure.md).  
     _TODO: Link to external Google Sheet_
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
git clone https://github.com/fiona-p/....
cd <repository-folder>

# Install dependencies
npm install

# Run the project
npm run dev
```
