// src/pages/UIBlocksLibrary/UIBlocksLibrary.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import blocksData from "../../data/blocks.json";
import { copyToClipboard } from "../../utils/copyToClipboard";

// Import block components
import HeroSection from "./blocks/HeroSection";
import PricingCards from "./blocks/PricingCards";

const UIBlocksLibrary = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [previewSize, setPreviewSize] = useState("desktop"); // 'mobile', 'tablet', 'desktop'

  const blockComponents = {
    HeroSection,
    PricingCards,
  };

  useEffect(() => {
    const loadedBlocks = blocksData.map((block) => ({
      ...block,
      Component: blockComponents[block.path],
    }));
    setBlocks(loadedBlocks);
  }, []);

  const allTags = [...new Set(blocksData.flatMap((block) => block.tags))];
  const filteredBlocks =
    selectedTags.length === 0
      ? blocks
      : blocks.filter((block) =>
          block.tags.some((tag) => selectedTags.includes(tag))
        );

  const previewSizes = {
    mobile: "max-w-sm",
    tablet: "max-w-md",
    desktop: "max-w-full",
  };

  const handleCopyCode = async (blockPath) => {
    try {
      const response = await fetch(
        `/src/pages/UIBlocksLibrary/blocks/${blockPath}.jsx`
      );
      const code = await response.text();
      await copyToClipboard(code);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
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
            UI Blocks Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready-to-use UI sections and page templates. Copy the code and
            customize for your projects!
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Preview Size Toggle */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            {["mobile", "tablet", "desktop"].map((size) => (
              <button
                key={size}
                onClick={() => setPreviewSize(size)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  previewSize === size
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Blocks Grid */}
        <div className="space-y-12">
          {filteredBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {block.title}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {block.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    by {block.contributor}
                  </span>
                </div>

                {/* Block Preview */}
                <div
                  className={`mx-auto ${previewSizes[previewSize]} border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden`}
                >
                  <div className="bg-white dark:bg-gray-900 p-6">
                    {block.Component ? (
                      <block.Component />
                    ) : (
                      <div>Component not found</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Preview: {previewSize}
                </span>
                <button
                  onClick={() => handleCopyCode(block.path)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  📋 Copy Block Code
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
            How to Contribute UI Blocks
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Add your reusable UI blocks to the library:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                Create a new <code>.jsx</code> file in{" "}
                <code>src/pages/UIBlocksLibrary/blocks/</code>
              </li>
              <li>Export your block component as default</li>
              <li>
                Add block metadata to <code>src/data/blocks.json</code>
              </li>
              <li>
                Import and add your component to the blockComponents object in
                UIBlocksLibrary.jsx
              </li>
              <li>Submit a pull request</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UIBlocksLibrary;
