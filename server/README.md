# FiscalColumn — CMS Backend

Strapi v5 headless CMS powering the FiscalColumn finance platform.

## Setup

```bash
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

## Running

```bash
# Development (auto-reload)
npm run dev

# Production
npm start

# Build admin panel
npm run build
```

Server starts on **http://localhost:1337**
Admin panel: **http://localhost:1337/admin**

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Default | Description |
|---|---|---|
| `HOST` | `0.0.0.0` | Server host |
| `PORT` | `1337` | Server port |
| `DATABASE_CLIENT` | `sqlite` | `sqlite` or `postgres` |
| `DATABASE_FILENAME` | `.tmp/data.db` | SQLite file path |
| `DATABASE_URL` | — | PostgreSQL connection string (prod) |
| `DATABASE_SSL` | `true` | Enable SSL for PostgreSQL |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed frontend origin(s), comma-separated |

## Content Types

23 content types across 5 domains. See [`../TABLES.md`](../TABLES.md) for the full schema reference.

| Domain | Types |
|---|---|
| Content | Article, Author, Category, Tag, Tag Group, Popular Tag, Glossary, Static Page |
| Finance | Calculator, Calculator Category Type, Stock, Daily Rate, Metal, Metal Purity, Unit Measure, Jeweller, Advertisement |
| Geo | Country, State, City |
| Layout | Header, Footer, Homepage Section |

## API

Base URL: `http://localhost:1337/api`

All read endpoints are public (no authentication required). Write operations require a Bearer token.

See [`../APIS.md`](../APIS.md) for the full API reference with example queries.

## Custom Endpoints

Beyond standard CRUD, three custom endpoints are implemented:

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/articles/:id/view` | Increment article view count |
| `POST` | `/api/calculators/:id/view` | Increment calculator view count |
| `GET` | `/api/jewellers/for-rate-page` | Jewellers filtered by metal + city/state scope |

## Database

- **Development**: SQLite at `.tmp/data.db`
- **Production**: PostgreSQL via `DATABASE_URL`. Supports `DATABASE_URL` (connection string) or individual `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` variables.
