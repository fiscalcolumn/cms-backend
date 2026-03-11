# FiscalColumn CMS — API Reference

Base URL: `http://localhost:1337/api` (development)

All public endpoints require no authentication. Admin/write operations require a Bearer token.

---

## Common Query Parameters

| Parameter | Example | Description |
|---|---|---|
| `populate` | `?populate=author,tags` | Include related data |
| `filters` | `?filters[slug][$eq]=gold` | Filter results |
| `sort` | `?sort=publishedDate:desc` | Sort results |
| `pagination[page]` | `?pagination[page]=1` | Page number |
| `pagination[pageSize]` | `?pagination[pageSize]=25` | Items per page (max 100) |
| `fields` | `?fields=title,slug` | Limit returned fields |

---

## Content

### Articles

| Method | Endpoint | Description |
|---|---|---|
| GET | `/articles` | List all published articles |
| GET | `/articles/:id` | Get article by ID |

**Common queries:**

```
# Latest articles
GET /articles?sort=publishedDate:desc&pagination[pageSize]=10
  &populate=author,category,tags,image

# Articles in a category
GET /articles?filters[category][slug][$eq]=stocks
  &sort=publishedDate:desc&populate=author,image

# Articles about a specific stock
GET /articles?filters[stocks][ticker][$eq]=HDFCBANK
  &sort=publishedDate:desc

# Featured articles
GET /articles?filters[articlecontenttype][$eq]=featured
  &sort=publishedDate:desc

# Premium articles
GET /articles?filters[premium][$eq]=true

# Search by title
GET /articles?filters[title][$containsi]=HDFC&sort=publishedDate:desc

# Single article by slug
GET /articles?filters[slug][$eq]=why-did-hdfc-go-up-today
  &populate=author,category,tags,stocks,relatedArticles,image
```

---

### Authors

| Method | Endpoint | Description |
|---|---|---|
| GET | `/authors` | List all authors |
| GET | `/authors/:id` | Get author by ID |

```
# Author profile with their articles
GET /authors?filters[slug][$eq]=ramesh-gupta
  &populate=photo,articles
```

---

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | List all categories |
| GET | `/categories/:id` | Get category by ID |

```
# All enabled categories with top article
GET /categories?filters[enabled][$eq]=true
  &sort=order:asc&populate=categoryImage,toparticle,populartags

# Category by slug
GET /categories?filters[slug][$eq]=personal-finance
  &populate=categoryImage,relatedcategories,populartags
```

---

### Tags

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tags` | List all tags |
| GET | `/tags/:id` | Get tag by ID |

```
# Tags in a group
GET /tags?filters[tagGroup][slug][$eq]=sectors&sort=name:asc

# Articles for a tag
GET /tags?filters[slug][$eq]=mutual-funds
  &populate=articles
```

---

### Tag Groups

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tag-groups` | List all tag groups |
| GET | `/tag-groups/:id` | Get tag group by ID |

```
GET /tag-groups?sort=order:asc&populate=tags
```

---

### Popular Tags

| Method | Endpoint | Description |
|---|---|---|
| GET | `/popular-tag` | Get global trending tags (singleType) |

```
GET /popular-tag?populate=tags
```

---

### Glossary

| Method | Endpoint | Description |
|---|---|---|
| GET | `/glossaries` | List all glossary terms |
| GET | `/glossaries/:id` | Get term by ID |

```
# All terms in a category, A-Z
GET /glossaries?filters[category][$eq]=investing&sort=term:asc

# Single term by slug
GET /glossaries?filters[slug][$eq]=pe-ratio
  &populate=relatedTerms,relatedArticles

# Search glossary
GET /glossaries?filters[term][$containsi]=cagr&sort=term:asc
```

---

### Static Pages

| Method | Endpoint | Description |
|---|---|---|
| GET | `/static-pages` | List all static pages |
| GET | `/static-pages/:id` | Get page by ID |

```
# Page by slug
GET /static-pages?filters[slug][$eq]=about-us

# Pages shown in footer, ordered
GET /static-pages?filters[showInFooter][$eq]=true
  &sort=footerOrder:asc&fields=title,slug,footerOrder
```

---

## Finance

### Calculators

| Method | Endpoint | Description |
|---|---|---|
| GET | `/calculators` | List all calculators |
| GET | `/calculators/:id` | Get calculator by ID |

```
# All active calculators by category
GET /calculators?filters[enableCalculator][$eq]=true
  &sort=order:asc&populate=category,tags,faqs,featuredImage

# Calculators in a category
GET /calculators?filters[category][slug][$eq]=tax-calculators
  &filters[enableCalculator][$eq]=true&sort=order:asc

# Single calculator by slug
GET /calculators?filters[slug][$eq]=sip-calculator
  &populate=faqs,category,tags
```

---

### Stocks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stocks` | List all stocks |
| GET | `/stocks/:id` | Get stock by ID |

```
# All stocks on NSE
GET /stocks?filters[exchange][$eq]=NSE&sort=name:asc

# Articles about a stock
GET /stocks?filters[slug][$eq]=hdfc-bank
  &populate=articles

# Search by ticker
GET /stocks?filters[ticker][$containsi]=HDFC
```

---

### Daily Rates

| Method | Endpoint | Description |
|---|---|---|
| GET | `/daily-rates` | List rates |
| GET | `/daily-rates/:id` | Get rate by ID |

