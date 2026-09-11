/**
 * Builds the assistant's knowledge base from the Hotzonex policy PDF.
 *
 * The PDF is the single source of truth: replace doc/Hotzonex_policy.pdf and
 * run `npm run knowledge` (it also runs as part of `npm run build`). The output
 * is a list of self-contained chunks — one per FAQ answer, policy section,
 * price list, callout and info box — that the assistant searches at runtime.
 *
 * Chunking follows the document's typography rather than fixed page ranges:
 * page titles, bold section headings, "Q" questions, numbered policies, bold
 * lead-in callouts and all-caps table headers each start a new chunk or row.
 */
import fs from "node:fs";
import path from "node:path";

import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const root = path.resolve(import.meta.dirname, "..");
const SOURCE = "doc/Hotzonex_policy.pdf";
const OUTPUT = "src/generated/policy-knowledge.json";

/** Horizontal gap (pt) between text runs that separates two table cells. */
const CELL_GAP = 12;

function clean(value) {
  return value.replace(/\s+/g, " ").trim();
}

/** Decorative tags such as "A T A G L A N C E" carry no content worth indexing. */
function isLetterSpaced(value) {
  const tokens = value.trim().split(" ").filter(Boolean);
  return tokens.length >= 4 && tokens.filter((token) => token.length === 1).length / tokens.length >= 0.6;
}

/** Joins a wrapped line onto its paragraph, rejoining words split at a hyphen ("HOTZONEX-" + "WIFI3"). */
function joinWrapped(text, next, joiner = " ") {
  return /[A-Za-z0-9]-$/.test(text) ? `${text}${next}` : `${text}${joiner}${next}`;
}

function sentenceCase(value) {
  const lower = value.toLowerCase().replace(/wi-fi/g, "Wi-Fi");
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

async function readLines(pdf) {
  const lines = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    // Loading the operator list resolves embedded fonts, which exposes their real
    // names (e.g. "Carlito-Bold") — the only reliable signal for bold text.
    await page.getOperatorList();
    const { items } = await page.getTextContent();

    const isBold = (item) => {
      try {
        return /bold|black|heavy/i.test(page.commonObjs.get(item.fontName).name);
      } catch {
        return false;
      }
    };

    let run = [];
    const flush = () => {
      const line = toLine(run, pageNumber, isBold);
      if (line) lines.push(line);
      run = [];
    };

    for (const item of items) {
      if (!("str" in item)) continue;
      run.push(item);
      if (item.hasEOL) flush();
    }
    flush();
    page.cleanup();
  }

  return lines;
}

function toLine(run, page, isBold) {
  const visible = run.filter((item) => item.str.trim());
  if (visible.length === 0) return null;

  const cells = [];
  let cell = "";
  let cellEnd = null;
  for (const item of run) {
    const x = item.transform[4];
    if (item.str.trim() && cellEnd !== null && x - cellEnd > CELL_GAP) {
      cells.push(clean(cell));
      cell = "";
    }
    cell += item.str;
    if (item.str.trim()) cellEnd = x + item.width;
  }
  cells.push(clean(cell));

  let boldLead = "";
  for (const item of run) {
    if (!item.str.trim()) {
      boldLead += item.str;
      continue;
    }
    if (!isBold(item)) break;
    boldLead += item.str;
  }

  const boldCount = visible.filter(isBold).length;
  const filledCells = cells.filter(Boolean);

  return {
    page,
    x: visible[0].transform[4],
    y: visible[0].transform[5],
    size: Math.max(...visible.map((item) => item.height)),
    weight: boldCount === visible.length ? "bold" : boldCount > 0 ? "mixed" : "regular",
    boldLead: clean(boldLead),
    cells: filledCells,
    text: clean(filledCells.join(" ")),
  };
}

function kindFor(section) {
  if (/polic/i.test(section)) return "policy";
  if (/price/i.test(section)) return "prices";
  return "info";
}

function buildChunks(lines) {
  const chunks = [];
  let section = "";
  let heading = null;
  let chunk = null;
  let mode = "body"; // "body" | "faq" | "table"
  let tableX = 0;
  let stepNumber = null;
  let expectCardValue = false;
  let prev = null;

  const close = () => {
    if (chunk && chunk.paragraphs.length > 0) chunks.push(chunk);
    chunk = null;
    prev = null;
    mode = "body";
  };

  const open = (fields) => {
    close();
    chunk = { kind: kindFor(section), section, heading, paragraphs: [], ...fields };
  };

  const ensureOpen = () => {
    if (!chunk) open({ title: heading ?? section });
  };

  const addParagraph = (text, extra = {}) => {
    ensureOpen();
    chunk.paragraphs.push({ text, ...extra });
  };

  const lastParagraph = () => chunk?.paragraphs.at(-1);

  const continuesParagraph = (line) => {
    if (!prev || prev.page !== line.page || line.y >= prev.y) return false;
    if (prev.y - line.y > Math.max(prev.size, line.size) * 2) return false;
    const last = lastParagraph();
    return Math.abs(line.x - prev.x) < 3 || (last?.item === true && line.x > prev.x);
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const next = lines[index + 1];

    // The cover page repeats what the body says; footers repeat on every page.
    if (line.page === 1 || /Customer Service Guide\s*\|/.test(line.text)) continue;

    // Page title, e.g. "03 Service Policies".
    if (line.size >= 20) {
      close();
      section = line.cells[0].replace(/^\d+\s+/, "");
      heading = null;
      continue;
    }

    // Table of contents entries ("... Page 5").
    if (/^Page \d+$/.test(line.cells.at(-1) ?? "")) continue;

    // Contact-card label ("S U P P O R T L I N E"); its value is the next line.
    // Headings can carry a letter-spaced tag too, so the whole line must be one.
    if (line.cells.every(isLetterSpaced)) {
      expectCardValue = true;
      continue;
    }
    if (expectCardValue) {
      expectCardValue = false;
      addParagraph(line.text, { joiner: " — " });
      prev = line;
      continue;
    }

    // Section heading, e.g. "3.1 Network access" or "2 | Jebel-Iraq Head Office".
    const badgeHeading = /^\d+$/.test(line.cells[0]) && line.cells.length > 1;
    if (line.size >= 11 && (line.weight === "bold" || badgeHeading)) {
      close();
      heading = line.cells.filter((cell) => !/^\d+$/.test(cell) && !isLetterSpaced(cell)).join(" ");
      // FAQ headings are categories; each question below becomes its own chunk.
      if (!/question/i.test(section)) open({ title: heading });
      continue;
    }

    if (line.weight === "bold" && /^Q\s+\S/.test(line.text)) {
      open({ kind: "faq", title: line.text.replace(/^Q\s+/, "") });
      mode = "faq";
      continue;
    }

    if (mode === "faq") {
      const last = lastParagraph();
      if (last) last.text = joinWrapped(last.text, line.text);
      else addParagraph(line.text);
      continue;
    }

    // Numbered step badge ("1") ahead of a step title.
    if (line.weight === "bold" && /^\d{1,2}$/.test(line.text)) {
      stepNumber = line.text;
      continue;
    }

    // Callout with a bold lead-in: "Your voucher works only where you bought it. ..."
    if (line.weight === "mixed" && line.cells.length === 1 && line.boldLead.split(" ").length >= 2) {
      open({ title: line.boldLead.replace(/[.:]$/, "") });
      addParagraph(line.text);
      prev = line;
      continue;
    }

    if (mode === "table") {
      const last = lastParagraph();
      if (line.x > tableX + 10 && last) {
        // Wrapped cell of the current row (or of the header row).
        last.text = last.header ? `${last.text} ${sentenceCase(line.text)}` : `${last.text} · ${line.cells.join(" · ")}`;
        prev = line;
        continue;
      }
      if (Math.abs(line.x - tableX) <= 10) {
        addParagraph(line.cells.join(" · "));
        prev = line;
        continue;
      }
      mode = "body";
    }

    // All-caps bold row: the header of a table.
    if (line.weight === "bold" && !/[a-z]/.test(line.text) && /[A-Z]{3}/.test(line.text) && line.cells.length > 1) {
      addParagraph(line.cells.map(sentenceCase).join(" · "), { header: true });
      mode = "table";
      tableX = line.x;
      prev = line;
      continue;
    }

    // Box title: a short bold line directly above regular text in the same column.
    const isBoxTitle =
      line.weight === "bold" &&
      line.cells.length === 1 &&
      line.size < 11 &&
      next?.page === line.page &&
      Math.abs(next.x - line.x) < 3 &&
      next.weight !== "bold";
    if (isBoxTitle) {
      if (stepNumber) {
        addParagraph(`${stepNumber}. ${line.text}:`, { item: true });
        stepNumber = null;
      } else {
        // A box inherits its section's one-paragraph intro ("These are quoted per
        // job — call for a price"), which applies to every box below it.
        const intro = chunk?.title === heading && chunk.paragraphs.length === 1 ? chunk.paragraphs[0].text : chunk?.context;
        open({ title: line.text, context: intro });
      }
      prev = line;
      continue;
    }

    // Numbered policy, e.g. "16 Voucher purchases are non-refundable once activated."
    const policy = /polic/i.test(section) && line.text.match(/^(\d{1,2})\s+(.+)$/);
    if (policy) {
      addParagraph(`${policy[1]}. ${policy[2]}`, { item: true });
      prev = line;
      continue;
    }

    ensureOpen();
    const last = lastParagraph();
    if (last && continuesParagraph(line)) {
      last.text = joinWrapped(last.text, line.text, last.joiner);
      delete last.joiner;
    } else {
      addParagraph(line.text);
    }
    prev = line;
  }

  close();
  return chunks;
}

