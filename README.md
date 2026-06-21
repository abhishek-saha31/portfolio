# Abhishek Saha — Portfolio (Next.js + Tailwind + Framer Motion)

A dynamic, animated portfolio built with the Next.js App Router, Tailwind CSS, and
Framer Motion. All your content lives in **one file** and all images load from a simple
**public/images** folder — you never touch the component code.

---

## Quick start

You need **Node.js 18.17+** installed (get it at https://nodejs.org).

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server
```

Then open **http://localhost:3000** in your browser. Edits show up live.

When you're ready to publish:
```bash
npm run build      # production build
npm start          # run the production server
```

---

## Where to edit your content

Open **`lib/content.ts`** — everything is there: your name, email, social links, the
Web3Forms key, experience, research stats, projects, certifications, academy, and the
photo list. Edit the text, save, and the site updates. No other code needs touching.

---

## Where to put images and your CV

Drop files into **`public/`**, keeping the exact filenames:

```
public/
├── cv.pdf                         ← YOUR CV (enables all 3 download buttons)
└── images/
    ├── portrait.jpg               ← YOUR hero photo (vertical, ~900×1100)
    ├── photos/
    │   ├── photo1.jpg ... photo8.jpg   ← gallery (mixed orientations)
    └── projects/
        ├── pd1.jpg ... pd4.jpg    ← Plumbing Machine slider
        ├── iot1.jpg ... iot4.jpg  ← Smart IoT Ammonia slider
        └── sw1.jpg ... sw4.jpg    ← SolidWorks slider
```

**Important:** all images must be `.jpg`. If a file is `.jpeg`, rename it to `.jpg`
(in Windows: View tab → tick "File name extensions" → right-click → Rename).

**Want a different number of slides in a project?** In `lib/content.ts`, change the
`count` value for that project (e.g. `count: 3`) and provide that many images.

---

## Turn on the contact form (2 minutes)

1. Go to **https://web3forms.com**, enter your email, get a free **Access Key**.
2. Open `lib/content.ts`, find `web3formsKey: "YOUR_WEB3FORMS_KEY"`, and paste your key.

Messages from the form then arrive in your inbox.

---

## Publishing (free)

The easiest host for Next.js is **Vercel** (made by the Next.js team):

1. Push this folder to a GitHub repo (or use the Vercel CLI).
2. Go to https://vercel.com, "Add New Project", import the repo.
3. Click Deploy. Done — you get a live URL, and fonts/images/form all work.

Alternatively, **Netlify** also supports Next.js with zero config.

> Note: because this uses `next/font/google`, the **build needs internet access** to fetch
> the fonts (Vercel/Netlify have this automatically). That's why it must be built on your
> machine or a host — not opened as a static file.

---

## Project structure (for reference)

```
app/
├── layout.tsx        fonts + metadata
├── page.tsx          assembles all sections
└── globals.css       base styles, grid + noise background
components/            one file per section + Cursor, Nav, sliders, Reveal
lib/content.ts         ← YOUR CONTENT
public/images/         ← YOUR IMAGES
```

## Customizing colors

The palette (dark base + signal-orange) is in `tailwind.config.ts` under
`theme.extend.colors`. Change `signal` to swap the accent everywhere.