```
# Today's gold rates (national — no city/state filter)
GET /daily-rates?filters[date][$eq]=2026-03-11
  &filters[metal][slug][$eq]=gold
  &populate=metal,metalpurity,unitmeasure,city,state

# Today's gold rate in Delhi
GET /daily-rates?filters[date][$eq]=2026-03-11
  &filters[metal][slug][$eq]=gold
  &filters[city][slug][$eq]=delhi
  &populate=metal,metalpurity,unitmeasure,city

# Today's gold rate across all UP cities
GET /daily-rates?filters[date][$eq]=2026-03-11
  &filters[metal][slug][$eq]=gold
  &filters[city][state][slug][$eq]=uttar-pradesh
  &sort=city.name:asc&populate=metal,metalpurity,city

# State-level gold rate for Maharashtra
GET /daily-rates?filters[date][$eq]=2026-03-11
  &filters[metal][slug][$eq]=gold
  &filters[state][slug][$eq]=maharashtra
  &populate=metal,metalpurity,state

# Gold rate history for Delhi (last 30 days)
GET /daily-rates?filters[metal][slug][$eq]=gold
  &filters[city][slug][$eq]=delhi
  &filters[date][$gte]=2026-02-11
  &sort=date:desc&populate=metal,metalpurity

# 22K gold rate today in Mumbai
GET /daily-rates?filters[date][$eq]=2026-03-11
  &filters[metal][slug][$eq]=gold
  &filters[metalpurity][metalpurity][$eq]=22K
  &filters[city][slug][$eq]=mumbai
  &populate=metal,metalpurity,unitmeasure
```

---

### Jewellers

| Method | Endpoint | Description |
|---|---|---|
| GET | `/jewellers` | List all jewellers (standard) |
| GET | `/jewellers/:id` | Get jeweller by ID |
| GET | `/jewellers/for-rate-page` | **Custom** — jewellers for a rate page |

#### Custom Endpoint: `/jewellers/for-rate-page`

Returns national jewellers + state/city-scoped jewellers matching the location, filtered to only those with a URL for the requested metal.

**Query Parameters:**

| Parameter | Required | Description |
|---|---|---|
| `metal` | Yes | Metal slug (e.g. `gold`, `silver`) |
| `state` | No | State slug (e.g. `uttar-pradesh`) |
| `city` | No | City slug (e.g. `gorakhpur`) |

```
# Jewellers for national gold rate page
GET /jewellers/for-rate-page?metal=gold

# Jewellers for gold rate in Uttar Pradesh
GET /jewellers/for-rate-page?metal=gold&state=uttar-pradesh

# Jewellers for gold rate in Gorakhpur, UP
GET /jewellers/for-rate-page?metal=gold&state=uttar-pradesh&city=gorakhpur

# Jewellers for silver rate in Mumbai
GET /jewellers/for-rate-page?metal=silver&state=maharashtra&city=mumbai
```

**Response shape:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Tanishq",
      "slug": "tanishq",
      "website": "https://www.tanishq.co.in",
      "scope": "national",
      "logo": { ... },
      "metalUrls": [
        {
          "metal": { "name": "Gold", "slug": "gold" },
          "url": "https://www.tanishq.co.in/gold-rate-today"
        }
      ]
    }
  ]
}
```

---

## Layout

### Header

| Method | Endpoint | Description |
|---|---|---|
| GET | `/header` | Get site header (singleType) |

```
GET /header?populate=logo,navigationCategories,header_article

# For header config (brand bar pills + category count):
GET /header?populate=logo,headerbrandbar

# Response includes:
# - logoText, logo
# - categorycount  → max nav categories before "More" dropdown
# - headerbrandbar → array of { Name, URL, ColorCode, Order }
```

---

### Footer

| Method | Endpoint | Description |
|---|---|---|
| GET | `/footer` | Get site footer (singleType) |

```
GET /footer?populate=logo,socialLinks,contactInfo,quickLinksColumn1,quickLinksColumn2,appDownloads,bottomLinks
```

---

### Homepage Sections

| Method | Endpoint | Description |
|---|---|---|
| GET | `/homepage-sections` | List all sections |

```
# All enabled sections in order
GET /homepage-sections?populate[category]=true&filters[enabled][$eq]=true&sort=order:asc

# Note: sectionStyle and itemsToShow are direct fields — they are NOT relations
# and must NOT be passed to populate. Doing so returns a 400 error.
```

---

## Geo (Reference Data)

### Countries

```
GET /countries?sort=name:asc
```

### States

```
# All states in India
GET /states?filters[country][code][$eq]=IND&sort=name:asc

# State by slug (for rate pages)
GET /states?filters[slug][$eq]=uttar-pradesh&populate=cities
```

### Cities

```
# All cities in a state
GET /cities?filters[state][slug][$eq]=uttar-pradesh&sort=name:asc

# City by slug (for rate pages)
GET /cities?filters[slug][$eq]=gorakhpur&populate=state,country
```

---

## Advertisements

```
# Active ads for a position
GET /advertisements?filters[isActive][$eq]=true
  &filters[position][$eq]=sidebar
  &filters[$or][0][startDate][$lte]=2026-03-11
  &filters[$or][1][startDate][$null]=true
  &populate=image
```

---

## Error Responses

| Status | Meaning |
|---|---|
| 200 | OK |
| 400 | Bad Request (missing/invalid parameters) |
| 401 | Unauthorized (missing token for protected routes) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |
