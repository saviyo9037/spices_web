"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  Leaf,
  Clock,
  MapPin,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailClient({ product, relatedProducts }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedWeight, setSelectedWeight] = useState(
    product.weights && product.weights.length > 0 ? product.weights[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview"); // overview, details, culinary, reviews
  const [addedAnim, setAddedAnim] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentPrice = selectedWeight ? selectedWeight.price : product.price;
  const currentOriginalPrice = selectedWeight
    ? selectedWeight.originalPrice
    : product.originalPrice;
  const discountPercent = currentOriginalPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    router.push("/checkout");
  };

  return (
    <div className="bg-[#faf7f2] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#5c6c64] mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#143627]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#87978f]" />
          <Link href="/shop" className="hover:text-[#143627]">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#87978f]" />
          <Link href={`/category/${product.category}`} className="hover:text-[#143627]">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#87978f]" />
          <span className="text-[#143627] font-semibold">{product.name}</span>
        </nav>

        {/* Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-3xl border border-[#e6dfd5] shadow-xs mb-16">
          {/* Left Column: Image Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#faf7f2] border border-[#e6dfd5] shadow-inner group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="px-3 py-1 rounded-full bg-[#143627] text-[#dfa84a] text-xs font-bold tracking-wide uppercase shadow-sm">
                  {product.badge}
                </span>
                {product.organic && (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase border border-emerald-300">
                    Certified Organic
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-10 ${
                  isFavorited
                    ? "bg-[#c69238] text-[#143627]"
                    : "bg-white/95 text-[#5c6c64] hover:text-red-500"
                }`}
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Sourcing Guarantee Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-center text-xs">
              <div className="flex flex-col items-center gap-1">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold text-[#143627]">100% Pure</span>
                <span className="text-[10px] text-[#87978f]">Zero Chemical Additives</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-[#e6dfd5]">
                <MapPin className="w-4 h-4 text-[#c69238]" />
                <span className="font-semibold text-[#143627]">Single Origin</span>
                <span className="text-[10px] text-[#87978f]">{product.origin}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Clock className="w-4 h-4 text-[#143627]" />
                <span className="font-semibold text-[#143627]">Fresh Milled</span>
                <span className="text-[10px] text-[#87978f]">Small Batch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#c69238]">
                  {product.categoryName} &bull; {product.harvestYear}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#143627] mt-1.5 leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-medium text-[#5c6c64] mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Rating & Reviews Bar */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-current"
                          : "text-stone-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#143627]">
                  {product.rating}
                </span>
                <span className="text-xs text-[#87978f]">
                  ({product.reviewsCount} customer reviews)
                </span>
                <span className="text-emerald-700 text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Heritage Estate
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e6dfd5] flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#143627]">
                  ₹{currentPrice}
                </span>
                {currentOriginalPrice && (
                  <span className="text-base text-[#87978f] line-through">
                    ₹{currentOriginalPrice}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-xs font-bold">
                    Save {discountPercent}%
                  </span>
                )}
                <span className="text-xs text-[#5c6c64] ml-auto">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#5c6c64] leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Pack Size / Weight Selection */}
              {product.weights && product.weights.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#143627]">
                      Select Package Size:
                    </span>
                    <span className="text-[#87978f]">
                      Selected: <strong>{selectedWeight?.label}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {product.weights.map((w) => (
                      <button
                        key={w.label}
                        onClick={() => setSelectedWeight(w)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedWeight?.label === w.label
                            ? "border-[#143627] bg-[#143627] text-white shadow-md"
                            : "border-[#e6dfd5] bg-white text-[#143627] hover:border-[#dfa84a]"
                        }`}
                      >
                        <div className="font-bold text-sm">{w.label}</div>
                        <div
                          className={`text-xs mt-0.5 ${
                            selectedWeight?.label === w.label
                              ? "text-[#dfa84a]"
                              : "text-[#5c6c64]"
                          }`}
                        >
                          ₹{w.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#e6dfd5] rounded-xl bg-[#faf7f2] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#5c6c64] hover:text-[#16201b]"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-[#143627]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#5c6c64] hover:text-[#16201b]"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
                      addedAnim
                        ? "bg-emerald-700 text-white"
                        : "bg-[#143627] hover:bg-[#1c4b37] text-white hover:scale-[1.01]"
                    }`}
                  >
                    {addedAnim ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#dfa84a]" />
                        <span>Add to Cart &bull; ₹{currentPrice * quantity}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#dfa84a] hover:bg-[#c69238] text-[#0f2c1f] font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now with Express Checkout</span>
                </button>
              </div>

              {/* Security and Delivery Trust Row */}
              <div className="pt-4 border-t border-[#f3eee4] grid grid-cols-2 gap-3 text-xs text-[#5c6c64]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Dispatched in 24h &bull; Free above ₹499</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Aroma Sealed &bull; 100% Purity Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e6dfd5] shadow-xs mb-16">
          {/* Tab Buttons */}
          <div className="flex items-center gap-2 border-b border-[#e6dfd5] pb-4 mb-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === "overview"
                  ? "bg-[#143627] text-white shadow-sm"
                  : "text-[#5c6c64] hover:bg-[#faf7f2]"
              }`}
            >
              Description &amp; Origin
            </button>
            <button
              onClick={() => setActiveTab("culinary")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === "culinary"
                  ? "bg-[#143627] text-white shadow-sm"
                  : "text-[#5c6c64] hover:bg-[#faf7f2]"
              }`}
            >
              Culinary Uses &amp; Notes
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === "specifications"
                  ? "bg-[#143627] text-white shadow-sm"
                  : "text-[#5c6c64] hover:bg-[#faf7f2]"
              }`}
            >
              Specifications &amp; Storage
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === "reviews"
                  ? "bg-[#143627] text-white shadow-sm"
                  : "text-[#5c6c64] hover:bg-[#faf7f2]"
              }`}
            >
              Customer Reviews ({product.reviewsCount})
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-4xl">
              <h3 className="font-serif text-2xl font-bold text-[#143627]">
                About {product.name}
              </h3>
              <p className="text-sm sm:text-base text-[#5c6c64] leading-relaxed">
                {product.fullDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e6dfd5]">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#143627] mb-2">
                    Estate Provenance
                  </h4>
                  <p className="text-xs text-[#5c6c64]">
                    Grown naturally in <strong>{product.origin}</strong> at optimal elevations under monsoon cloud cover, cultivating dense aromatic terpenes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e6dfd5]">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#143627] mb-2">
                    Harvest &amp; Curing Method
                  </h4>
                  <p className="text-xs text-[#5c6c64]">
                    Hand-harvested at peak oil maturity during the {product.harvestYear}, solar cured on bamboo beds, and sealed immediately in nitrogen-flushed barrier bags.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Culinary */}
          {activeTab === "culinary" && (
            <div className="space-y-6 max-w-4xl">
              <h3 className="font-serif text-2xl font-bold text-[#143627]">
                Tasting Notes &amp; Chef Applications
              </h3>
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#87978f] mb-2.5">
                  Flavor Profile
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes?.map((note) => (
                    <span
                      key={note}
                      className="px-3.5 py-1.5 rounded-full bg-[#f3eee4] text-[#143627] text-xs font-semibold border border-[#e6dfd5]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#87978f] mb-2.5">
                  Recommended Culinary Uses
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#143627]">
                  {product.culinaryUses?.map((use) => (
                    <li
                      key={use}
                      className="flex items-center gap-2 p-3 rounded-xl bg-[#faf7f2] border border-[#e6dfd5]"
                    >
                      <Check className="w-4 h-4 text-[#c69238] shrink-0" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Specifications */}
          {activeTab === "specifications" && (
            <div className="space-y-6 max-w-3xl">
              <h3 className="font-serif text-2xl font-bold text-[#143627]">
                Product Specifications
              </h3>
              <div className="rounded-2xl border border-[#e6dfd5] overflow-hidden text-sm">
                <div className="grid grid-cols-2 p-3.5 bg-[#faf7f2] border-b border-[#e6dfd5]">
                  <span className="font-semibold text-[#5c6c64]">Ingredients</span>
                  <span className="text-[#143627]">{product.ingredients}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-white border-b border-[#e6dfd5]">
                  <span className="font-semibold text-[#5c6c64]">Estate Location</span>
                  <span className="text-[#143627]">{product.origin}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-[#faf7f2] border-b border-[#e6dfd5]">
                  <span className="font-semibold text-[#5c6c64]">Shelf Life</span>
                  <span className="text-[#143627]">{product.shelfLife}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-white border-b border-[#e6dfd5]">
                  <span className="font-semibold text-[#5c6c64]">Storage Advice</span>
                  <span className="text-[#143627]">
                    Store in a cool, dry place away from direct sunlight in an airtight glass or resealable pouch.
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3.5 bg-[#faf7f2]">
                  <span className="font-semibold text-[#5c6c64]">Chemicals / Preservatives</span>
                  <span className="text-emerald-700 font-bold">Zero (100% Unadulterated)</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#e6dfd5]">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#143627]">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-[#143627]">
                      {product.rating} out of 5 stars
                    </span>
                  </div>
                </div>
                <button className="px-5 py-2.5 rounded-full bg-[#143627] text-white text-xs font-bold uppercase tracking-wider">
                  Write a Review
                </button>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e6dfd5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#143627]">
                      Dr. Priyadarshini R.
                    </span>
                    <span className="text-xs text-[#87978f]">1 week ago</span>
                  </div>
                  <div className="flex text-amber-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#5c6c64] leading-relaxed">
                    Extraordinary aroma! The difference between store-bought and this single-origin batch is night and day. Will be subscribing regularly.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e6dfd5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#143627]">
                      Chef Vikram S.
                    </span>
                    <span className="text-xs text-[#87978f]">3 weeks ago</span>
                  </div>
                  <div className="flex text-amber-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#5c6c64] leading-relaxed">
                    Clean, fragrant, and meticulously graded. Used it in our signature Sunday family biryani and everyone noticed the heightened fragrance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Spices */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#c69238] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curated Pairings</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#143627]">
                  You May Also Like
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-wider text-[#143627] hover:text-[#c69238]"
              >
                View Catalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
