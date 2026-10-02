# 🛒 Gadget Shop

A modern, full-stack e-commerce website for selling gadgets. Built with **Next.js 14**, **Supabase**, **NextAuth.js**, **Stripe**, and **Mailgun**.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Stripe](https://img.shields.io/badge/Stripe-Payments-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

- 🏠 Beautiful landing page with hero, featured products & category filters
- 📱 Product catalog with search, category and price filtering
- 🛒 Persistent shopping cart (Zustand + localStorage)
- 💳 Complete checkout flow with Stripe Payment Element
- 🔐 Email + Password authentication
- 🔵 Google Sign-In (NextAuth.js v5)
- 📧 Professional order confirmation emails (Mailgun)
- 📦 Order history & order detail pages
- 🌙 Dark / light mode ready
- 📱 Fully responsive (mobile-first)

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend    | Next.js 14 (App Router) + TypeScript + Tailwind |
| Auth        | NextAuth.js v5 (Google + Credentials)           |
| Database    | Supabase (PostgreSQL) + Row Level Security      |
| Payments    | Stripe (Payment Intents + Elements)             |
| Email       | Mailgun                                         |
| State       | Zustand                                         |
| Deploy      | Netlify / Vercel ready                          |

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/gadget-shop.git
cd gadget-shop
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in the values (see table below).

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (secret) |
| `NEXTAUTH_URL` | `http://localhost:3000` (local) or your production URL |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `MAILGUN_API_KEY` | Mailgun API key |
| `MAILGUN_DOMAIN` | Mailgun domain |
| `MAILGUN_FROM_EMAIL` | Sender email (optional) |

### 3. Database Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste the contents of `supabase/schema.sql` → Run
3. Seed sample products:

```bash
npx tsx scripts/seed.ts
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
gadget-shop/
├── src/
│   ├── app/
│   │   ├── api/                 # Auth, Checkout, Webhooks
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── login/ & register/
│   │   ├── orders/
│   │   ├── products/
│   │   └── page.tsx             # Home
│   ├── actions/                 # Server Actions
│   ├── components/              # UI + Navbar, ProductCard, etc.
│   ├── hooks/                   # useCart (Zustand)
│   ├── lib/                     # supabase, stripe, mailgun, auth
│   └── types/
├── scripts/seed.ts
├── supabase/schema.sql
├── netlify.toml
└── .env.example
```

## Deployment (Netlify + GitHub)

1. Push this repo to GitHub.
2. Go to [Netlify](https://app.netlify.com) → **Add new site** → Import from GitHub.
3. Add all environment variables (set `NEXTAUTH_URL` to your Netlify URL).
4. Deploy.

**After first deploy:**

- **Google OAuth**: Add redirect URI  
  `https://YOUR-SITE.netlify.app/api/auth/callback/google`
- **Stripe Webhook**: Point to  
  `https://YOUR-SITE.netlify.app/api/webhooks/stripe`

See the full deployment guide in the original instructions or Netlify docs.

## License

MIT © 2026 Gadget Shop
