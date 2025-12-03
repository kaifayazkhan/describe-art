<p align="center">
  <a href="https://describe-art.vercel.app/" title="Describe Art">
    <img src="public/assets/logo-1.webp" alt="Describe Art logo" width="150" />
  </a>
</p>

<h3 align="center">Describe Art</h3>

<p align="center">
  <a href="https://www.youtube.com/watch?v=hZcpmw3P5L0">View Demo</a>
</p>

## Project Description

Describe Art is a text to image generation platform that uses Vision AI to create visuals from user prompts. High quality output comes from the Stable Diffusion XL model.

## Tech Stack

Next.js, TailwindCSS, ContextAPI, TypeScript, Drizzle, PostgreSQL, AWS (S3 + Cloudfront), React Hook Form

## Features

- User authentication with email, password, and Google Sign In
- Generate images using Stable Diffusion XL, Flux Schnell or Flux Dev
- All images are stored in AWS S3 with metadata saved in PostgreSQL
- Personal gallery page where users can view all their generated images
- Cursor based pagination with infinite scroll for a smooth browsing experience

## Environment Variables

Copy .env.example to .env and add your keys:

```bash
DATABASE_URL=""

STABILITY_API_KEY=""
NEBIUS_API_KEY=""

RESEND_API_KEY=""
RESEND_FROM_EMAIL=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

AWS_ACCESS_KEY=""
AWS_SECRET_KEY=""
AWS_S3_BUCKET_NAME=""
AWS_REGION=""

NEXT_PUBLIC_BASE_URL=""

BETTER_AUTH_SECRET=""
```

## Getting Started

- Clone the repo:

```bash
  git clone https://github.com/kaifayazkhan/describe-art
```

- Navigate to the project directory:

```bash
    cd describe-art
```

- Install the dependencies:

```bash
    npm i
```

- Build the app:

```bash
    npm run build
```

- Run the app:

```bash
    npm run start
```
