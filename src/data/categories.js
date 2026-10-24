export const categories = [
  {
    id: "cat-whole-spices",
    name: "Whole Spices",
    slug: "whole-spices",
    image: "/images/category-whole-spices.jpg",
    itemCount: "12+ Products",
    description: "Sun-dried peppercorns, emerald cardamom, star anise, and whole seeds packed with intact essential oils for maximum aromatic burst.",
    tagline: "Uncrushed, potent, and bursting with vital oils",
  },
  {
    id: "cat-ground-spices",
    name: "Ground Spices",
    slug: "ground-spices",
    image: "/images/category-ground-spices.jpg",
    itemCount: "15+ Products",
    description: "Cold-pulverized spice powders ground at gentle temperatures to protect volatile aromatics, natural color, and therapeutic properties.",
    tagline: "Fine-milled freshness without synthetic fillers",
  },
  {
    id: "cat-herbs-seasonings",
    name: "Herbs & Seasonings",
    slug: "herbs-seasonings",
    image: "/images/category-herbs-seasonings.jpg",
    itemCount: "10+ Products",
    description: "Hand-harvested dried curry leaves, bay leaves, kasuri methi, rosemary, and aromatic culinary seasonings.",
    tagline: "Fragrant dried botanicals from estate herb gardens",
  },
  {
    id: "cat-spice-blends",
    name: "Spice Blends",
    slug: "spice-blends",
    image: "/images/category-spice-blends.jpg",
    itemCount: "8+ Products",
    description: "Time-tested generational spice concoctions, artisanally toasted and calibrated to bring depth and authenticity to every home feast.",
    tagline: "Artisan recipes crafted for culinary mastery",
  },
  {
    id: "cat-masalas",
    name: "Masalas",
    slug: "masalas",
    image: "/images/category-masalas.jpg",
    itemCount: "8+ Products",
    description: "Regional royal masalas for curries, biryanis, sambars, and gravies, inspired by heritage royal kitchens of India.",
    tagline: "Signature spice mixes that recreate traditional flavours",
  },
  {
    id: "cat-dried-spices",
    name: "Dried Spices",
    slug: "dried-spices",
    image: "/images/category-dried-spices.jpg",
    itemCount: "11+ Products",
    description: "Naturally sun-cured spices, dry ginger (sonth), mace, dried red chillies, and sun-preserved botanical treasures.",
    tagline: "Solar-dehydrated harvest preserving intense richness",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
