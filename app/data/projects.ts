// Single source of truth for the portfolio's projects.
// The canvas (window cards) and the /work/[slug] detail pages both read from here.

export type Project = {
  slug: string;
  name: string;
  role: string;
  year: string;
  /** One line shown in the window titlebar / card subtitle. */
  oneLiner: string;
  /** Lead paragraph on the detail page. */
  summary: string;
  /** Body paragraphs on the detail page. */
  body: string[];
  tags: string[];
  stack: string[];
  externalLink?: string;
  externalLabel?: string;
  repo?: string;
  /** Small uppercase pill, e.g. "Founder" or "1st, Cursor". */
  badge?: string;
  /** Cover image (also the window preview). Lives in /public/work/. */
  cover: string;
  /** Extra images for the detail-page gallery. */
  gallery: string[];
  /** Label shown in the window titlebar (domain-like). */
  windowLabel: string;
  /** Whether the live site can be embedded in an iframe preview. Default true. */
  embeddable?: boolean;
};

export const projects: Project[] = [
  {
    slug: "tumai",
    name: "Tumai",
    role: "Founder & AI Engineer",
    year: "2025 to now",
    oneLiner: "From lot to payout, in one system",
    summary:
      "The operating system a modular home dealer in Texas runs their business on: the homes, the rent-to-own contracts, the collections, and the books of the private capital that funded the inventory.",
    body: [
      "A dealer buys a home, moves it onto a lot, sells it on a rent-to-own contract, collects for years, and pays back the private investors who funded the inventory. Before Tumai that lived across spreadsheets, folders and a bookkeeper. Now it is one system, from the purchase order to the investor payout.",
      "Rent collection, buyer messages, documents and reporting run on their own. The hard part is never the demo. It is making an autonomous system trustworthy enough to touch real money and real personal data. Every figure the dealer sees and every figure the investor sees comes off the same economics engine, reconciled to the cent, so the two are never in an argument about the numbers.",
      "It runs in production with paying customers, and the investor side accounts for millions in obligations.",
    ],
    tags: ["Real Estate AI", "WhatsApp Agents", "CRM Automation", "RAG"],
    stack: ["Claude", "Next.js", "TypeScript", "Supabase", "pgvector", "Langfuse"],
    externalLink: "https://tumai.tech/",
    externalLabel: "tumai.tech",
    badge: "Founder",
    cover: "/work/tumai-new.jpg",
    gallery: ["/work/tumai-new.jpg", "/work/tumai-2.jpg"],
    windowLabel: "tumai.tech",
  },
  {
    slug: "roomiescore",
    name: "RoomieScore",
    role: "Hackathon build",
    year: "2024",
    oneLiner: "AI roommate compatibility analyzer. First place at the Cursor Hackathon",
    summary:
      "An AI that turns living together into a game: score chores, compete with your roommates, and find out how compatible you really are. First place at the Cursor Hackathon.",
    body: [
      "RoomieScore analyzes roommate compatibility and gamifies the unglamorous side of shared living: chores, fairness, and who actually pulls their weight. Create a residence, invite your housemates, earn points, climb the leaderboard.",
      "Built end-to-end during the Cursor Hackathon and awarded first place. A fast, playful proof that agentic tooling can ship a polished, full-stack product in hours.",
    ],
    tags: ["React", "AI", "Vercel"],
    stack: ["React", "Next.js", "AI", "Vercel"],
    externalLink: "https://roomiescore.vercel.app/dashboard",
    externalLabel: "Open app",
    badge: "1st, Cursor",
    cover: "/work/roomiescore.jpg",
    gallery: ["/work/roomiescore.jpg"],
    windowLabel: "roomiescore.vercel.app",
  },
  {
    slug: "neuro-ad-analyzer",
    name: "Neuro Ad Analyzer",
    role: "Builder",
    year: "2024",
    oneLiner: "Marketing analysis where neuroscience meets machine learning",
    summary:
      "AI-driven marketing analysis that combines neuroscience and machine learning to predict how an ad will actually land, before you spend on it.",
    body: [
      "Neuro Ad Analyzer brings a neuroscience lens to advertising: it models attention, emotional response and recall to score creative, then layers ML on top to turn those signals into actionable feedback.",
      "It grew out of my neuroscience background, and the conviction that the most useful AI products are the ones grounded in how people actually perceive and decide.",
    ],
    tags: ["AI", "Analytics", "Neuroscience"],
    stack: ["Python", "ML", "Next.js", "Vercel"],
    externalLink: "https://neuro-retail-pro.vercel.app/",
    externalLabel: "Open app",
    cover: "/work/neuro-ad-analyzer.jpg",
    gallery: ["/work/neuro-ad-analyzer.jpg", "/work/neuro-ad-analyzer-2.jpg"],
    windowLabel: "neuro-retail-pro.vercel.app",
  },
  {
    slug: "neuropop",
    name: "NeuroPop",
    role: "Neuroscience and AI",
    year: "2025",
    oneLiner: "Interactive neuroscience you can touch, where brains and AI converge",
    summary:
      "An interactive neuroscience playground: complex brain phenomena that emerge from simple rules, and that AI rediscovers on its own. Each topic is an experiment you can touch, move and understand.",
    body: [
      "NeuroPop turns dense neuroscience into hands-on experiments. The first live module is grid cells, the brain's hexagonal 'GPS' for spatial navigation (Nobel 2014). Walk around a room and watch a hexagonal grid emerge that tells you where you are, the same structure an AI discovered on its own when trained to navigate.",
      "It's built around a thesis I care about: the most striking ideas in the brain emerge from simple rules, and deep learning keeps rediscovering the same solutions. More modules are on the way: Hopfield memory, dopamine and reward prediction, and the Libet free-will experiment.",
      "Grounded in my neuroscience background, and designed to make the intuition tactile rather than abstract.",
    ],
    tags: ["Neuroscience", "Interactive", "AI"],
    stack: ["Next.js", "TypeScript", "Interactive viz", "Vercel"],
    externalLink: "https://neurpop.space/",
    externalLabel: "Open NeuroPop",
    badge: "Neuroscience",
    cover: "/work/neuropop-new.jpg",
    gallery: ["/work/neuropop-new.jpg", "/work/emergent-grid-cells-2.jpg"],
    windowLabel: "neurpop.space",
  },
  {
    slug: "redae-capital",
    name: "REDAE Capital",
    role: "Client work, web design and build",
    year: "2024",
    oneLiner: "Corporate website for a private equity & real estate firm",
    summary:
      "Designed and built the corporate website for REDAE Capital, a private equity and real estate firm connecting investors between Latin America and Europe across luxury hospitality and residential developments in Spain.",
    body: [
      "A measured, editorial corporate site for an investor-facing brand: clear positioning, considered typography, and a tone that signals trust to capital partners on both sides of the Atlantic.",
      "Designed and developed end-to-end in Next.js, from layout and copy structure to deployment.",
    ],
    tags: ["Web Design", "Next.js", "Client Work"],
    stack: ["Next.js", "Design", "Vercel"],
    externalLink: "https://www.redaecapital.com/",
    externalLabel: "Visit site",
    badge: "Client Work",
    cover: "/work/redae-capital.jpg",
    gallery: ["/work/redae-capital.jpg", "/work/redae-capital-2.jpg"],
    windowLabel: "redaecapital.com",
  },
  {
    slug: "angel-match",
    name: "Angel Match",
    role: "Builder",
    year: "2025",
    oneLiner: "Find the angel investors that actually fit your company",
    summary:
      "A founder pastes their company's website, the app reads it, works out the sector and the stage, and ranks a base of verified angel investors from best fit to worst.",
    body: [
      "Raising is mostly a sorting problem. Most lists of investors are long and undifferentiated, so founders spend their time filtering instead of talking. Angel Match does the filtering: paste a URL, it reads the site from the server, infers sector and stage, and orders the base by fit. You review the result as cards and swipe.",
      "The part I care about is the validator. Every credential and every figure on a card has to appear literally in the source biography, or the row is discarded. I tested it by injecting lies on purpose, including lies that happen to be true but are not in the text, and it drops them. A card that cannot back a claim says nothing rather than guessing.",
      "It started as a tool for my own round and was then rebuilt as a product for any founder, with the parts written for my company stripped out of the data.",
    ],
    tags: ["Product", "Matching", "Data"],
    stack: ["JavaScript", "Vercel Functions", "Node"],
    externalLink: "https://angel-match.vercel.app/",
    externalLabel: "Open the app",
    cover: "/work/angel-match.jpg",
    gallery: ["/work/angel-match.jpg"],
    windowLabel: "angel-match.vercel.app",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
