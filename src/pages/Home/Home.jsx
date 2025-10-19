// src/pages/Home/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const sections = [
    {
      title: "Components Gallery",
      description: "Discover reusable React components with copy-paste code",
      path: "/components",
      icon: "🧩",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "CSS Snippets Hub",
      description: "Collection of useful CSS snippets for modern designs",
      path: "/snippets",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "UI Blocks Library",
      description: "Ready-to-use UI sections and page templates",
      path: "/templates",
      icon: "📚",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Effects Lab",
      description: "Interactive CSS effects and animations",
      path: "/effects",
      icon: "✨",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Color Utilities",
      description: "Beautiful color palettes and gradient generators",
      path: "/colors",
      icon: "🌈",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Code<span className="text-amber-400" >Mint</span>
            </h1>
            <p className="text-amber-200 text-md md:text-xl dark:text-amber-200 mb-8 max-w-3xl mx-auto">
              Design faster. Build smarter.
            </p>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              An open-source hub for frontend developers. Discover, learn, and
              contribute components, snippets, and effects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/components"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Link to={section.path} className="block group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full border border-gray-200 dark:border-gray-700">
                    <div
                      className={`h-2 bg-gradient-to-r ${section.color} rounded-t-xl`}
                    ></div>
                    <div className="p-6">
                      <div className="text-4xl mb-4">{section.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
