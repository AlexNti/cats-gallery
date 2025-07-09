# 🐱 Cat Lovers Gallery

Welcome to **Cat Lovers Gallery** a fun and modern web app where you can:

- 🖼️ View cute cat pictures
- 📚 Learn about different cat breeds
- ❤️ Save your favorite images

This app is built with **Next.js 15**, **Tailwind CSS**, and uses a colorful **neo-brutalism** design style.

---

## ✨ Features

- 🖼️ A gallery showing many cat images as cards
- 🐾 Click an image to learn about the cat's breed (if available)
- 🧠 A page showing all available cat breeds
- 🐈 Click a breed to see only cats of that breed
- 🔍 Click images to open a modal with more breed info
- ❤️ View a list of your favorite cat images

---

## 🛠️ How to run locally

### ⚠️❗ Get your API key from [https://thecatapi.com/](https://thecatapi.com/)

1. Clone the repo and open the folder

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup your ENV variables at .env.local:

   **Option 1: Automated Setup**

   ```bash
   npm run setup-env
   ```

   **Option 2: Manual Setup**
   Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_API_URL=https://api.thecatapi.com
   NEXT_PUBLIC_API_VERSION=v1
   NEXT_PUBLIC_API_KEY=your_api_key_here
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

> Or try the live version: [https://courageous-trifle-f9f9db.netlify.app/](https://courageous-trifle-f9f9db.netlify.app/)

---

## 🧪 How to run tests

> ⚠️ Before running the tests make sure that the local server is running localhost:3000

For headless running:

```bash
npm run tests:e2e
```

To run with the UI present:

```bash
npm run tests:e2e:ui
```

---

## 🗂️ Project Structure

All main code is inside the `src/` folder. We split the code into two main types:

### 1. General purpose code (not tied to business logic)

- **`components/`** – UI parts like buttons, modals, tabs
- **`hooks/`** – Utility hooks like `useDebounce`, `useLoadMore`
- **`utils/`** – Shared functions like HTTP request helpers

> These folders are **generic** and should **not import anything from the `app/` folder**. If you need to, consider moving the logic into the app instead.

---

### 2. Business logic (inside the `app/` folder)

This follows the **Next.js 15 app router structure**.

Each folder represents a page or feature, like a module.
Main folders:

- `breeds/` – Shows breed list and details
- `cats-gallery/` – Shows all cat images
- `favourites/` – Shows favorite images
- `user/` – Handles fake login
- `_api/` – Contains server actions

Each module can include:

- `_components/` – Components for that module's UI
- `_hooks/` – Hooks for that module's logic
- `_constants/` – Static values like API limits
- `@modal/` – Nested modal routes
- `default.tsx` – Used for parallel routes, more at [Parallel Routes](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes)
- `page.tsx` – The server-rendered page built using the module's components

These modules **can share logic with each other** if needed.
For example, a hook in `breeds/` can be used in `cats-gallery/`.

---

## 🧠 Best practices

- Keep the components as closer to where the going to be consumed, if lets say you have a list component an a list item those components should stay in the same file.
- Avoid create multiple files per component, and avoid creating a tiny component that contain only a small part of the UI.
- Don't create abstractions that hide too much logic and make the code feel like magic. It's better to repeat some steps than to leave developers wondering how a component works or why something behaves a certain way.
- If you feel that you need to write a comment, please do it, but make sure that describe something that is not obvious from the code, for example a bussiness logic desission.

---

## 👤 Fake authentication

Each user gets a unique ID when they visit:

- Stored in a cookie: `gwi-cats-__user`
- Also saved in `localStorage`

This allows both **server and client components** to access the user ID easily.
We use this to track and save favorite images per user.

---

## 🎨 Design & Tech Decisions

- ⚙️ **Next.js 15**: For its file-based routing and React Server Components
- 💨 **Tailwind CSS**: Fast, flexible styling with a big community
- 🧱 Custom UI components: We build our own instead of using external libraries
- 🌈 **Neo-brutalism** design: A bold, fun theme that matches the playful nature of cats
  Learn more here: [Neo-brutalism Design](https://blog.hubspot.com/website/neo-brutalism)

> We keep dependencies low we only install a package if it's truly needed.

---

## ⚡ Performance

- All pages are **server-rendered**
- **Next.js caching** is used to store API responses
- Pages load fast, especially when revisiting
- Perfect Lighthouse scores in:
- Performance
- Accessibility
- Best Practices
- SEO

  🗼![lighthouse](https://private-user-images.githubusercontent.com/47026269/463845929-fa195d59-57b6-4e65-a565-b8ff181d3149.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIwMDIwNTYsIm5iZiI6MTc1MjAwMTc1NiwicGF0aCI6Ii80NzAyNjI2OS80NjM4NDU5MjktZmExOTVkNTktNTdiNi00ZTY1LWE1NjUtYjhmZjE4MWQzMTQ5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzA4VDE5MDkxNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmV0dXJlPTRlNTcwMDY2MzBiYThlZTllZDY5NGRlY2FjYzlkODVjY2I1NjQxMWEwMWQ0NjMwODY2YmJkMDliNzFjNmQ0YzEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.2tBsFB2tw8MEEUMPUObma53bINPdDeh4_seseaChUZg)

---

## 🧭 Roadmap

- 🔐 Add real user authentication to maintain the favourites across browsers
- 👍 Add a voting system for cat images
- 🐶 Add support for a dog API too!

---
