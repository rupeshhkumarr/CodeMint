// src/pages/UIBlocksLibrary/blocks/StatsDashboard.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const StatsDashboard = ({ refreshCount = 0 }) => {
  const [stats, setStats] = useState([]);
  const [timeRange, setTimeRange] = useState("Last 7 days");
  const [trendingMetric, setTrendingMetric] = useState("");

  useEffect(() => {
    const generateRandomStats = () => {
      const baseStats = [
        {
          label: "Total Users",
          baseValue: 12400,
          suffix: "K",
          min: 10000,
          max: 20000,
        },
        {
          label: "Revenue",
          baseValue: 48200,
          suffix: "K",
          prefix: "$",
          min: 40000,
          max: 60000,
        },
        { label: "Conversion", baseValue: 4.2, suffix: "%", min: 2, max: 8 },
        {
          label: "Sessions",
          baseValue: 24800,
          suffix: "K",
          min: 20000,
          max: 30000,
        },
      ];

      return baseStats.map((stat) => {
        const randomValue =
          Math.floor(Math.random() * (stat.max - stat.min + 1)) + stat.min;
        const change = ((randomValue - stat.baseValue) / stat.baseValue) * 100;
        const positive = change >= 0;

        const formattedValue = stat.prefix
          ? `${stat.prefix}${(randomValue / 1000).toFixed(1)}${stat.suffix}`
          : `${(stat.label === "Conversion"
              ? randomValue / 10
              : randomValue / 1000
            ).toFixed(1)}${stat.suffix}`;

        return {
          label: stat.label,
          value: formattedValue,
          change: `${positive ? "+" : ""}${Math.abs(change).toFixed(1)}%`,
          positive: positive,
          rawValue: randomValue,
        };
      });
    };

    const newStats = generateRandomStats();
    setStats(newStats);

    // Find trending metric
    const maxChange = Math.max(
      ...newStats.map((s) => Math.abs(parseFloat(s.change)))
    );
    const trending = newStats.find(
      (s) => Math.abs(parseFloat(s.change)) === maxChange
    );
    setTrendingMetric(trending?.label || "Users");
  }, [refreshCount, timeRange]);

  const handleUpgrade = () => {
    const savings = Math.floor(Math.random() * 50) + 20;
    const features = [
      "advanced analytics",
      "real-time data",
      "custom reports",
      "AI insights",
    ];
    const randomFeature = features[Math.floor(Math.random() * features.length)];

    toast(
      `Upgrade to unlock ${randomFeature}! Save ${savings}% with our limited-time offer.`
    );
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Trending:{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              {trendingMetric}
            </span>
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => handleTimeRangeChange(e.target.value)}
          className="bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This year</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-slate-700/50 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-slate-600 hover:shadow-md transition-shadow duration-200"
          >
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
              {stat.label}
            </p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 truncate">
              {stat.value}
            </p>
            <div
              className={`inline-flex items-center text-xs sm:text-sm ${
                stat.positive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              <span>{stat.change}</span>
              <svg
                className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 ${
                  stat.positive ? "" : "rotate-180"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={handleUpgrade}
        className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white cursor-pointer transform hover:scale-105 transition-all duration-200"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm opacity-90">Premium Features Available</p>
            <p className="text-lg font-bold">
              Upgrade to unlock advanced analytics
            </p>
          </div>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap transform hover:scale-110">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
