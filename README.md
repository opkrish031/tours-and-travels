# Marwad Cabs — Tour and Travels

Official website and lead-generation portal for **Marwad Cabs** (`Marwad Cabs — Tour and Travels`), Jodhpur's premier taxi and car rental operator based in Ratanada, Jodhpur, Rajasthan.

- **Brand Name:** Marwad Cabs
- **Legal Entity:** Marwad Cabs — Tour and Travels
- **Domain:** [https://marwadcabs.com](https://marwadcabs.com)
- **Email:** booking@marwadcabs.com
- **Dispatch Center:** Civil Airport Road, Ratanada (5 mins from Jodhpur Airport & Railway Junction), Jodhpur, Rajasthan 342001
- **Contact:** +91 89550 33005 (Call 24×7 & WhatsApp)

---

## Key Highlights & Fleet

- **Local Sightseeing:** 8 Hr / 80 Km packages for Mehrangarh Fort, Jaswant Thada, Umaid Bhawan Palace, Mandore Gardens, and Clock Tower.
- **Airport & Station Transfers:** Fixed rates from ₹450 with flight tracking and old city haveli transfer coordination from Sojati/Jalori Gate.
- **Outstation Tours:** Fixed per-km rates with standard 300 km/day minimum floor and ₹300/day driver allowance (bhatta).
  - AC Sedan (Swift Dzire / Toyota Etios): ₹11 / km
  - AC MUV (Maruti Suzuki Ertiga): ₹13 / km
  - AC SUV (Toyota Innova): ₹15 / km
  - Premium SUV (Toyota Innova Crysta): ₹16 / km
  - Force Tempo Traveller (12, 17, 20, 26 Seater): ₹24 / km
  - Force Urbania Luxury Van (10, 13, 17 Seater): ₹30 / km
  - Luxury SUV (Toyota Fortuner 4x4): ₹35 / km

---

## Tech Stack & Architecture

- **Framework:** Next.js (App Router, Server Components & Client Motion)
- **Styling:** Tailwind CSS v4 with custom Mehrangarh Midnight Navy (`#0B172A`) & Marwad Royal Gold (`#C8962E` / `#E5B84B`) palette
- **Validation:** Build-time data validation via `scripts/validate-data.ts`
- **Testing:** Vitest suite with full coverage for SEO metadata, fare estimation, rate limiting, and WhatsApp URL generation

---

## Getting Started

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run strict build-time data validation
npm run validate-data:strict

# Run Vitest test suite
npm test

# Build for production
npm run build
```
