import { siteConfig } from "@/config/site";
import knowledge from "@/generated/policy-knowledge.json";
import { priceTables } from "@/lib/guide";

/**
 * Answers customer questions from the Hotzonex Customer Service Guide
 * (doc/Hotzonex_policy.pdf), pre-split into chunks by scripts/build-knowledge.mjs.
 *
 * Answers are always the guide's own wording, so the assistant cannot invent a
 * policy or price. Anything the guide does not cover gets a polite referral to
 * the support team instead of a best guess.
 */

type Chunk = (typeof knowledge.chunks)[number];

export type AssistantReply = {
  answer: string;
  /** Where in the guide the answer came from; null for greetings and referrals. */
  source: string | null;
  suggestions: string[];
};

const PHONE = siteConfig.contact.phone;

const OUT_OF_SCOPE =
  `Thank you for your question. I can only answer questions covered in the Hotzonex Wi-Fi Customer Service Guide — ` +
  `voucher prices, Wi-Fi networks, opening hours, service policies and support. For anything else, our team will be ` +
  `glad to help: call or message ${PHONE}, or visit your nearest Hotzonex office.`;

const CAPABILITIES =
  "I am the Hotzonex Wi-Fi assistant. I answer questions from our Customer Service Guide: voucher prices at each " +
  "location, which network to join, opening hours, service policies, refunds, and troubleshooting.";

// ---------------------------------------------------------------------------
// Text normalisation. Queries and the guide go through the same pipeline, so a
// synonym only has to be listed once to match in both directions.
// ---------------------------------------------------------------------------

const PHRASES: Array<[RegExp, string]> = [
  [/\bhow much\b/g, " price "],
  [/\bwhat time\b/g, " hour "],
  [/\bget (a |my |the |some )?(voucher|code|package)s?\b/g, " buy voucher "],
  [/\bmoney back\b/g, " refund "],
  [/\b(phone|telephone|mobile|contact|whatsapp|support) (number|line|no)\b/g, " contact "],
  // "Always on" in its various spellings, kept apart from the 24-hour voucher.
  [/\b(24 ?hours? a day|24 ?\/ ?7|round the clock|all night)\b/g, " allday "],
  // Installed connections for premises, as opposed to hotspot vouchers.
  [/\b(home|house|office|business|shop|compound)s? (internet|wi-?fi|network|connection|connectivity)\b/g, " premises home "],
  [/\b(internet|wi-?fi|network) (for|at|in) (my |our |a )?(home|house|office|business|shop|compound)s?\b/g, " premises home "],
  [/\bwi-?fi\b/g, " network "],
  [/\b5 ?ghz\b/g, " 5g "],
  [/\b(get|getting|go|going) online\b/g, " connect "],
  [/\bset ?up\b/g, " install "],
  [/\b(log|sign) ?in\b/g, " login "],
  [/\b(mobile money|m-?gurush|m-?pesa)\b/g, " currency "],
];

/** Office names people shorten: "head office" is the Jebel-Iraq Head Office. */
const EXPANSIONS: Record<string, string[]> = {
  head: ["jebel", "iraq"],
  sub: ["jebel", "iraq"],
};

