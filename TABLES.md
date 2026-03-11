# FiscalColumn CMS — Content Types Reference

> 23 content types across content, finance, geo, layout, and reference categories.
> All types have `draftAndPublish: true` unless noted.

---

## Content

### Article (collectionType)
Articles, blog posts, and news for the site.

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `slug` | uid → title | required |
| `subtitle` | string | display headline beneath title |
| `author` | relation → Author (manyToOne) | |
| `publishedDate` | datetime | required |
| `lastupdateddate` | datetime | |
| `excerpt` | text | |
| `image` | media (images) | featured image |
| `views` | integer | default 0 |
| `minutesToread` | integer | default 3 |
| `content` | richtext | |
| `premium` | boolean | default false |
| `metaTitle` | string | max 70 chars |
| `metaDescription` | text | max 160 chars |
| `canonicalUrl` | string | |
| `articlecontenttype` | enum | `standard`, `featured`, `premium` |
| `category` | relation → Category (manyToOne) | |
| `tags` | relation → Tag (manyToMany) | |
| `stocks` | relation → Stock (manyToMany) | stocks this article covers |
| `relatedArticles` | relation → Article (manyToMany, self) | |

---

### Author (collectionType)
Content authors and contributors.

| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `slug` | uid → name | required |
| `bio` | text | |
| `photo` | media (images) | |
| `designation` | string | e.g. "Senior Financial Analyst" |
| `twitter` | string | handle |
| `linkedin` | string | profile URL |
| `articles` | relation → Article (oneToMany) | back-relation |

---

### Category (collectionType)
Organises articles and calculators. Maps to homepage sections.

| Field | Type | Notes |
|---|---|---|
| `name` | string | required, unique |
| `slug` | uid → name | required |
| `displayname` | string | required, unique |
| `description` | text | |
| `categoryImage` | media | |
| `order` | integer | default 0 |
| `enabled` | boolean | required, default true |
| `categorycontenttype` | enum | `articles`, `calculators`, `rates` |
| `articles` | relation → Article (oneToMany) | back-relation |
| `calculators` | relation → Calculator (oneToMany) | back-relation |
| `toparticle` | relation → Article (oneToOne) | pinned top article |
| `populartags` | relation → Tag (oneToMany) | |
| `relatedcategories` | relation → Category (oneToMany, self) | |
| `relatedtaggroups` | relation → Tag Group (oneToMany) | |

---

### Tag (collectionType)
Tags for filtering and cross-linking articles.

| Field | Type | Notes |
|---|---|---|
| `name` | string | required, unique |
| `slug` | uid → name | required |
| `description` | text | |
| `tagGroup` | relation → Tag Group (manyToOne) | |
| `similarTags` | relation → Tag (manyToMany, self) | |
| `relatedTags` | relation → Tag (manyToMany, self) | |
| `articles` | relation → Article (manyToMany) | back-relation |

---

### Tag Group (collectionType)
Organises tags into named groups (e.g. "Sectors", "Instruments").

| Field | Type | Notes |
|---|---|---|
| `name` | string | required, unique |
| `slug` | uid → name | required |
| `description` | text | |
| `order` | integer | default 0 |
| `tags` | relation → Tag (oneToMany) | back-relation |

---

### Popular Tag (singleType)
Global list of currently trending tags shown site-wide.

| Field | Type | Notes |
|---|---|---|
| `tags` | relation → Tag (oneToMany) | |

---

### Glossary (collectionType)
Financial term definitions — "What is SIP?", "What is P/E ratio?".

| Field | Type | Notes |
|---|---|---|
| `term` | string | required, unique |
| `slug` | uid → term | required |
| `definition` | richtext | required |
| `shortDefinition` | text | max 300 chars, for cards/snippets |
| `category` | enum | `investing`, `trading`, `banking`, `insurance`, `taxation`, `general` |
| `metaTitle` | string | max 70 chars |
| `metaDescription` | text | max 160 chars |
| `relatedTerms` | relation → Glossary (manyToMany, self) | |
| `relatedArticles` | relation → Article (manyToMany) | |

---

