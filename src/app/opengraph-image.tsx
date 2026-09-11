import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { lowestVoucherPrice } from "@/lib/guide";

export const alt = "Hotzonex Wi-Fi — internet access and support in Juba, South Sudan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview card shown when a Hotzonex link is shared on WhatsApp, Facebook or X. */
export default async function OpengraphImage() {
  // Rendered at build time, so the logo is read from disk and inlined as a data URI.
  const logo = await readFile(join(process.cwd(), "public/brand/hotzonex-logo-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  const facts = [
    `${siteConfig.locations.length} offices in Juba`,
    lowestVoucherPrice ? `Vouchers from ${lowestVoucherPrice}` : "Prepaid Wi-Fi vouchers",
    "Wi-Fi 24/7 at Gorom",
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0b2f4f 0%, #0f766e 100%)",
          color: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>, not next/image */}
        <img src={logoSrc} alt="" width={330} height={330} style={{ position: "absolute", right: 64, top: 150 }} />
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>
          <span>HOTZONEX</span>
          <span style={{ marginLeft: 14, color: "#f59e0b" }}>Wi-Fi</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, maxWidth: 700 }}>
            Internet access and support for everyday life in Juba.
          </div>
          <div style={{ marginTop: 22, fontSize: 27, color: "#ccfbf1", maxWidth: 700 }}>
            Wi-Fi vouchers · Home & office internet · Starlink · MikroTik · IT support
          </div>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {facts.map((fact) => (
            <div
              key={fact}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 999,
                background: "rgba(255, 255, 255, 0.14)",
                border: "1px solid rgba(255, 255, 255, 0.28)",
                fontSize: 26,
              }}
            >
              {fact}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
