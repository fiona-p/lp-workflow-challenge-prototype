## Task 1: Describe Your Approach

### Problem Summary

Account Managers (AMs), who are non-technical team members, frequently receive content updates from the client, including new images, CTAs, text, and links.

Currently, AMs manually convert this unstructured input into a structured format that developers can use to update landing pages. These updates are frequent, high-volume, and time-sensitive.

The goal is to create a simple, scalable way for AMs to input content in a structured and developer-friendly format, without needing to write or understand code. This will help streamline the workflow and reduce development work.

### Goals

- Make content input **easy and non-technical**
- Ensure updates are **safe**, **scalable**, and **maintainable**
- Reduce developer time where possible, without sacrificing quality control

---

## Part A: Tooling

#### Possible solutions:

- **Google Sheets** (as a shared spreadsheet)
- **Airtable**
- **Web form** with pre-defined fields for each module/block
- **Visual editor** that maps modules to page sections

---

#### Pros and Cons for Each:

---

**Airtable**

**Pros:**

- Flexible
- Has a nicer UI than spreadsheets
- API-first
- user friendly

**Cons:**

- I'm unfamiliar with the software. Too many unknowns given the timescale of this test
- Paid tiers may limit scalability or long-term maintainability if the client wants to avoid extra costs

---

**Web Form**

**Pros:**

- Helpful visual layout which allows the (AM) to quickly select the module/block that needs updating
- Easier to compare updates with the Figma design

**Cons:**

- Updating the form with new modules/blocks would require developer input
- Less maintainable and scalable
- AMs may be more comfortable with a spreadsheet format

---

**Google Sheets**

**Pros:**

- Familiar format for AMs -> smaller learning curve
- Quick and easy to update
- Scalable -> easy to add more columns/rows
- Free to use
- Easy to export data into formats like CSV
- Can integrate with Google Sheets API
- Can extend with dropdowns, validations, and structured fields

**Cons:**

- Less imaginative solution
- Sheet data is prone to human error -> needs robust validation

### Chosen Solution

I chose **Google Sheets**, as it offered the most practical advantages for this challenge.

### Key Considerations:

- There must be **one shared source of truth**. So avoid multiple sheets with overlapping data
- Use **one sheet per client** (e.g. one sheet for the ASDA website)
- **Scheduling of changes** needs careful planning (covered in **Part C** below)
- The sheet data must be **fully validated** before any updates are released

---

## Part B: Workflow

### Option 1: Custom App Approach

This would be a backend setup, such as a custom app running on a server. The app will have a simple interface.  
(Maybe this would be an AWS Lambda function running a Node.js script.)

**Custom app workflow:**  
(AM) updates the Google Sheet.

- **A: Non Google Sheets API flow**  
  (AM) exports Google Sheets as CSV.  
  (AM) uploads CSV via an ‘upload’ input on a form displayed on app interface.  
  The form submission triggers the script to run.

- **B: Google Sheets API flow (API-driven)**  
  _Note: Needs a service account to authenticate with Google Sheets API._  
  (AM) clicks on the custom app ‘get latest release’ button and fetches the latest version of the sheet using the Google Sheets API (no need for manual upload).  
  This triggers the script to run.

### Validation for A and B

- If the data is incorrect, notify the user on the interface for clear user feedback and prevent the CSV to JSON conversion.
- If the data is correct, convert CSV into a JSON payload with a timestamp.

### Storage Options

- **A:** Save the JSON as a file in the backend repository, named using the timestamp (e.g. `data-2025-10-02.json`).
- **B:** Save the JSON to an S3 bucket, also using timestamp-based naming( more scalable).

---

### Option 2: Pipeline Approach

In this approach, the Node.js script lives inside the front-end repo. There's no need for a server as it runs in a CI (Continuous Integration) environment.  
Google Sheets API is needed for this approach.

A GitHub Action executes the script automatically when a specific action is triggered (e.g. a "Release" event in the GitHub UI).

The GitHub Action fetches the latest data from the Google Sheet using the Google Sheets API.

---

### Validation

- If the sheet data is invalid, the GitHub Action fails.
- This is shown as a red cross in the GitHub Actions UI.
- When it fails, no JSON is committed, and no broken deployment occurs.

### Cons

- This method is more automated, but less non-tech friendly.
- Requires access to GitHub and some understanding of CI pipelines.
- Might not be ideal for (AMs) or content editors unfamiliar with dev workflows.

### Pros

- No need to store the JSON data separately as it is committed automatically into the workflow.
- No need to build an app to handle uploading and running the Node.js script.

