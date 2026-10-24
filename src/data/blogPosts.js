export const blogPosts = [
  {
    id: "blog-1",
    title: "The Connoisseur's Guide to Storing and Cooking with Whole Spices",
    slug: "storing-and-cooking-whole-spices",
    image: "/images/blog-spice-guide.jpg",
    category: "Culinary Guide",
    date: "October 14, 2025",
    readTime: "6 min read",
    author: "Chef Ananya Nair",
    authorRole: "Culinary Heritage Specialist",
    excerpt: "Unlock the full aromatic potential of your pantry. Learn how whole spices retain essential oils, the chemistry of gentle roasting, and optimal glass storage methods.",
    content: `
      <p class="lead">Whole spices are nature's airtight capsules of aromatic power. Unlike pre-ground powders that begin losing their fragile volatile terpenes the moment they meet the open air, whole seeds, barks, and pods shield their essential oils inside robust cell walls for years.</p>
      
      <h2>Why Whole Spices Reign Supreme in Flavor</h2>
      <p>When you crack a whole Tellicherry peppercorn or crush an emerald green cardamom pod right before tossing it into hot ghee, you release terpenes that are virtually absent in store-bought pre-packaged grounds. The heat and friction vaporize these micro-droplets instantly, filling your kitchen with perfume and coating every ingredient evenly.</p>

      <h2>The Art of Dry Toasting (Bhunana)</h2>
      <p>Before grinding or cooking, gentle dry toasting over medium-low heat transforms sharp, astringent raw spices into sweet, nutty, and harmonious compounds. Watch the spices closely in a heavy-bottomed cast iron skillet for 90 to 120 seconds until they turn a shade darker and become irresistibly fragrant.</p>

      <h2>Storage Golden Rules</h2>
      <ul>
        <li><strong>Keep away from steam:</strong> Never sprinkle spices directly from the jar over a bubbling pot; rising steam introduces moisture that breeds mold.</li>
        <li><strong>Use dark amber or airtight glass:</strong> Ultraviolet light degrades the chlorophyll in cardamom and bleaches the golden curcumin in turmeric.</li>
        <li><strong>Store at cool room temperature:</strong> Avoid cupboards directly above the stove or next to the oven.</li>
      </ul>
    `
  },
  {
    id: "blog-2",
    title: "5 Signature Heritage Masala Blends You Can Craft at Home",
    slug: "signature-masala-blends-at-home",
    image: "/images/blog-spice-recipes.jpg",
    category: "Recipes & Blends",
    date: "October 18, 2025",
    readTime: "8 min read",
    author: "Master Blender Rajesh Menon",
    authorRole: "Spice Agronomist & Blender",
    excerpt: "Discover time-honored spice ratios passed down through generations. From Kerala Garam Masala to fragrant Panch Phoron and Chettinad blend.",
    content: `
      <p class="lead">Nothing defines regional Indian cuisines more intimately than its proprietary spice blends. While supermarket masalas often contain cheap fillers and excess salt, blending your own from pure single-origin whole spices yields astonishing vibrancy.</p>
      
      <h2>1. The Legendary Malabar Garam Masala</h2>
      <p>Unlike sweet northern garam masalas dominated by coriander and cumin, the Malabar coastal blend focuses on heady sweet-spice aromatics: green cardamom, Ceylon cinnamon, cloves, fennel seeds, star anise, and mace. It gives biryanis and curries that quintessential Kerala estate aroma.</p>

      <h2>2. Chettinad Roast Blend</h2>
      <p>Characterized by the inclusion of black stone flower (kalpasi), star anise, roasted poppy seeds, and fiery whole dried red chillies, this blend delivers dark, complex, multi-layered gravies with an intoxicating earthy bouquet.</p>

      <h2>3. Panch Phoron (Bengal's Five Spice)</h2>
      <p>An equal-parts whole seed blend of cumin, brown mustard, fenugreek, nigella (kalonji), and wild celery / fennel seeds. Simply bloomed in smoking mustard oil before adding vegetables or lentils.</p>
    `
  }
];

export function getBlogPostBySlug(slug) {
  return blogPosts.find((b) => b.slug === slug);
}
