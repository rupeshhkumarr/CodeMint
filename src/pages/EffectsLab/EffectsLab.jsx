// src/pages/EffectsLab/EffectsLab.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import effectsData from "../../data/effects.json";
import { copyToClipboard } from "../../utils/copyToClipboard";

const EffectsLab = () => {
  const [effects] = useState(effectsData);
  const [selectedType, setSelectedType] = useState("all");

  const types = ["all", ...new Set(effects.map((effect) => effect.type))];

  const filteredEffects =
    selectedType === "all"
      ? effects
      : effects.filter((effect) => effect.type === selectedType);

  const handleCopyCode = async (cssCode) => {
    await copyToClipboard(cssCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Effects Lab
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive CSS effects and animations. Copy the CSS and bring your
            designs to life!
          </p>
        </motion.div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedType === type
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Effects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEffects.map((effect, index) => (
            <motion.div
              key={effect.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {effect.name}
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm rounded-full">
                    {effect.type}
                  </span>
                </div>

                {/* Effect Preview */}
                <div className="mb-4 p-8 bg-gray-100 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600 flex justify-center items-center min-h-[120px]">
                  <div
                    className={`cursor-pointer text-center p-4 bg-white dark:bg-gray-200 rounded-lg shadow-md ${effect.previewClass}`}
                    style={{
                      minWidth: "100px",
                      minHeight: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <style>{effect.css}</style>
                    Hover Me
                  </div>
                </div>

                {/* CSS Code */}
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{effect.css}</code>
                  </pre>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {effect.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a className="text-sm text-gray-500 dark:text-gray-400 " href={effect.contributor_github ? effect.contributor_github : "https://github.com/roshansuthar1105"} target="_blank" >
                    by <span className=" hover:text-purple-400 cursor-pointer hover:underline " > {effect.contributor} </span>
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
                <button
                  onClick={() => handleCopyCode(effect.css)}
                  className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  ✨ Copy Effect CSS
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How to Contribute Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How to Contribute Effects
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Share your creative CSS effects and animations:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                Edit <code>src/data/effects.json</code>
              </li>
              <li>Add a new effect object with CSS code and preview class</li>
              <li>Include type, tags, and your username</li>
              <li>Submit a pull request</li>
            </ol>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
                {`{
  "name": "Your Effect Name",
  "type": "animation",
  "previewClass": "your-effect",
  "css": "your css here",
  "contributor": "yourname",
  "contributor_github": "yourgithuburl",
  "tags": ["animation", "hover"]
}`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EffectsLab;
