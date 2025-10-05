import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Row, Module, Block, ModuleType } from '../src/types';
import { validateRow } from './helpers/validateRow';

/*
This is a script which runs in node. 
It receives a CSV export from a google sheet and generates JSON into "src/data/modules.json".
For the prototype, the CSV is placed in "scripts/csv/input.csv".
The CSV is validated with the helper "scripts/helpers/validateRow.ts".
The React components will update according to the generated JSON.
To run: 
npx vite-node scripts/fetchFromSheets.ts  // OR
npm run fetchCsv

In a real-word situation, the user would 
a: Input the CSV file manually through a form, which triggers the script to run on a server to process the data.
b: Update the Google Sheet directly and then 
  - The script fetches data from the Google Sheets API when triggered by a user action (e.g clicking a button in a custom app) OR
  - Automated process (such as a GitHub Action) runs the script to fetch the latest data from the Google Sheets API, process it, and deploy or commit changes.
*/

// Function to convert CSV rows to modules
function rowsToModules(rows: Row[]): Module[] {
  const modules: { [key: string]: Module } = {};

  rows.forEach((row) => {
    const key = row.module_id; //hero_1" or "promo_1"

    // If module doesn't exist yet, create it
    if (!modules[key]) {
      modules[key] = {
        id: row.module_id,
        type: row.module_type as ModuleType,
        blocks: [],
      };
    }

    // Create a block from the row
    const block: Block = {
      block_order: Number(row.block_order), // field for ordering blocks on page
      image_desktop: row.image_desktop,
      image_mobile: row.image_mobile,
      alt: row.alt_text,
      headline: row.headline || undefined,
      subheading: row.subheading || undefined,
      cta: row.cta_label
        ? { label: row.cta_label, url: row.cta_url, style: row.cta_style }
        : undefined,
      overlay_content_align: row.overlay_content_align || undefined,
      design_change_needed: row.design_change_needed === 'TRUE',
    };

    // Sort blocks inside each module by block_order
    Object.values(modules).forEach((mod) => {
      mod.blocks.sort((a, b) => (a.block_order ?? 0) - (b.block_order ?? 0));
    });

    // Add block to module
    modules[key].blocks.push(block);
  });

  // Return array of modules
  // example: [{ module }, { module }]

  return Object.values(modules);
}

// ----- File paths -----
const inputCsvPath = path.resolve(__dirname, 'csv/input.csv');
const outputJsonPath = path.resolve(__dirname, '../src/data/modules.json');

// ----- Read CSV and convert to JSON -----
const rows: Row[] = [];

fs.createReadStream(inputCsvPath)
  .pipe(csv())
  .on('data', (row) => {
    // we need to transform some values before going through validation
    const typedRow: Row = {
      ...row,
      overlay_content_align: row.overlay_content_align || undefined,
    };

    if (validateRow(typedRow)) {
      rows.push(typedRow); // only push valid rows
    } else {
      // in production this would be output to the user
      console.warn('Skipping invalid row:', typedRow);
    }
  })
  .on('end', () => {
    const output = {
      modules: rowsToModules(rows),
    };

    fs.writeFileSync(outputJsonPath, JSON.stringify(output, null, 2));
    console.log(`JSON created at ${outputJsonPath}`);
  });
