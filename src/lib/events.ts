// Photo/video folders — one per event. Slugs become S3 prefixes: wedding/<slug>/...
export const mediaEvents = [
  { slug: "bachelor-party", label: "Bachelor's Party" },
  { slug: "bridal-shower", label: "Bridal Shower" },
  { slug: "madhuram-veppu", label: "Madhuram Veppu" },
  { slug: "ceremony", label: "Church Ceremony" },
  { slug: "reception", label: "Reception" },
  { slug: "bohol", label: "Bohol Trip" },
  { slug: "other", label: "Other" }
] as const;

export type MediaEventSlug = (typeof mediaEvents)[number]["slug"];

export function isMediaEvent(slug: string): slug is MediaEventSlug {
  return mediaEvents.some((e) => e.slug === slug);
}