## Transferring to Front End and Scheduling (part of workflow)

We don't want changes to appear immediately after a sheet update. The (AM) should be able to make multiple updates and changes before the deadline.

### 1: Custom App Approach

The app will have endpoints like `GET /latest`, accessible via timestamp buttons on the custom app interface.  
The interface will include **Release** buttons for each timestamp (i.e. which payload to load). When these buttons are clicked one of two flows is triggered:

#### A: Send to Developer Review

- A new branch is created (e.g. content-update-2025-10-05) containing the JSON/content changes.
- A developer pulls the branch locally and reviews it alongside the Figma file or design brief.
- The developer can stage the changes locally, make additional edits if needed, then commit and push to staging.
- Changes can be double-checked in the staging environment.
- This requires more developer time.

#### B: Release to Staging

- Clicking the Release button triggers a GitHub Action.
- The Custom App sends a webhook POST to GitHub’s workflow_dispatch endpoint, passing the payload
- GitHub Actions is configured to accept the payload (timestamp), run the script and deploy frontend changes straight to staging.
- Changes are committed and merged straight to the staging branch.
- Update is visible on the staging environment.

**Cons with B:**  
If JSON changes go straight into staging, developer overhead is reduced, but there is risk of breaking things (e.g., bad data, styling issues, or copy mistakes).  
Also, some style changes might only be visible in Figma designs, so going straight to staging may not always make sense.
There would need to be an easy rollback option, such as reverting to the previous staging commit or redeploying a previous stable commit.

### C: Two-Way Flow (Hybrid Approach)

Using both methods above, we check a flag in the sheet:

- If `design_change_needed = FALSE`  
  -> **Release to Staging**: The release button pushes content changes straight to staging for review.  
  _Note: Consider authentication/permissions — do we want the (AM) to have permission to do this?_

- If `design_change_needed = TRUE`  
  -> **Send to Developer Review**: Instead of releasing directly to staging:
  - The app generates the JSON but does **not** push it into the pipeline.
  - Auto-creates a branch/PR in GitHub.
  - The developer pulls the branch, stages locally, and applies any necessary design updates from Figma.

### 2: Pipeline Approach

No extra actions are needed here. The JSON is committed to the repo or bundled into the build, so changes appear on staging automatically.  
The deployment pipeline then deploys the frontend with the updated JSON to staging/live.

**Note:** You must consider easy rollback in this scenario — for example, redeploying a previous JSON file.

---

## Conclusion

I believe the best solution is to use a **Custom App (Option 1)** with the **hybrid approach (C)** for releasing updates.

In this setup, the Account Manager (AM) **uploads** the Google Sheet into the app. When the content is ready for QA, a developer clicks the **“Release Now”** button, and the changes go straight to staging. This gives the developer a chance to check everything or roll back if needed.

**Note:** The “Release Now” button will only be available to developers — the app will have basic auth/permissions in place to manage that.

If there are design changes flagged (e.g. something new in Figma), the `design_change_needed` flag is set to TRUE. In that case, the app won’t auto-push to staging. Instead, it creates a new Git branch so the developer can review the content, make any design tweaks, and then push it when ready.

---

---

# Task 2: Build a Prototype

The prototype will demonstrate how:

- A manual CSV is converted into JSON
- The generated JSON updates the front end

I'll be using **Vite** as the front-end build tool  
This will be a simple, manual flow ie: not automated.

---

## Flow:

1. Update the Google Sheet
2. Export/download it as a CSV
3. Place the CSV file into: `scripts/csv/input.csv`
4. Run the script:
   ```bash
   npm run fetchCsv
   // OR
   npx vite-node scripts/fetchFromSheets.ts
   ```
5. The front end consumes this JSON, and changes will be visible locally in the browser.

Run the front end locally with:

```bash
npm run dev
```

---

---

## Google Sheet Structure

You can view the detailed Google Sheet structure here:  
[Google Sheet Structure Documentation](/docs/adr/googleSheetStructure.md)

Here is a link to an example Google Sheet:  
[Example Google Sheet](https://docs.google.com/spreadsheets/d/1O1_HiT9m0oKcRss_ZCx58W5wjwU486WA2UMyDCcSzxA/edit?usp=sharing)

---

## Future Considerations

Currently, the sheet does not include a ‘page’ field (e.g., home page, product page).  
For a production-ready, scalable prototype, adding a page identifier will be important to properly seperate content per page.
I describe this more in [NextSteps](/docs/adr/nextSteps.md).

## What AI tools I used and how it supported my process

I describe this in [AIUSage](/docs/adr/aiTools.md).
