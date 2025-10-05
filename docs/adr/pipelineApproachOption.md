                 ┌────────────────────────────────────────────┐
                 │      Pipeline Approach (Option 2)          │
                 └────────────────────────────────────────────┘
                                       │
                 ┌─────────────────────┐
                 │ GitHub Action triggered │
                 │ (Release action /     │
                 │ workflow_dispatch)    │
                 └─────────┬───────────┘
                           │
                           ▼
                 ┌─────────────────────────┐
                 │ Node Script runs       │
                 │ Fetches data via       │
                 │ Google Sheets API      │
                 │ Validates sheet data   │
                 └─────────┬─────────────┘
                           │
           ┌───────────────┴─────────────────┐
           │                                 │
           ▼                                 ▼

JSON valid -> commit/bundle JSON -> staging/live deploy
JSON invalid -> GitHub Action fails X -> no JSON committed → deploy stops
