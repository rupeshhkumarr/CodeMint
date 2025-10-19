// src/pages/UIBlocksLibrary/blocks/HeroSection.jsx
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Build amazing experiences with our cutting-edge solutions. Fast,
          reliable, and developer-friendly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="cursor-pointer bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Get Started
          </button>
          <button className="cursor-pointer border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
