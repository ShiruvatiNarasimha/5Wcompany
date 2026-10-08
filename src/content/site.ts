/**
 * Site content — every word on the page lives here, so copy can be edited
 * without touching layout code.
 *
 * Provenance: the current site (5wcompany.com) could not be reached while this
 * redesign was built, so the copy is derived only from the company's name and
 * the five questions it stands for. It deliberately contains no customers,
 * metrics, testimonials, awards or other claims that would need evidence.
 *
 * Anything marked `CONFIRM` must be checked by the 5W team before launch.
 */

export type Question = {
  /** Anchor id, also used by the hero index and the brief. */
  id: "who" | "what" | "when" | "where" | "why";
  n: string;
  word: string;
  question: string;
  /** What goes wrong when the question is skipped (Approach section). */
  unasked: string;
  /** How the question is worked through (Method section). */
  body: string;
  /** What a good answer produces (Method + Brief). */
  outcome: string;
};

export const questions: readonly Question[] = [
  {
    id: "who",
    n: "01",
    word: "Who",
    question: "Who is it for?",
    unasked: "The audience is assumed.",
    body: "Every decision gets easier once you know exactly who it serves. We name the people involved\u00a0— the ones who will use it, pay for it and approve it\u00a0— and what each of them actually needs.",
    outcome: "A named audience, and the need behind it.",
  },
  {
    id: "what",
    n: "02",
    word: "What",
    question: "What are we solving?",
    unasked: "The problem is never pinned down.",
    body: "We separate the problem from the solutions already crowding around it, then state it plainly enough that anyone on the team could repeat it word for word.",
    outcome: "One problem, stated in a single sentence.",
  },
  {
    id: "when",
    n: "03",
    word: "When",
    question: "When does it matter?",
    unasked: "The timeline is wishful.",
    body: "Timing decides what has to exist first, what can wait and what a deadline is really protecting. We sequence the work around it, not around the calendar.",
    outcome: "A sequence, with the first milestone fixed.",
  },
  {
    id: "where",
    n: "04",
    word: "Where",
    question: "Where will it live?",
    unasked: "The context is ignored.",
    body: "Nothing works in a vacuum. We map the context it has to fit into\u00a0— the people, systems, channels and constraints that are already in place.",
    outcome: "A clear map of context and constraints.",
  },
  {
    id: "why",
    n: "05",
    word: "Why",
    question: "Why does it matter?",
    unasked: "The reason goes unsaid.",
    body: "The last question holds the other four together. We agree on why the work is worth doing, and on how everyone will know that it worked.",
    outcome: "A shared reason, and a measure of success.",
  },
];

export const site = {
  name: "5W Company",
  url: "https://www.5wcompany.com",
  /** CONFIRM: replace with the real inbox before launch. */
  email: "hello@5wcompany.com",
  tagline: "Who, what, when, where, why.",
  description:
    "5W Company answers five questions\u00a0— who, what, when, where and why\u00a0— before anything is made, so that everything it makes has a reason to exist.",

  nav: [
    { label: "Approach", href: "#approach" },
    { label: "Method", href: "#method" },
    { label: "Principles", href: "#principles" },
    { label: "The brief", href: "#brief" },
  ],
  cta: { label: "Start a conversation", href: "#contact" },

  hero: {
    eyebrow: "Who · What · When · Where · Why",
    headline: "Clarity is the first thing we build.",
    // CONFIRM: positioning statement — replace with 5W's own description.
    lede: "5W Company is named for the five questions behind every sound decision. We answer all five before we make anything\u00a0— so that everything we make has a reason to exist.",
    secondary: { label: "How we work", href: "#method" },
    indexLabel: "The five questions",
  },

  approach: {
    label: "Approach",
    aside: "Why questions come first",
    leadIn: "Most work doesn’t fail in the making.",
    statement: "It fails in the asking.",
    body: [
      "Teams move quickly toward answers they never questioned. The gaps don’t show at the start. They show later, when changing course is slow and expensive.",
      "Asking five plain questions early, and writing the answers down, is the least expensive work in any project. It is also the work most often skipped.",
    ],
    tableHeads: ["Question", "When it goes unasked"] as const,
  },

  method: {
    label: "Method",
    aside: "Five questions, in order",
    title: "Five questions, answered in order.",
    lede: "Each question narrows the one before it. Together they turn an open idea into something specific enough to build\u00a0— and to judge.",
    outcomeLabel: "Outcome",
  },

  principles: {
    label: "Principles",
    aside: "Four rules",
    title: "The rules we work by.",
    items: [
      {
        title: "Questions before answers.",
        body: "Nothing is proposed until all five questions have written answers. The first stretch of any work is spent understanding, not producing.",
      },
      {
        title: "Written, not assumed.",
        body: "Every answer is written down in plain language, where everyone can see it. If it can’t be written clearly, it isn’t understood yet.",
      },
      {
        title: "Fewer, better things.",
        body: "A clear why makes it easy to say no. We would rather do less, and do it properly, than spread attention thin.",
      },
      {
        title: "Every decision has a reason.",
        body: "Anything we make can be traced back to one of the five answers. If it can’t, it doesn’t belong.",
      },
    ],
  },

  brief: {
    label: "The brief",
    aside: "One page",
    title: "Everything starts on one page.",
    lede: "The five answers become a single brief: short enough to read in a few minutes, specific enough to settle a disagreement. It’s the first thing we make, and every later decision is checked against it.",
    points: [
      "Written in plain language",
      "Agreed before work begins",
      "Revisited whenever a decision is hard",
    ],
    document: {
      kicker: "Brief",
      meta: "1 page",
      title: "Project brief",
      subtitle: "Five answers, agreed before work begins.",
      footer: "Every later decision is checked against this page.",
    },
  },

  contact: {
    label: "Contact",
    aside: "Start here",
    title: "Start with the questions.",
    lede: "Tell us what you’re working on. We’ll begin where we always do\u00a0— with who, what, when, where and why.",
    primary: "Email us",
    copy: { idle: "Copy", done: "Copied" },
  },

  footer: {
    backToTop: "Back to top",
  },
} as const;