### Static Page (collectionType)
About Us, Privacy Policy, Terms of Use, Contact, etc.

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `slug` | uid → title | required |
| `content` | richtext | required |
| `excerpt` | text | max 300 chars |
| `featuredImage` | media (images) | |
| `metaTitle` | string | max 70 chars |
| `metaDescription` | text | max 160 chars |
| `pageType` | enum | `general`, `legal`, `contact`, `about` |
| `showInFooter` | boolean | default false |
| `footerOrder` | integer | default 0 |
| `contactEmail` | email | shown for contact pages |
| `contactPhone` | string | |
| `contactAddress` | text | |
| `showContactForm` | boolean | default false |

---

## Finance

### Calculator (collectionType)
Financial calculators (SIP, EMI, FD, etc.).

| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `slug` | uid → title | required |
| `icon` | string | FontAwesome class, default "fa-calculator" |
| `iconColor` | string | hex, default "#14bdee" |
| `excerpt` | text | max 200 chars |
| `featuredImage` | media (images) | |
| `description` | richtext | |
| `formulaExplanation` | richtext | |
| `howToUse` | richtext | |
| `disclaimer` | text | |
| `metaTitle` | string | max 70 chars |
| `metaDescription` | text | max 160 chars |
| `order` | integer | default 0 |
| `enableCalculator` | boolean | default true |
| `views` | biginteger | default 5 |
| `faqs` | component (calculator.faq, repeatable) | |
| `category` | relation → Category (manyToOne) | |
| `tags` | relation → Tag (manyToMany) | |
| `calculatorcategory` | relation → Calculator Category Type (oneToOne) | |

---

### Calculator Category Type (collectionType)
Lookup table for calculator groupings with display order.

| Field | Type | Notes |
|---|---|---|
| `calculatorcategory` | string | required, unique |
| `order` | integer | required |

---

### Stock (collectionType)
Company/stock listings for tagging articles. No realtime data.

| Field | Type | Notes |
|---|---|---|
| `name` | string | required, unique |
| `slug` | uid → name | required |
| `ticker` | string | e.g. "HDFCBANK" |
| `exchange` | enum | `NSE`, `BSE`, `NASDAQ`, `NYSE` |
| `sector` | string | e.g. "Banking", "IT" |
| `description` | text | |
| `articles` | relation → Article (manyToMany) | back-relation |

---

### Daily Rate (collectionType)
Daily buying/selling rates for precious metals by city or state.

| Field | Type | Notes |
|---|---|---|
| `date` | date | required |
| `buyingRate` | decimal | required — what shop pays you |
| `sellingRate` | decimal | required — what you pay shop |
| `source` | string | e.g. "IBJA", "MCX", "Local Market" |
| `metal` | relation → Metal (oneToOne) | |
| `metalpurity` | relation → Metal Purity (oneToOne) | |
| `unitmeasure` | relation → Unit Measure (oneToOne) | |
| `city` | relation → City (oneToOne) | optional — null = state/national level |
| `state` | relation → State (oneToOne) | optional — for state-level rates |

---

### Metal (collectionType)
Precious metal types — Gold, Silver, Platinum, etc.

| Field | Type | Notes |
|---|---|---|
| `name` | string | required, unique |
| `slug` | uid → name | required |
| `description` | richtext | |

---

### Metal Purity (collectionType)
Purity grades — 24K, 22K, 18K, 999 Silver, etc.

| Field | Type | Notes |
|---|---|---|
| `metalpurity` | string | required, unique |
| `puritydescription` | string | |

---

### Unit Measure (collectionType)
Units for rate pricing — gram, tola, ounce, kg.

| Field | Type | Notes |
|---|---|---|
| `unitofmeasure` | string | required, unique |
| `uomdescription` | string | |

---

### Jeweller (collectionType)
National chains and local jewellers shown alongside rate pages.

| Field | Type | Notes |
|---|---|---|
| `name` | string | required, unique |
| `slug` | uid → name | required |
| `logo` | media (images) | |
| `website` | string | homepage URL |
| `metalUrls` | component (jeweller.metal-url, repeatable) | per-metal rate/buy page URLs |
| `scope` | enum | `national`, `state`, `city` |
| `states` | relation → State (manyToMany) | populate when scope = state |
| `cities` | relation → City (manyToMany) | populate when scope = city |
| `isActive` | boolean | required, default true |

