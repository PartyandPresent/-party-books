# Party & Presents – AI-Powered Personalized Children's Book Store

A full-stack e-commerce app where customers upload a photo, personalize details,
preview 5 AI-generated book pages, then purchase. Staff generates the full 17-page 
book after payment.

## Stack
Next.js 14 (App Router) · Node.js · Stripe · Cloudinary · Resend · Gemini API · Zustand · Vercel

## How It Works
1. Customer selects a book and uploads their child's photo
2. Enters child's name, sender name, and dedication message
3. Gemini API generates a Pixar-style character from the photo
4. 5 preview pages are AI-generated before purchase
5. Customer checks out via Stripe
6. Staff generates full 17 pages post-payment
7. Confirmation email sent via Resend

## Pages & Routes
- `/` — Homepage
- `/books/[slug]` — Book detail
- `/personalize/[slug]` — 3-step personalization wizard
- `/preview` — AI preview (5 pages + locked thumbnails)
- `/checkout` — Shipping + Stripe payment
- `/order-success` — Order confirmation

## Status
Work in progress — core customer flow complete, deployment to Vercel pending.
