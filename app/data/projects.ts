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
  /** Small uppercase pill, e.g. "Founder" or "1st · Cursor". */
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
    year: "2024 — now",
    oneLiner: "Agentic AI for real estate, live in the US & Spain",
    summary:
      "AI agents that automate real estate operations end-to-end — running over WhatsApp and plugged straight into the client's CRM, with paying customers in production across the US and Spain.",
    body: [
      "Tumai turns a real estate operator's spreadsheets and folders into a living investor portal and a WhatsApp agent that answers, in their own language, about each deal — economics, documents and the evolution of every operation.",
      "Rent collection, tenant comms, property evaluation and reporting run on autopilot. The hard part isn't the demo — it's making autonomous agents reliable enough to touch real money and real PII. Every figure the agent or the portal shows is reconciled to the cent against a single economics engine, so the numbers always match.",
      "Built as a composable platform: a catalog of automations, a runtime that executes them, and an investor-facing product on top. Production clients depend on it daily.",
    ],
    tags: ["Real Estate AI", "WhatsApp Agents", "CRM Automation", "RAG"],
    stack: ["Claude", "Next.js", "TypeScript", "Supabase", "pgvector", "Langfuse"],
    externalLink: "https://tumai.tech/",
    externalLabel: "tumai.tech",
    badge: "Founder",
    cover: "/work/tumai.jpg",
    gallery: ["/work/tumai.jpg", "/work/tumai-2.jpg"],
    windowLabel: "tumai.tech",
  },
  {
    slug: "roomiescore",
    name: "RoomieScore",
    role: "Builder · Hackathon",
    year: "2024",
    oneLiner: "AI roommate compatibility analyzer — 1st place, Cursor Hackathon",
    summary:
      "An AI that turns living together into a game: score chores, compete with your roommates, and find out how compatible you really are. First place at the Cursor Hackathon.",
    body: [
      "RoomieScore analyzes roommate compatibility and gamifies the unglamorous side of shared living — chores, fairness, and who actually pulls their weight. Create a residence, invite your housemates, earn points, climb the leaderboard.",
      "Built end-to-end during the Cursor Hackathon and awarded first place. A fast, playful proof that agentic tooling can ship a polished, full-stack product in hours.",
    ],
    tags: ["React", "AI", "Vercel"],
    stack: ["React", "Next.js", "AI", "Vercel"],
    externalLink: "https://roomiescore.vercel.app/dashboard",
    externalLabel: "Open app",
    badge: "1st · Cursor",
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
      "AI-driven marketing analysis that combines neuroscience and machine learning to predict how an ad will actually land — before you spend on it.",
    body: [
      "Neuro Ad Analyzer brings a neuroscience lens to advertising: it models attention, emotional response and recall to score creative, then layers ML on top to turn those signals into actionable feedback.",
      "It grew out of my neuroscience background — the conviction that the most useful AI products are the ones grounded in how people actually perceive and decide.",
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
    role: "Builder · Neuroscience × AI",
    year: "2025",
    oneLiner: "Interactive neuroscience you can touch — where brains and AI converge",
    summary:
      "An interactive neuroscience playground: complex brain phenomena that emerge from simple rules — and that AI rediscovers on its own. Each topic is an experiment you can touch, move and understand.",
    body: [
      "NeuroPop turns dense neuroscience into hands-on experiments. The first live module is grid cells — the brain's hexagonal 'GPS' for spatial navigation (Nobel 2014). Walk around a room and watch a hexagonal grid emerge that tells you where you are — the same structure an AI discovered on its own when trained to navigate.",
      "It's built around a thesis I care about: the most striking ideas in the brain emerge from simple rules, and deep learning keeps rediscovering the same solutions. More modules are on the way — Hopfield memory, dopamine and reward prediction, and the Libet free-will experiment.",
      "Grounded in my neuroscience background, and designed to make the intuition tactile rather than abstract.",
    ],
    tags: ["Neuroscience", "Interactive", "AI"],
    stack: ["Next.js", "TypeScript", "Interactive viz", "Vercel"],
    externalLink: "https://emergencia-grid-cells.vercel.app/",
    externalLabel: "Open NeuroPop",
    badge: "Neuroscience",
    cover: "/work/emergent-grid-cells.jpg",
    gallery: ["/work/emergent-grid-cells.jpg", "/work/emergent-grid-cells-2.jpg"],
    windowLabel: "emergencia-grid-cells.vercel.app",
  },
  {
    slug: "redae-capital",
    name: "REDAE Capital",
    role: "Web design & build · Client work",
    year: "2024",
    oneLiner: "Corporate website for a private equity & real estate firm",
    summary:
      "Designed and built the corporate website for REDAE Capital — a private equity and real estate firm connecting investors between Latin America and Europe across luxury hospitality and residential developments in Spain.",
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
