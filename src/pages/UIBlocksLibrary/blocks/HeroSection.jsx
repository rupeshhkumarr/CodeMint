// src/pages/UIBlocksLibrary/blocks/HeroSection.jsx
import { useState, useEffect } from "react";

const HeroSection = ({ refreshCount = 0 }) => {
  const [stats, setStats] = useState({
    users: "50K+",
    speed: "99.9%",
    satisfaction: "4.9/5"
  });

  useEffect(() => {
    // Generate random stats on each refresh
    const randomUsers = Math.floor(Math.random() * 100) + 50;
    const randomSpeed = (Math.random() * 0.5 + 99.5).toFixed(1);
    const randomSatisfaction = (Math.random() * 0.5 + 4.5).toFixed(1);
    
    setStats({
      users: `${randomUsers}K+`,
      speed: `${randomSpeed}%`,
      satisfaction: `${randomSatisfaction}/5`
    });
  }, [refreshCount]);

  const handleGetStarted = () => {
    alert(`Welcome! Starting with ${stats.users} users already onboard!`);
  };

  const handleLearnMore = () => {
    const features = [
      "AI-powered analytics",
      "Real-time collaboration",
      "Advanced security",
      "Custom integrations"
    ];
    const randomFeature = features[Math.floor(Math.random() * features.length)];
    alert(`Discover our ${randomFeature} feature!`);
  };

  return (
    <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-12 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          Welcome to Our Platform
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
          Build amazing experiences with our cutting-edge solutions. Fast, reliable, and developer-friendly.
        </p>
        
        {/* Interactive Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-8 md:mb-12">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">{value}</div>
              <div className="text-xs md:text-sm text-white/80 capitalize">
                {key === 'speed' ? 'Uptime' : key}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
          <button 
            onClick={handleGetStarted}
            className="cursor-pointer bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg"
          >
            Get Started
          </button>
          <button 
            onClick={handleLearnMore}
            className="cursor-pointer border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105 text-base sm:text-lg"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;