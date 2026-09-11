import fs from "node:fs";
import path from "node:path";

import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const pdfFileName = "Hotzonex_WiFi_Customer_Guide_4.pdf";

let cached: Promise<string> | null = null;

/** Parsing the guide is expensive, so keep the result for the life of the process. */
export function getPdfKnowledge(): Promise<string> {
  cached ??= readPdfKnowledge();
  return cached;
}

async function readPdfKnowledge(): Promise<string> {
  try {
    const pdfPath = path.join(process.cwd(), "doc", pdfFileName);

    if (!fs.existsSync(pdfPath)) {
      return "";
    }

    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = getDocument({ data });
    const pdf = await loadingTask.promise;

    let text = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      if (pageText) {
        text += `${pageText}\n\n`;
      }
    }

    await loadingTask.destroy();

    return text.trim();
  } catch {
    return "";
  }
}