**`jeweller.metal-url` component:**

| Field | Type | Notes |
|---|---|---|
| `metal` | relation → Metal (oneToOne) | |
| `url` | string | required — rate/buy page or affiliate URL |

---

## Advertisement

### Advertisement (collectionType)
Display ads and direct brand partnerships managed from CMS.

| Field | Type | Notes |
|---|---|---|
| `name` | string | required — internal label |
| `position` | enum | `header`, `sidebar`, `in-article`, `footer`, `between-posts` |
| `type` | enum | `display`, `sponsored`, `brand-partnership` |
| `image` | media (images) | banner creative |
| `linkUrl` | string | destination URL |
| `altText` | string | accessibility text |
| `isActive` | boolean | required, default true |
| `startDate` | date | campaign start |
| `endDate` | date | campaign end |

---

## Geo

### Country (collectionType)

| Field | Type | Notes |
|---|---|---|
| `name` | string | required, unique |
| `code` | string | required, unique, max 3 chars (e.g. "IND") |
| `currency` | string | required, max 3 chars (e.g. "INR") |
| `states` | relation → State (oneToMany) | back-relation |
| `cities` | relation → City (oneToMany) | back-relation |

---

### State (collectionType)

| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `slug` | uid → name | required |
| `code` | string | max 10 chars (e.g. "UP", "MH") |
| `country` | relation → Country (manyToOne) | |
| `cities` | relation → City (oneToMany) | back-relation |

---

### City (collectionType)

| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `slug` | uid → name | required |
| `state` | relation → State (manyToOne) | |
| `country` | relation → Country (manyToOne) | |

---

## Layout

### Header (singleType)
Site-wide navigation header.

| Field | Type | Notes |
|---|---|---|
| `logoText` | string | required, default "Unicat" |
| `logo` | media (images) | |
| `navigationCategories` | relation → Category (oneToMany) | nav menu categories |
| `CategoryNotFound` | media | fallback image |
| `header_article` | relation → Article (oneToOne) | featured article in header |

---

### Footer (singleType)
Site-wide footer with links, socials, and app downloads.

| Field | Type | Notes |
|---|---|---|
| `logoText` | string | |
| `logo` | media (images) | |
| `description` | text | brand tagline |
| `socialLinks` | component (layout.social-link, repeatable) | |
| `contactInfo` | component (layout.contact-info) | |
| `quickLinksTitle` | string | default "Quick Links" |
| `quickLinksColumn1` | component (layout.link, repeatable) | |
| `quickLinksColumn2` | component (layout.link, repeatable) | |
| `mobileTitle` | string | default "Mobile" |
| `appDownloads` | component (layout.app-download, repeatable) | |
| `copyrightText` | string | |
| `bottomLinks` | component (layout.link, repeatable) | legal/privacy links |

---

### Homepage Section (collectionType)
Dynamic sections on the homepage — each maps to a category.

| Field | Type | Notes |
|---|---|---|
| `category` | relation → Category (manyToOne) | content source for this section |
| `buttonText` | string | default "view all" |
| `order` | integer | required, default 0, min 0 |
| `enabled` | boolean | required, default true |
| `sectionStyle` | enum | `news-grid`, `article-list`, `calculator-grid`, `featured-banner` |
| `itemsToShow` | integer | default 6, min 1, max 20 |

---

## Components

| Component | Fields |
|---|---|
| `calculator.faq` | `question` (string, required), `answer` (text, required) |
| `jeweller.metal-url` | `metal` (relation → Metal), `url` (string, required) |
| `layout.link` | `label` (string), `url` (string) |
| `layout.link-column` | `links` (layout.link, repeatable) |
| `layout.social-link` | `platform` (enum: facebook/twitter/instagram/linkedin/youtube/tiktok/google), `url` (string, required) |
| `layout.contact-info` | `phone` (string), `email` (string), `address` (text) |
| `layout.app-download` | `platform` (enum: google-play/app-store), `url` (string, required), `badgeImage` (media) |
| `seo.meta` | `metaTitle` (string), `metaDescription` (text), `shareImage` (media) |
