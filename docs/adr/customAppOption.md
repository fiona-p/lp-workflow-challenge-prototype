                 ┌────────────────────────────────────┐
                 │          Custom App (Option 3)     │
                 └────────────────────────────────────┘
                                       │
             ┌─────────────────────────┴─────────────────────────┐
             │                                                   │

Manual upload (CSV) API-driven fetch
[Upload CSV button] [Fetch latest button]
│ │
▼ ▼
┌─────────────┐ ┌────────────────┐
│ Node Script │ │ Node Script │
│ CSV → JSON │ │ API → JSON │
└─────┬───────┘ └─────┬─────────┘
│ │
▼ ▼
┌─────────────────────┐ ┌─────────────────────┐
│ JSON stored │ │ JSON stored │
│ - local file │ │ - local file / S3 │
│ - timestamped │ │ - timestamped │
└─────────┬───────────┘ └─────────┬──────────┘
│ │
▼ ▼
┌─────────────────────┐ ┌─────────────────────┐
│ Frontend fetches │ │ Frontend fetches │
│ JSON dynamically │ │ JSON dynamically │
│ GET /latest or │ │ GET /latest or │
│ GET /timestamp │ │ GET /timestamp │
└─────────┬───────────┘ └─────────┬──────────┘
│ │
▼ ▼
┌─────────────────────┐ ┌─────────────────────┐
│ Release button on UI│ │ Release button on UI│
│ picks payload │ │ picks payload │
└─────────┬───────────┘ └─────────┬──────────┘
│ │
▼ ▼
Trigger deploy / commit → staging/live Trigger deploy / commit → staging/live
