// src/pages/ColorUtilities/ColorUtilities.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import colorsData from "../../data/colors.json";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { MdOutlineContentCopy } from "react-icons/md";
const ColorUtilities = () => {
  const [colors] = useState(colorsData);
  const [selectedType, setSelectedType] = useState("all");
  const [copyFeedback, setCopyFeedback] = useState(null);

  const types = ["all", ...new Set(colors.map((color) => color.type))];

  const filteredColors =
    selectedType === "all"
      ? colors
      : colors.filter((color) => color.type === selectedType);

  const handleCopyColor = async (colorValue, format) => {
    let textToCopy = colorValue;

    if (format === "gradient" && Array.isArray(colorValue)) {
      textToCopy = `linear-gradient(45deg, ${colorValue.join(", ")})`;
    } else if (format === "hex" && Array.isArray(colorValue)) {
      textToCopy = colorValue.join(", ");
    }else if(format==="singlehex"){
      textToCopy=colorValue;
    }

    await copyToClipboard(textToCopy);
    setCopyFeedback(`Copied ${format.toUpperCase()}!`);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const getGradientStyle = (colorArray) => {
    return {
      background: `linear-gradient(45deg, ${colorArray.join(", ")})`,
    };
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
            Color Utilities
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Beautiful color palettes and gradients. Copy HEX, RGB, or CSS
            gradient code for your projects!
          </p>
        </motion.div>

        {/* Copy Feedback */}
        {copyFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {copyFeedback}
          </motion.div>
        )}

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedType === type
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredColors.map((color, index) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {color.name}
                  </h3>
                  <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 text-sm rounded-full">
                    {color.type}
                  </span>
                </div>

                {/* Color Preview */}
                <div className="mb-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  {color.type === "gradient" ? (
                    <div
                      className="h-32 w-full"
                      style={getGradientStyle(color.colors)}
                    />
                  ) : (
                    <div className="flex h-32">
                      {color.colors.map((colorHex, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="flex-1"
                          style={{ backgroundColor: colorHex }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Color Swatches */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {color.colors.map((colorHex, colorIndex) => (
                    <div key={colorIndex} className="text-center relative group">
                    <div
                      className="w-8 h-8 rounded-md mx-auto mb-1 border border-gray-300 cursor-pointer relative overflow-hidden"
                      style={{ backgroundColor: colorHex }}
                      onClick={() => handleCopyColor(colorHex, "singlehex")}
                    >
                      {/* Copy icon that appears on hover */}
                      <div className="absolute inset-0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                        <MdOutlineContentCopy className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                      {colorHex}
                    </span>
                  </div>
                  ))}
                </div>

                {/* Copy Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => handleCopyColor(color.colors, "hex")}
                    className="cursor-pointer flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                  >
                    Copy HEX
                  </button>
                  {color.type === "gradient" && (
                    <button
                      onClick={() => handleCopyColor(color.colors, "gradient")}
                      className="cursor-pointer flex-1 bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors duration-200"
                    >
                      Copy Gradient
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {color.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a className="text-sm text-gray-500 dark:text-gray-400 " href={color.contributor_github ? color.contributor_github : "https://github.com/roshansuthar1105"} target="_blank" >
                    by <span className=" hover:text-purple-400 cursor-pointer hover:underline " > {color.contributor} </span>
                  </a>
                </div>
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
            How to Contribute Colors
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Share your beautiful color palettes and gradients:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                Edit <code>src/data/colors.json</code>
              </li>
              <li>Add a new color object with HEX values or gradient colors</li>
              <li>Include type, tags, and your username</li>
              <li>Submit a pull request</li>
            </ol>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
                {`// For color palette
{
  "name": "Your Palette Name",
  "type": "palette",
  "colors": ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
  "contributor": "yourname",
  "contributor_github": "yourgithuburl",
  "tags": ["vibrant", "fresh"]
}

// For gradient
{
  "name": "Your Gradient Name",
  "type": "gradient",
  "colors": ["#667eea", "#764ba2"],
  "contributor": "yourname",
  "contributor_github": "yourgithuburl",
  "tags": ["purple", "smooth"]
}`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ColorUtilities;
