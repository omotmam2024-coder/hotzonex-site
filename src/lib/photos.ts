import type { StaticImageData } from "next/image";

import accessPoint from "@/assets/photos/accessPoint.jpg";
import cabling from "@/assets/photos/cabling.jpg";
import cafe from "@/assets/photos/cafe.jpg";
import counter from "@/assets/photos/counter.jpg";
import developer from "@/assets/photos/developer.jpg";
import dish from "@/assets/photos/dish.jpg";
import people from "@/assets/photos/people.jpg";
import router from "@/assets/photos/router.jpg";

/**
 * Illustrative pictures for the home, services and pricing pages. They are generated
 * images, not photographs of Hotzonex premises, staff or customers; pictures of
 * the real office live in src/lib/office-images.ts. Each is used for one subject
 * only, so no two pages show the same picture.
 */
export const photos = {
  people,
  cafe,
  router,
  cabling,
  dish,
  accessPoint,
  developer,
  counter,
} satisfies Record<string, StaticImageData>;

export type Photo = keyof typeof photos;

export const photoAlt: Record<Photo, string> = {
  people: "People using phones and laptops in a Wi-Fi lounge",
  cafe: "A man using his phone at a cafe table",
  router: "A Wi-Fi router on a shelf in a home office",
  cabling: "A technician plugging a network cable into a switch",
  dish: "A flat satellite internet dish on an iron roof",
  accessPoint: "An outdoor wireless access point on a pole above a market",
  developer: "A developer working on a website at a desk with two screens",
  counter: "A voucher being handed across a shop counter",
};
