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

Text to Image generation platform that uses **Vision AI** to generate images from prompts. It uses Stable Diffusion XL model for generating high quality images.

## Tech Stack

Next.js, TailwindCSS, ContextAPI, TypeScript, Drizzle, PostgreSQL, AWS (S3 + Cloudfront), React-hook-form

## Features

- Create account (Email and Password, Google Sign In)
- Generate images from prompt
- Images are stored in S3 bucket and metadata into postgres database

## Getting Started

- Clone the repo

```bash
  git clone https://github.com/kaifayazkhan/describeArt
```

- Navigate to the project directory

```bash
    cd describeArt
```

- Install the dependencies

```bash
    npm i
```

- Rename the .env.example to .env and put your actual keys
- Build the app

```bash
    npm run build
```

- Run the app

```bash
    npm run start
```
