## Next Steps

If I were to continue this project beyond the prototype, here’s how I would move forward:

### 1. Extend the Google Sheet Structure

- Add a `page` column to differentiate content by landing page.
- Expand columns to support additional content types.
- Introduce dropdowns and validations to help AMs format input correctly.

### 2. Refactor the code base for Page Support

- Restructure the JSON format to group modules under each page.
- Update the front-end logic to render content conditionally based on the page.
- Adapt the renderer to loop through pages and modules in a scalable way.

### 3. Build More Reusable Components

- Develop generic, flexible components for common module types.
- Improve prop validation and type safety using TypeScript.

### 4. Set Up a Front-End Repo That Matches a Real Project

- Set up a production-ready front-end repo with clean project structure.
- Add routing to support multiple pages.
- Integrate staging deployments.

### 5. Build the Custom App (As Outlined in Task 1)

Create a lightweight custom app (possibly using **Express** or **AWS Lambda**) that:

- Fetches or accepts Google Sheets data (via API or file upload).
- Validates and converts the data to JSON.
- Sends a webhook to GitHub Actions to trigger deployments:
  - Create a branch for developer review.
  - Or merge directly to the staging branch.
- Adds basic authentication to restrict access and track release actions.
- Includes a simple rollback mechanism (e.g. revert to previous JSON/staging commit).