function finalize(chunks) {
  const seen = new Map();

  return chunks.map((chunk) => {
    const base = `${chunk.kind}-${slugify(chunk.title)}`;
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);

    return {
      id: count === 1 ? base : `${base}-${count}`,
      kind: chunk.kind,
      section: chunk.section,
      heading: chunk.kind === "faq" || chunk.heading !== chunk.title ? chunk.heading : null,
      title: chunk.title,
      text: chunk.paragraphs.map((paragraph) => paragraph.text).join("\n"),
      // Shown with the answer but not searched, so it cannot attract unrelated questions.
      context: chunk.context ?? null,
    };
  });
}

async function main() {
  const sourcePath = path.join(root, SOURCE);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Knowledge source not found: ${SOURCE}. The assistant answers from this PDF, so it must exist.`);
  }

  const loadingTask = getDocument({ data: new Uint8Array(fs.readFileSync(sourcePath)), verbosity: 0 });
  const lines = await readLines(await loadingTask.promise);
  await loadingTask.destroy();

  const chunks = finalize(buildChunks(lines));
  if (chunks.length < 10) {
    throw new Error(`Only ${chunks.length} knowledge chunks were extracted from ${SOURCE}; the layout may have changed.`);
  }

  const version = lines.map((line) => line.text.match(/Version\s+(\d+(?:\.\d+)*)/)?.[1]).find(Boolean) ?? null;
  const knowledge = { source: path.basename(SOURCE), version, chunks };

  const outputPath = path.join(root, OUTPUT);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(knowledge, null, 2)}\n`);

  const byKind = Object.entries(Object.groupBy(chunks, (chunk) => chunk.kind))
    .map(([kind, list]) => `${list.length} ${kind}`)
    .join(", ");
  console.log(`Knowledge base: ${chunks.length} chunks (${byKind}) from ${SOURCE} v${version ?? "?"} -> ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
