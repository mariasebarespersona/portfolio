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

export const about = [
  "I did my Bachelor's and Master's in Neuroscience at UCL, the four-year integrated MSci. My thesis used optogenetics to work out how a mouse decides to move: switch a circuit on with light, watch what the animal does. I came out of it convinced the interesting question is the same on both sides of my career since. How does reliable behaviour come out of simple rules.",

  "Then three years at IBM as an AI Engineer, building an agentic Gen-AI assistant for a bank. I led the conversational logic: multi-turn context, input and output guardrails, and tool use for things like information extraction and authentication, on DSPy, LangGraph and the OpenAI Agents SDK, with fine-tuned small models and embeddings underneath. I shipped the production APIs it runs on, and trained the predictive models behind its spending insights. I was on it from the first proof of concept and in front of the client the whole way, through fortnightly playbacks. The account carried over £5M of contract value across five quarters.",

  "Now I run Tumai. It is the operating system a modular home dealer in Texas runs their business on: the homes, the rent-to-own contracts, the collections, and the books of the private capital that funded the inventory, in one system. The hard part is never the demo. It is making an autonomous system trustworthy enough to touch real money and real personal data, and reconciling every figure it shows to the cent.",
];

/** NeuroPop gets its own block in the panel: it is the thread back to where she
 *  started, and the one place she is asking for people rather than clients. */
export const neuropop = {
  lead:
    "Alongside that I build NeuroPop, which is where the neuroscience comes back.",
  body:
    "Each piece takes one brain condition and turns the research into something a person can actually pick up and use. Hemispace, for the spatial neglect that can follow a stroke, when half the world stops being noticed. NeuroTune, for affective aprosodia, when the music goes out of speech and emotion stops carrying. And a playable module on the hexagonal map the brain draws to know where it is. Three built so far, on their way to being a neurotech venture studio.",
  ask:
    "This is the part I would most like company on. If you are a clinician, a speech and language therapist, a neuropsychologist, a researcher, or someone living with one of these conditions, I want to hear from you.",
} as const;


export const EMAIL = "mariasebares9@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/maria-sebares9";

export const domain = (p: Project) =>
  p.externalLink ? new URL(p.externalLink).hostname.replace(/^www\./, "") : "";
