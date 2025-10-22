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
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
              Code<span className="text-amber-300">Mint</span>
            </h1>
            <p className="text-amber-100 text-lg md:text-2xl mb-4 max-w-3xl mx-auto font-medium">
              Design faster. Build smarter.
            </p>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
              An open-source hub for frontend developers. Discover, learn, and
              contribute components, snippets, and effects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/components"
                className="group relative px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl"
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
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  delay: index * 0.1 + 0.5,
                  duration: 0.3,
                }}
              >
                <Link to={section.path} className="block group">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 h-full border border-gray-200 dark:border-slate-700 overflow-hidden transform-gpu perspective-1000">
                    <div
                      className={`h-3 bg-gradient-to-r ${section.color}`}
                    ></div>
                    <div className="p-8">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {section.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
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
