export default function HeroSection() {
  return (
    <section className="hero-section">
      <span> Modern furniture in living room</span>
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Timeless Comfort, Crafted for Your Home
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Explore our curated collection of sustainable furniture.
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-[#A97449] font-semibold py-3 px-6 rounded-2xl shadow-md hover:bg-[#f0e6df] transition"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}