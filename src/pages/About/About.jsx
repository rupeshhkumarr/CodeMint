// src/pages/About/About.jsx
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: "🧩",
      title: "Component Gallery",
      description:
        "Discover reusable React components with copy-paste ready code.",
    },
    {
      icon: "🎨",
      title: "CSS Snippets",
      description: "Collection of modern CSS snippets for beautiful designs.",
    },
    {
      icon: "📚",
      title: "UI Blocks",
      description: "Ready-to-use UI sections and page templates.",
    },
    {
      icon: "✨",
      title: "Effects Lab",
      description:
        "Interactive CSS effects and animations to enhance your projects.",
    },
    {
      icon: "🌈",
      title: "Color Utilities",
      description: "Beautiful color palettes and gradient generators.",
    },
    {
      icon: "🤝",
      title: "Community Driven",
      description: "Built by and for the developer community.",
    },
  ];

  const stats = [
    { number: "50+", label: "Components" },
    { number: "30+", label: "CSS Snippets" },
    { number: "20+", label: "UI Blocks" },
    { number: "25+", label: "Effects" },
    { number: "15+", label: "Color Palettes" },
    { number: "100+", label: "Contributors" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Frontend Playground
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              An open-source hub where developers discover, learn, and share
              frontend resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Frontend Playground was created to make frontend development more
              accessible and collaborative. We believe in sharing knowledge,
              reusable code, and helping developers of all levels build amazing
              user interfaces faster and more efficiently.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <p className="text-lg text-blue-800 dark:text-blue-200">
                "Every great developer you know got there by solving problems
                they were unqualified to solve until they actually did it."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to build modern, responsive web applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-600"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-br from-green-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Frontend Playground is built by developers like you. Share your
              components, learn from others, and help grow this resource for
              everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/Roshansuthar1105/Frontend-Playground"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Contribute on GitHub
              </a>
              <a
                href="https://discord.com"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                Join Discord
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;