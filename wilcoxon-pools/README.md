# Wilcoxon Construction — Website

A one-page website for Wilcoxon Construction, a swimming pool company in Rockville, MD.
Built with **React 19**, **Vite**, and **Tailwind CSS v4**.

## Run it

```bash
cd wilcoxon-pools
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production files go to dist/
```

Upload the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, or a normal web host).

## Sections

Sticky top menu · Home (hero + "Get a Free Quote") · About Us · Our Services · How It Works ·
Our Work (photo gallery with lightbox + before/after slider) · Customer Reviews · FAQ ·
Contact (form, phone, service areas, hours, Google Map) · Footer.
On phones, a bar at the bottom of the screen always shows **Call Now** and **Free Estimate**.

## Where the facts came from

The Google Business link could not be opened while this site was built. The facts come
from public listings (Yellow Pages, BBB, Angi, ZoomInfo, Yelp):

| Fact | Value used | Check it |
|---|---|---|
| Phone | (301) 340-6393 | Yes |
| Address | 15120 Southlawn Ln, Suite A, Rockville, MD 20850 | Yes |
| Started | 1973 (one listing suggests a different year) | **Yes** |
| Service areas | MD, VA, DC, WV, DE | Yes |
| Services | Pool building and renovation for homes and businesses; plaster, tile, coping, decks, repairs | Yes |
| Memberships | Association of Pool & Spa Professionals, American Concrete Institute | Yes |

**All company facts are in one file: `src/data/company.js`.** Edit that file to change the
text, services, photos, reviews, and FAQ.

## Before you launch — to-do list

1. **Reviews.** No reviews are shown yet, because we never make them up. Copy real
   Google reviews into the `reviews` list in `src/data/company.js`, word for word.
2. **Photos.** Gallery, hero, about, and before/after images are **stock photos** from
   Unsplash. Swap in real Wilcoxon project photos (put them in `public/photos/` and use
   paths like `/photos/pool-1.jpg`), then set `stock: false`.
3. **Hours and email.** Fill in `hours` and `email` in `src/data/company.js`.
4. **Pool Design & Outdoor Living.** These two services are written but turned **off**
   (`offered: false`), because the listings do not say the company offers them. Turn
   them on only if they are real.
5. **Turn off placeholder tags.** Once steps 1–3 are done, set
   `SHOW_PLACEHOLDER_NOTES = false` at the top of `src/data/company.js`.
6. **Domain.** `index.html`, `public/robots.txt`, and `public/sitemap.xml` use
   `https://www.wilcoxonpools.com`. Change it if the site will live somewhere else.

## Connect the contact form

The form checks the fields and then sends a JSON `POST` to the address in
`VITE_FORM_ENDPOINT`. Easiest free option:

1. Make a free account at [formspree.io](https://formspree.io) and create a form.
   Set it to email the company inbox.
2. Copy `.env.example` to `.env` and paste the form URL:
   `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx`
3. Run `npm run build` again (or set the same variable in your host's settings).

Until this is set, pressing **Send** shows a friendly note asking the visitor to call
(301) 340-6393, so no lead is lost without anyone knowing. A hidden "honeypot" field
blocks simple spam bots.

## SEO built in

- Page title, description, keywords, canonical link, Open Graph and Twitter tags
- `HomeAndConstructionBusiness` structured data (name, phone, address, areas, services)
- `FAQPage` structured data from the FAQ section
- `robots.txt` and `sitemap.xml`
- Real headings in order, alt text on images, fast lazy-loaded photos

**Tip:** Make sure the name, address, and phone on the site match the Google Business
listing exactly. That helps the company show up in local Google searches.
