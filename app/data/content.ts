// One copy deck, shared by all three lab directions.
// Isolating the variable: the words are identical in a/b/c, so the only
// thing being judged is structure and motion.

import { projects, type Project } from "./projects";

export const NAME = "María Sebares";

export const ROLE = "AI Engineer and Founder";

/** 19 words. Hero subtext cap is 20. */
export const LEAD =
  "I build AI agents that run real operations, with paying customers in production across the US and Spain.";

/** Three that carry the story, three that show range. */
export const MAJOR = ["tumai", "madrid", "neuropop"] as const;
export const MINOR = ["angel-match", "roomiescore", "neuro-ad-analyzer", "redae-capital"] as const;
export const ORDER = [...MAJOR, ...MINOR] as const;

/** The Madrid investor product has no public name, URL or screenshot yet, so
 *  it is not in projects.ts and its card is deliberately image-free. The
 *  client is not named here until they say yes. */
export const pending = {
  slug: "madrid",
  name: "Investor portal for fund managers",
  role: "Founder",
  year: "2025",
  note: "Name not public yet",
  outcome:
    "Live with its first client, a Madrid real estate fund manager. Every investor opens it and sees their own position, the economics of each deal and their paperwork, current to the day, without anyone assembling a spreadsheet to answer them.",
} as const;

export const work: Project[] = ORDER.map(
  (slug) => projects.find((p) => p.slug === slug)
).filter(Boolean) as Project[];

export const major: Project[] = MAJOR.map(
  (slug) => projects.find((p) => p.slug === slug)
).filter(Boolean) as Project[];

export const minor: Project[] = MINOR.map(
  (slug) => projects.find((p) => p.slug === slug)
).filter(Boolean) as Project[];

/** Short evidence line per project, for the directions that show one. */
export const evidence: Record<string, string> = {
  tumai: "Paying customers",
  neuropop: "Three tools live",
  roomiescore: "1st, Cursor Hackathon",
  "neuro-ad-analyzer": "Deployed",
  "redae-capital": "Client work",
  "angel-match": "Live",
};

/** What it achieved, which is what the panel leads with. Nothing here is a
 *  number she cannot stand behind. */
export const outcome: Record<string, string> = {
  tumai:
    "From lot to payout, in one system. A modular home dealer in Texas runs their whole operation on it: the homes, the rent-to-own contracts, the collections, and the books of the private capital that funded the inventory. Millions in investor obligations reconcile through a single engine, so the dealer and the investor are never looking at different numbers.",
  roomiescore:
    "First place at the Cursor Hackathon, built end to end during the event.",
  neuropop:
    "Three built tools under one argument: what AI worked out about the brain on its own, and what that gives back to people who have lost those abilities. The hexagonal GPS is live and playable, alongside Hemispace for spatial neglect and NeuroTune. On its way to being a neurotech venture studio.",
  "neuro-ad-analyzer":
    "Deployed and open to try. It scores a piece of creative for attention, emotional response and recall before any money goes into it.",
  "redae-capital":
    "Live at redaecapital.com. The investor-facing site of a private equity and real estate firm working between Latin America and Europe.",
  "angel-match":
    "Paste your company's website and it reads it, works out your sector and stage, and ranks a base of verified angel investors by fit. Every credential on a card has to appear literally in the source, or the row is dropped.",
};

/** Straight from the CV. Nothing here is rounded up or invented. */
export const facts: [string, string][] = [
  ["Education", "MSci Neuroscience, UCL"],
  ["Thesis", "Optogenetics and motor behaviour"],
  ["Previously", "AI Engineer at IBM"],
  ["Contract value carried", "£5M+ over 5 quarters"],
  ["Award", "Datathon Winner 2024, IBM"],
  ["Based in", "SF / Madrid"],
  ["Nationality", "Spanish and British"],
  ["Languages", "EN, ES, FR"],
];



export const EMAIL = "mariasebares9@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/maria-sebares9";

export const domain = (p: Project) =>
  p.externalLink ? new URL(p.externalLink).hostname.replace(/^www\./, "") : "";


/* ---------------------------------------------------------------------------
   The about section, restructured. A founder who is raising does not open with
   2018: what she is doing now comes first, the path second.
   --------------------------------------------------------------------------- */

export const tracks = [
  {
    lane: "The company",
    title: "Tumai",
    status: "Raising an angel round",
    body: "A B2B startup. The operating system a modular home dealer in Texas runs their business on: the homes, the rent-to-own contracts, the collections, and the books of the private capital that funded the inventory. Paying customers, in production.",
    ask: "Open to angels who know vertical software, US SMB operations, or the private credit side of it.",
  },
  {
    lane: "The other one",
    title: "NeuroPop",
    status: "Open to collaborations",
    body: "Three built tools that take one brain condition each and turn the research into something a person can pick up and use. Spatial neglect after a stroke, affective aprosodia, and the hexagonal map the brain draws to know where it is.",
    ask: "I want company on this: clinicians, speech and language therapists, neuropsychologists, researchers, or people living with these conditions.",
  },
] as const;

export const path = [
  {
    when: "2018 to 2022",
    what: "MSci Neuroscience, UCL",
    body: "The four-year integrated Bachelor's and Master's. My thesis used optogenetics to work out how a mouse decides to move.",
  },
  {
    when: "2022 to 2025",
    what: "AI Engineer, IBM",
    body: "An agentic Gen-AI assistant for a bank. I led the conversational logic: multi-turn context, input and output guardrails, tool use, on DSPy, LangGraph and the OpenAI Agents SDK. The account carried over £5M of contract value across five quarters.",
  },
] as const;
