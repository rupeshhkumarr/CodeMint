// src/pages/UIBlocksLibrary/blocks/ModernCard.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ModernCard = ({ refreshCount = 0 }) => {
  const [cardData, setCardData] = useState({
    title: "Lightning Fast",
    subtitle: "Performance",
    description: "Experience blazing fast performance with our optimized components built for modern web applications.",
    speed: "99.9%",
    latency: "50ms"
  });

  useEffect(() => {
    const titles = ["Lightning Fast", "High Performance", "Ultra Responsive", "Blazing Speed"];
    const subtitles = ["Performance", "Speed", "Efficiency", "Reliability"];
    const descriptions = [
      "Experience blazing fast performance with our optimized components built for modern web applications.",
      "Get the best performance with our carefully crafted components designed for modern web applications.",
      "Enjoy exceptional speed and reliability with our performance-optimized components.",
      "Achieve maximum efficiency with our high-performance components built for scale."
    ];
    
    const randomSpeed = (Math.random() * 5 + 95).toFixed(1);
    const randomLatency = Math.floor(Math.random() * 100) + 10;

    setCardData({
      title: titles[Math.floor(Math.random() * titles.length)],
      subtitle: subtitles[Math.floor(Math.random() * subtitles.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      speed: `${randomSpeed}%`,
      latency: `${randomLatency}ms`
    });
  }, [refreshCount]);

  const handleGetStarted = () => {
    toast(`Starting with ${cardData.speed} uptime and ${cardData.latency} latency!`);
  };

  const handleLearnMore = () => {
    const benefits = ["Auto-scaling", "Real-time monitoring", "Advanced caching", "CDN integration"];
    const randomBenefit = benefits[Math.floor(Math.random() * benefits.length)];
    toast(`Learn about our ${randomBenefit} feature!`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cardData.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{cardData.subtitle}</p>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {cardData.description}
        </p>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{cardData.speed}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Uptime</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{cardData.latency}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Latency</div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={handleGetStarted}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 transform hover:scale-105"
          >
            Get Started
          </button>
          <button 
            onClick={handleLearnMore}
            className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 transform hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernCard;