import knowledge from "@/generated/policy-knowledge.json";

/**
 * Typed access to the Hotzonex Wi-Fi Customer Service Guide (doc/Hotzonex_policy.pdf),
 * extracted at build time by scripts/build-knowledge.mjs.
 *
 * Pages that show prices, FAQs or policies read them from here, so the site and
 * the assistant always match the guide — replace the PDF and both update.
 */

export type GuideChunk = (typeof knowledge.chunks)[number];

export const guideName = `Hotzonex Wi-Fi Customer Service Guide${knowledge.version ? ` v${knowledge.version}` : ""}`;

export const guideChunks: GuideChunk[] = knowledge.chunks;

export function guideChunk(title: string) {
  return knowledge.chunks.find((chunk) => chunk.title === title);
}

export type PriceTable = {
  office: string;
  section: string;
  columns: string[];
  rows: string[][];
  priceColumn: number;
  /** Callouts printed under this office's price list, e.g. "Ask before you pay at the Sub Office". */
  notes: GuideChunk[];
};

/** One price list per office: the guide's tables whose header row has a "Price" column. */
export const priceTables: PriceTable[] = knowledge.chunks
  .filter((chunk) => chunk.kind === "prices")
  .map((chunk) => {
    const [header, ...rows] = chunk.text.split("\n");
    const columns = header.split(" · ");
    return {
      office: chunk.title,
      section: chunk.section,
      columns,
      rows: rows.map((row) => row.split(" · ")),
      priceColumn: columns.findIndex((column) => /^price$/i.test(column)),
      notes: knowledge.chunks.filter((note) => note.kind === "prices" && note.heading === chunk.title),
    };
  })
  .filter((table) => table.priceColumn > 0);

function parseAmount(cell: string) {
  const amount = Number(cell.replace(/[^\d]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

/** Cheapest voucher across every office, e.g. "1,000 SSP". */
export const lowestVoucherPrice = (() => {
  const amounts = priceTables.flatMap((table) =>
    table.rows.map((row) => parseAmount(row[table.priceColumn] ?? "")).filter((amount): amount is number => amount !== null),
  );
  return amounts.length > 0 ? `${Math.min(...amounts).toLocaleString("en-US")} SSP` : null;
})();

export type Faq = { category: string; question: string; answer: string };

export const guideFaqs: Faq[] = knowledge.chunks
  .filter((chunk) => chunk.kind === "faq")
  .map((chunk) => ({ category: chunk.heading ?? "General", question: chunk.title, answer: chunk.text }));

export type PolicySection = { title: string; items: Array<{ number: string; text: string }> };

/** Numbered service policies (the guide's terms of use), grouped by section. */
export const policySections: PolicySection[] = knowledge.chunks
  .filter((chunk) => chunk.kind === "policy" && /^\d+\.\d+\s/.test(chunk.title))
  .map((chunk) => ({
    title: chunk.title,
    items: chunk.text.split("\n").map((line) => {
      const match = line.match(/^(\d+)\.\s+(.*)$/);
      return match ? { number: match[1], text: match[2] } : { number: "", text: line };
    }),
  }));

/** Paragraphs in the policy section that are not numbered rules (introduction, enforcement). */
export const policyNotes = knowledge.chunks.filter(
  (chunk) => chunk.kind === "policy" && !/^\d+\.\d+\s/.test(chunk.title),
);
