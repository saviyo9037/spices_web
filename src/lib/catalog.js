import { products } from "@/data/products";

// Everything here is derived from src/data/products.js so the finder and filters never drift
// from the catalogue.
export const FORMS = [
  { id: "whole-spices", label: "Whole spice" },
  { id: "ground-spices", label: "Ground / powder" },
  { id: "spice-blends", label: "Spice blend" },
];

// Cooking-use groups, matched against each product's own `culinaryUses` text.
export const USE_TAGS = [
  { id: "curries", label: "Curries & gravies", test: /curr|gravy|gravies|sambar|kurma|stew|dal\b/i },
  { id: "rice", label: "Rice & biryani", test: /biryani|pulao|rice/i },
  { id: "tea-sweets", label: "Tea, sweets & baking", test: /chai|tea|coffee|kheer|halwa|sweet|bak|pie|pastr|pudding|custard|milk/i },
  { id: "soups", label: "Soups & rasam", test: /soup|rasam|stock/i },
  { id: "marinades", label: "Marinades & rubs", test: /marinad|rub|tandoori|roast|steak/i },
];

export function productUses(p) {
  const text = (p.culinaryUses || []).join(" | ");
  return USE_TAGS.filter((t) => t.test.test(text)).map((t) => t.id);
}

export function productSizes(p) {
  return (p.weights || []).map((w) => w.label);
}

export function allSizes() {
  const set = new Set();
  products.forEach((p) => productSizes(p).forEach((s) => set.add(s)));
  const grams = (l) => (l.endsWith("kg") ? parseFloat(l) * 1000 : parseFloat(l));
  return [...set].sort((a, b) => grams(a) - grams(b));
}

// The pack size whose price is the product's headline price (what the card shows).
export function defaultWeight(p) {
  return (p.weights || []).find((w) => w.price === p.price) || (p.weights || [])[0] || null;
}