const SYNONYMS: Record<string, string> = {
  cost: "price", costs: "price", fee: "price", fees: "price", charge: "price", charges: "price",
  rate: "price", rates: "price", tariff: "price", priced: "price", expensive: "price",
  cheap: "price", cheaper: "price", cheapest: "price", afford: "price", affordable: "price",
  wifi: "network", internet: "network", ssid: "network", networks: "network",
  phone: "device", phones: "device", laptop: "device", laptops: "device", computer: "device",
  computers: "device", tablet: "device", tablets: "device", mobile: "device", smartphone: "device",
  pc: "device", iphone: "device", android: "device",
  office: "location", offices: "location", branch: "location", branches: "location",
  located: "location", place: "location", juba: "location", address: "location",
  lost: "lose", losing: "lose", stolen: "lose", missing: "lose", misplaced: "lose",
  forgot: "forget", forgotten: "forget",
  slower: "slow", lag: "slow", lagging: "slow", buffering: "slow", speed: "slow",
  sharing: "share", shared: "share",
  youtube: "stream", netflix: "stream", tiktok: "stream", video: "stream", videos: "stream",
  movie: "stream", movies: "stream", watch: "stream", streaming: "stream",
  zoom: "meeting", teams: "meeting", conference: "meeting",
  secure: "safe", security: "safe", safety: "safe", trusted: "safe", trust: "safe",
  history: "privacy", tracking: "privacy", track: "privacy", logs: "privacy", records: "privacy", spy: "privacy",
  data: "privacy", private: "privacy",
  // Kept apart from "connect", which a six-letter stem would otherwise merge it with.
  connectivity: "premises",
  tech: "technical", techie: "technical", technician: "technical",
  call: "contact", calls: "contact", reach: "contact", whatsapp: "contact", hotline: "contact",
  printing: "print", printer: "print", photocopy: "print", photocopying: "print", scan: "print", scanning: "print",
  satellite: "starlink", dish: "starlink", routeros: "mikrotik",
  promo: "discount", promotion: "discount", deal: "discount", deals: "discount", coupon: "discount",
  weekly: "week", weeks: "week", daily: "day", days: "day", night: "allday", overnight: "allday",
  pause: "continuous", paused: "continuous", pauses: "continuous", stop: "continuous", stops: "continuous",
  stopped: "continuous", freeze: "continuous", continuously: "continuous",
  currency: "currency", dollar: "currency", dollars: "currency", usd: "currency", cash: "currency",
  pounds: "currency", money: "currency",
  free: "prepaid",
  rule: "policy", rules: "policy", policies: "policy", terms: "policy", conditions: "policy",
  ban: "suspension", banned: "suspension", suspend: "suspension", suspended: "suspension",
  block: "suspension", blocked: "suspension", kicked: "suspension", terminate: "suspension",
  terminated: "suspension", termination: "suspension", penalty: "suspension", punished: "suspension",
  break: "breach", breaking: "breach", broke: "breach", violate: "breach", violates: "breach",
  violating: "breach", violation: "breach", violations: "breach", breaches: "breach",
  reselling: "resell", reseller: "resell", resellers: "resell", agent: "resell", agents: "resell",
  employee: "staff", employees: "staff", worker: "staff", workers: "staff", cashier: "staff",
  buying: "buy", bought: "buy", purchase: "buy", purchased: "buy", purchasing: "buy",
  sold: "buy", sell: "buy", selling: "buy",
  pay: "payment", paying: "payment", paid: "payment", payments: "payment",
  hacking: "hack", hacker: "hack",
  working: "work", worked: "work",
  opening: "open", opens: "open", close: "open", closing: "open", closed: "open", closes: "open",
  schedule: "hour", timing: "hour", timings: "hour", hrs: "hour",
  password: "code", pin: "code",
  connected: "connect", connecting: "connect", connection: "connect",
  disconnect: "connect", disconnected: "connect", offline: "connect",
  validity: "valid", expire: "valid", expires: "valid", expiry: "valid", expired: "valid", last: "valid", lasts: "valid",
  installation: "install", installing: "install", setup: "install",
};

const STOPWORDS = new Set(
  (
    "a an the is are was were be been being am to of in on at for with and or but if so as by from into about " +
    "than then that this these those it its i me my mine you your yours we our ours us they them their what " +
    "which who whom whose how why when where there here do does did doing done can could would should will " +
    "shall may might must have has had having get got gets getting please pls kindly tell know want wanted " +
    "need needs like just also any some much many more most very really too still only even ever yes no not " +
    "dont doesnt didnt cant cannot wont isnt arent im ive id youre use using used go going come okay ok " +
    "best good better great nice hotzonex thing things available " +
    // "currently" would otherwise stem to the same prefix as "currency".
    "currently " +
    // Service verbs and "online" say little about which answer is wanted.
    "offer offers provide provides online " +
    // Who a voucher is for rarely changes the answer ("a voucher for my brother").
    "friend friends brother sister family child children kid kids son daughter wife husband mother father " +
    "mom dad colleague colleagues guest guests"
  ).split(" "),
);

function stem(word: string) {
  let base = word;
  if (base.length > 4 && base.endsWith("ies")) base = `${base.slice(0, -3)}y`;
  else if (/(ss|x|ch|sh)es$/.test(base)) base = base.slice(0, -2);
  else if (base.length > 3 && base.endsWith("s") && !/(ss|us|is)$/.test(base)) base = base.slice(0, -1);
  // A fixed prefix is a crude but consistent stemmer: activate/activated/activation all meet at "activa".
  return base.length > 6 ? base.slice(0, 6) : base;
}

