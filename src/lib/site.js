// Single place for site-wide contact details and integration points.
// The contact page already routes bulk enquiries to this address; confirm it is correct.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "care@malabarspices.com";

// Bulk enquiry integration point. Set NEXT_PUBLIC_ENQUIRY_ENDPOINT to a URL that accepts a JSON POST
// (see src/lib/enquiry.js for the payload). Until it is set, no enquiry is ever reported as sent.
export const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "";

// Newsletter integration point: a URL that accepts a JSON POST of { email }.
export const NEWSLETTER_ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "";

// Social links render only when a real URL is configured in the environment.
export const SOCIAL_LINKS = [
  { name: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "" },
  { name: "Facebook", href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "" },
  { name: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "" },
];
