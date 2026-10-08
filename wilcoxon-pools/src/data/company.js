/*
 * ALL COMPANY FACTS LIVE IN THIS FILE.
 *
 * Facts below came from public business listings (Yellow Pages, BBB, Angi,
 * ZoomInfo, Yelp). The Google Business link could not be opened while this
 * site was built, so please check every item against the Google listing.
 *
 * Anything marked "PLACEHOLDER" is missing info. Fill it in before launch.
 */

// Turn this off once real photos and real reviews are added.
// When on, the site shows small "placeholder" tags so nothing looks fake.
export const SHOW_PLACEHOLDER_NOTES = true

export const company = {
  name: 'Wilcoxon Construction',
  legalName: 'Wilcoxon Construction, LLC',
  phone: '(301) 340-6393',
  phoneHref: 'tel:+13013406393',
  email: '', // PLACEHOLDER: add the company email (leave blank to hide it)
  street: '15120 Southlawn Ln, Suite A',
  city: 'Rockville',
  state: 'MD',
  zip: '20850',
  // Listings say the company has worked on pools since 1973. Please confirm.
  since: 1973,
  hours: 'PLACEHOLDER: Add business hours from Google',
  website: 'https://www.wilcoxonpools.com',
  googleUrl: 'https://share.google/VDF9ydcr2llrJDeWP',
  // Areas the company lists for its pool work.
  serviceAreas: ['Maryland', 'Virginia', 'Washington, D.C.', 'West Virginia', 'Delaware'],
  // Groups the company says it belongs to. Please confirm these are current.
  memberships: ['Association of Pool & Spa Professionals', 'American Concrete Institute'],
}

export const fullAddress = `${company.street}, ${company.city}, ${company.state} ${company.zip}`

export const yearsInBusiness = new Date().getFullYear() - company.since

/*
 * Services. Only items with `offered: true` show on the site.
 * Listings confirm: pool building and renovation (homes and businesses),
 * plaster, tile, coping, decks, and repairs.
 * "Pool Design" and "Outdoor Living Spaces" are NOT confirmed yet.
 * Set them to true only if the company really offers them.
 */
export const services = [
  {
    id: 'construction',
    offered: true,
    icon: 'Hammer',
    title: 'Custom Pool Building',
    text: 'We build new pools for homes and businesses. We plan it with you, dig it, and build it to last.',
    points: ['Home and business pools', 'Built strong, built right', 'One team from start to finish'],
  },
  {
    id: 'remodeling',
    offered: true,
    icon: 'Sparkles',
    title: 'Pool Remodeling',
    text: 'Is your pool old or worn out? We can make it look new again with fresh plaster, tile, and coping.',
    points: ['New plaster finish', 'New waterline tile', 'New coping (the edge of the pool)'],
  },
  {
    id: 'repairs',
    offered: true,
    icon: 'Wrench',
    title: 'Pool Repairs',
    text: 'Cracks, chips, and loose tiles can get worse fast. We find the problem and fix it the right way.',
    points: ['Crack and wall repair', 'Tile and coping repair', 'Plaster patching'],
  },
  {
    id: 'decks',
    offered: true,
    icon: 'LayoutGrid',
    title: 'Pool Decks',
    text: 'The deck is the space around your pool. We build and fix decks that look great and are safe to walk on.',
    points: ['New pool decks', 'Deck repair', 'Clean, safe surfaces'],
  },
  {
    id: 'design',
    offered: false, // PLACEHOLDER: confirm before turning on
    icon: 'PencilRuler',
    title: 'Pool Design',
    text: 'We help you pick the shape, size, and finish that fits your yard and your budget.',
    points: ['Shape and size', 'Finish and color', 'Fits your budget'],
  },
  {
    id: 'outdoor',
    offered: false, // PLACEHOLDER: confirm before turning on
    icon: 'Trees',
    title: 'Outdoor Living Spaces',
    text: 'Make your whole backyard a place to relax, with patios and spaces to sit, eat, and have fun.',
    points: ['Patios', 'Seating areas', 'Backyard upgrades'],
  },
]

/*
 * Gallery photos. These are STOCK photos for now (not Wilcoxon projects).
 * Swap each `src` for a real project photo, then set `stock: false`.
 */
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

export const heroImage = u('photo-1613490493576-7fde63acd811', 2000)
export const aboutImage = u('photo-1600585154340-be6161a56a0c', 1200)

export const gallery = [
  { src: u('photo-1576013551627-0cc20b96c2a7'), alt: 'Bright blue backyard swimming pool', tag: 'New Pool', stock: true },
  { src: u('photo-1564013799919-ab600027ffc6'), alt: 'Home with a large pool and patio', tag: 'New Pool', stock: true },
  { src: u('photo-1572331165267-854da2b10ccc'), alt: 'Clear pool water on a sunny day', tag: 'Remodel', stock: true },
  { src: u('photo-1600596542815-ffad4c1539a9'), alt: 'Modern home with a pool at dusk', tag: 'New Pool', stock: true },
  { src: u('photo-1512917774080-9991f1c4c750'), alt: 'Luxury home with a long pool', tag: 'New Pool', stock: true },
  { src: u('photo-1582268611958-ebfd161ef9cf'), alt: 'Resort-style pool with lounge chairs', tag: 'Business Pool', stock: true },
]

// Before-and-after photos. PLACEHOLDER: add a real pair from a past job.
export const beforeAfter = {
  before: u('photo-1562778612-e1e0cda9915c'),
  after: u('photo-1575429198097-0414ec08e8cd'),
  caption: 'PLACEHOLDER: Add a real before-and-after pair from one of your jobs.',
  stock: true,
}

/*
 * Reviews. NEVER make these up.
 * Copy real reviews from the Google listing, word for word, with the
 * reviewer's first name and the star count. Until then, the site shows
 * clearly marked empty cards and a link to the Google listing.
 */
export const reviews = [
  // Example of the format to use:
  // { name: 'First name L.', stars: 5, date: 'Month Year', text: 'Exact words from Google.' },
]

export const faqs = [
  {
    q: 'How do I get a free quote?',
    a: `Call us at ${company.phone} or fill out the form on this page. Tell us about your pool or your plans. We will get back to you to talk about your project.`,
  },
  {
    q: 'Do you work on home pools and business pools?',
    a: 'Yes. We work on pools at homes and at businesses, like swim clubs, gyms, and community pools.',
  },
  {
    q: 'Where do you work?',
    a: `Our office is in ${company.city}, ${company.state}. We do pool work in ${company.serviceAreas.slice(0, -1).join(', ')}, and ${company.serviceAreas.at(-1)}.`,
  },
  {
    q: 'My pool is old. Do I need a whole new pool?',
    a: 'Not always. Many old pools just need new plaster, tile, or coping. We can look at your pool and tell you what it really needs.',
  },
  {
    q: 'What is pool plaster?',
    a: 'Plaster is the smooth layer on the inside of a concrete pool. Over time it can get rough, stained, or cracked. New plaster makes the pool feel smooth and look clean again.',
  },
  {
    q: 'What is coping?',
    a: 'Coping is the stone or concrete edge around the top of your pool. It keeps water out of the walls and gives you a safe place to hold on.',
  },
  {
    q: 'How long does a project take?',
    a: 'It depends on the job. A small repair is much faster than a new pool. We will give you a time plan when we give you your quote.',
  },
]