function tokenize(value: string) {
  let text = ` ${value.toLowerCase()} `.replace(/[’']/g, "").replace(/(\d),(\d)/g, "$1$2");
  for (const [pattern, replacement] of PHRASES) text = text.replace(pattern, replacement);

  return text
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .flatMap((word) => [word, ...(EXPANSIONS[word] ?? [])])
    .map((word) => SYNONYMS[word] ?? word)
    .filter((word) => !STOPWORDS.has(word))
    .map(stem);
}

// ---------------------------------------------------------------------------
// BM25 index over the guide, built once per server instance.
// ---------------------------------------------------------------------------

// Headings are broad categories ("Connecting"), so they count for less than the text.
const FIELD_WEIGHTS = { title: 2, heading: 0.5, section: 0.5, text: 1 } as const;
const K1 = 1.2;
// Policy sections and price lists are long but every line is a distinct fact, so
// length is penalised more gently than the BM25 default of 0.75.
const B = 0.5;
/** Applied when a question covers every word of a chunk's title — usually an FAQ asked almost verbatim. */
const TITLE_MATCH_BOOST = 1.5;
/** A word this rare is specific enough to anchor a title match: "price" is; "voucher" and "network" are not. */
const MIN_SPECIFIC_IDF = 0.8;

type IndexedChunk = { chunk: Chunk; tf: Map<string, number>; length: number; titleTerms: Set<string> };

const indexed: IndexedChunk[] = knowledge.chunks.map((chunk) => {
  const tf = new Map<string, number>();
  let length = 0;
  // A section's opening paragraph is "titled" with the section name, which says
  // nothing about the paragraph itself; indexing it as a title makes the intro
  // outrank the real answer ("Voucher Prices by Location" vs "How much does a voucher cost?").
  const isIntro = chunk.title === chunk.section;

  for (const [field, weight] of Object.entries(FIELD_WEIGHTS)) {
    if (field === "title" && isIntro) continue;
    for (const term of tokenize(chunk[field as keyof typeof FIELD_WEIGHTS] ?? "")) {
      tf.set(term, (tf.get(term) ?? 0) + weight);
      length += weight;
    }
  }

  return { chunk, tf, length, titleTerms: new Set(isIntro ? [] : tokenize(chunk.title)) };
});

const averageLength = indexed.reduce((sum, item) => sum + item.length, 0) / indexed.length;

const documentFrequency = new Map<string, number>();
for (const { tf } of indexed) {
  for (const term of tf.keys()) documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
}

function idf(term: string) {
  const df = documentFrequency.get(term) ?? 0;
  return Math.log(1 + (indexed.length - df + 0.5) / (df + 0.5));
}

/** Weight of a query word the guide never uses — enough to sink an off-topic question. */
const UNKNOWN_TERM_WEIGHT = 2;
/** Share of the question's meaning the best chunk must cover to count as an answer. */
const MIN_COVERAGE = 0.5;
/** At least one reasonably specific term must match; "location" alone is not an answer. */
const MIN_MATCHED_WEIGHT = 0.9;

function score(terms: string[], item: IndexedChunk) {
  let total = 0;
  for (const term of terms) {
    const frequency = item.tf.get(term);
    if (!frequency) continue;
    const norm = frequency + K1 * (1 - B + (B * item.length) / averageLength);
    total += idf(term) * ((frequency * (K1 + 1)) / norm);
  }

  // Boost only when the chunk also answers the rest of the question — "staff network"
  // should not win on "network" alone. One-word titles are generic, so they must cover all
  // of it, and a title of only common words ("Hotzonex Wi-Fi") is never boosted.
  const titleCovered = item.titleTerms.size > 0 && [...item.titleTerms].every((term) => terms.includes(term));
  if (!titleCovered || Math.max(...[...item.titleTerms].map(idf)) < MIN_SPECIFIC_IDF) return total;
  const required = item.titleTerms.size >= 2 ? 0.75 : 1;
  return coverage(terms, item).ratio >= required ? total * TITLE_MATCH_BOOST : total;
}

function coverage(terms: string[], item: IndexedChunk) {
  let matched = 0;
  let possible = 0;
  for (const term of terms) {
    const weight = documentFrequency.has(term) ? idf(term) : UNKNOWN_TERM_WEIGHT;
    possible += weight;
    if (item.tf.has(term)) matched += weight;
  }
  return { ratio: possible > 0 ? matched / possible : 0, matched };
}

export function searchGuide(question: string) {
  const terms = [...new Set(tokenize(question))];

  const ranked = indexed
    .map((item) => ({ item, score: score(terms, item) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const fit = best ? coverage(terms, best.item) : { ratio: 0, matched: 0 };
  const confident = Boolean(best) && fit.ratio >= MIN_COVERAGE && fit.matched >= MIN_MATCHED_WEIGHT;

  return { terms, ranked, confident, coverage: fit.ratio };
}

// ---------------------------------------------------------------------------
// Replies
// ---------------------------------------------------------------------------

function guideLabel(place: string) {
  return `Customer Service Guide${knowledge.version ? ` v${knowledge.version}` : ""} · ${place}`;
}

function sourceLabel(chunk: Chunk) {
  const detail = chunk.kind === "faq" ? chunk.heading : chunk.title;
  return guideLabel(detail && detail !== chunk.section ? `${chunk.section} › ${detail}` : chunk.section);
}

/** The first question of each FAQ category — always answerable, and follows the guide if it changes. */
const DEFAULT_SUGGESTIONS = knowledge.chunks
  .filter((chunk, index, all) => chunk.kind === "faq" && all.findIndex((c) => c.kind === "faq" && c.heading === chunk.heading) === index)
  .map((chunk) => chunk.title)
  .slice(0, 4);

function suggestionsAfter(ranked: Array<{ item: IndexedChunk }>, answeredId: string | null) {
  const related = ranked
    .map(({ item }) => item.chunk)
    .filter((chunk) => chunk.kind === "faq" && chunk.id !== answeredId)
    .map((chunk) => chunk.title)
    .slice(0, 3);

  for (const fallback of DEFAULT_SUGGESTIONS) {
    if (related.length >= 3) break;
    if (!related.includes(fallback)) related.push(fallback);
  }
  return related;
}

function chunkByTitle(title: string) {
  return knowledge.chunks.find((chunk) => chunk.title === title);
}

/**
 * Checked against the question only — never the guide — for requests that share
 * vocabulary with the guide but are not about it. Web development, for example,
 * shares "website" with the privacy notice.
 */
const OFF_TOPIC = [
  /\b(build|make|create|design|develop)\w*\b.*\b(website|web ?site|app|application|software|system)s?\b/,
  /\bweb ?(design|development|developer|site development)\b/,
];

/** Questions whose best answer is a specific part of the guide that search alone would miss. */
const ROUTES: Array<{ matches: (question: string) => boolean; title: string }> = [
  // "Do you sell laptops?" matches "device" everywhere; equipment supply is under Technical support.
  {
    matches: (question) =>
      /\b(sell|supply|stock|provide)\w*\b.*\b(laptops?|phones?|computers?|routers?|tablets?|equipment|modems?|antennas?|devices?)\b/.test(question),
    title: "Technical support",
  },
  // "Can I use my Gorom voucher at Jebel-Iraq?" names two offices; search would
  // pick a price list that happens to mention both.
  {
    matches: (question) => {
      if (!/\b(voucher|code)s?\b/.test(question) || /\b(price|cost|how much)\b/.test(question)) return false;
      const jebelIraq = /\b(jebel|iraq|head office|sub[- ]?office)\b/;
      const offices = [/\bgorom\b/, jebelIraq].filter((pattern) => pattern.test(question)).length;
      return offices >= 2 || (/\bhead office\b/.test(question) && /\bsub[- ]?office\b/.test(question));
    },
    title: "Your voucher works only where you bought it",
  },
  // The guide names the offices but gives no street addresses; the locations table is its answer.
  {
    matches: (question) => /\bwhere\b.*\b(office|offices|located|location|locations|branch|branches|you)\b|\b(address|directions)\b/.test(question)
      && !/\b(voucher|code|buy|purchase|pay|network|wifi|wi-fi)\b/.test(question),
    title: "Our locations",
  },
];

const SMALL_TALK: Array<{ pattern: RegExp; reply: () => string }> = [
  {
    pattern: /^(hi|hello|hey|hiya|greetings|salam|salaam|good (morning|afternoon|evening|day))\b[\s!.,]*(there|team)?[\s!.,]*$/,
    reply: () => `Hello, and welcome to Hotzonex Wi-Fi! ${CAPABILITIES} How can I help you today?`,
  },
  {
    pattern: /^(thanks|thank you|thank u|thx|cheers|much appreciated|appreciated|great,? thanks?)\b.{0,30}$/,
    reply: () => "You are very welcome! Is there anything else I can help you with?",
  },
  {
    pattern: /^(bye|goodbye|good bye|see you|good night)\b.{0,20}$/,
    reply: () => "Thank you for choosing Hotzonex Wi-Fi. Have a wonderful day!",
  },
  {
    pattern: /\b(talk|speak|chat) (to|with) (a |an )?(human|person|agent|staff|someone|representative|real person)\b/,
    reply: () =>
      `Of course. You can reach our team directly by calling or messaging ${PHONE}, using the WhatsApp button, or visiting any Hotzonex office during opening hours.`,
  },
  {
    pattern: /^(help|who are you|what are you|what can you (do|help with)|how can you help( me)?|are you (a )?(bot|robot|human|ai))\??$/,
    reply: () => `${CAPABILITIES} Try one of the suggestions below, or ask in your own words.`,
  },
  {
    pattern: /\b((what|who) is hotzonex|tell me about hotzonex|about hotzonex|what does hotzonex do)\b/,
    reply: () =>
      [chunkByTitle("Quick Reference")?.text, chunkByTitle("Other services at our offices")?.text]
        .filter(Boolean)
        .join(" ") || CAPABILITIES,
  },
];

// ---------------------------------------------------------------------------
// Cross-office price comparison. Prices differ by office, so "how much is 8 hours?"
// without an office must not be answered from whichever price list ranks first.
// ---------------------------------------------------------------------------

const OFFICE_TERMS = new Set(tokenize("gorom jebel iraq head sub"));
const GENERIC_PRICE_TERMS = new Set(tokenize("price voucher vouchers package packages ssp"));

function comparePrices(terms: string[]) {
  if (!terms.includes(stem("price")) || terms.some((term) => OFFICE_TERMS.has(term))) return null;

  // Words the guide never uses ("whats") can't appear in a price row either.
  const specific = terms.filter((term) => !GENERIC_PRICE_TERMS.has(term) && documentFrequency.has(term));
  if (specific.length === 0) return null;

  const lines: string[] = [];
  for (const { office, rows, priceColumn } of priceTables) {
    for (const cells of rows) {
      const rowTerms = new Set(tokenize(cells.join(" ")));
      if (!specific.every((term) => rowTerms.has(term))) continue;
      lines.push(`• ${office} — ${cells[0]}: ${cells[priceColumn]}`);
    }
  }
  if (lines.length === 0) return null;

  const note = chunkByTitle("Prices differ between our locations")?.text;
  return [lines.join("\n"), note].filter(Boolean).join("\n\n");
}

export function getAssistantAnswer(question: string): AssistantReply {
  const normalized = question.toLowerCase().replace(/\s+/g, " ").trim();

  if (!normalized) {
    return { answer: CAPABILITIES, source: null, suggestions: DEFAULT_SUGGESTIONS };
  }

  const smallTalk = SMALL_TALK.find(({ pattern }) => pattern.test(normalized));
  if (smallTalk) {
    return { answer: smallTalk.reply(), source: null, suggestions: DEFAULT_SUGGESTIONS };
  }

  if (OFF_TOPIC.some((pattern) => pattern.test(normalized))) {
    return { answer: OUT_OF_SCOPE, source: null, suggestions: DEFAULT_SUGGESTIONS };
  }

  // "Hi, how much is a voucher?" — drop the greeting and answer the question.
  const withoutGreeting = normalized.replace(/^(hi|hello|hey|good (morning|afternoon|evening))\b[\s!.,]*/, "");
  const { terms, ranked, confident } = searchGuide(withoutGreeting);

  const route = ROUTES.find(({ matches }) => matches(withoutGreeting));
  const routed = route ? chunkByTitle(route.title) : undefined;

  if (!routed) {
    const comparison = comparePrices(terms);
    if (comparison) {
      return {
        answer: comparison,
        source: guideLabel(priceTables[0]?.section ?? "Voucher prices"),
        suggestions: suggestionsAfter(ranked, null),
      };
    }
  }

  if (!routed && !confident) {
    return { answer: OUT_OF_SCOPE, source: null, suggestions: DEFAULT_SUGGESTIONS };
  }

  const chunk = routed ?? ranked[0].item.chunk;
  return {
    answer: chunk.context ? `${chunk.text}\n\n${chunk.context}` : chunk.text,
    source: sourceLabel(chunk),
    suggestions: suggestionsAfter(ranked, chunk.id),
  };
}
