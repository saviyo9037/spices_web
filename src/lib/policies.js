// Policy pages. The page shows a "not published yet" notice; the business must supply the real
// wording (shipping times and charges, return window, privacy practices, terms of sale).
export const POLICIES = [
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "shipping-policy", title: "Shipping Policy" },
  { slug: "return-refund-policy", title: "Return & Refund Policy" },
  { slug: "terms-and-conditions", title: "Terms & Conditions" },
];

export function getPolicy(slug) {
  return POLICIES.find((p) => p.slug === slug);
}
