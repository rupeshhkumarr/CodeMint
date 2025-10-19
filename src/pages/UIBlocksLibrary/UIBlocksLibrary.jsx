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
  const [sourceCodes, setSourceCodes] = useState({});

  const blockComponents = {
    HeroSection,
    PricingCards,
  };

  useEffect(() => {
    const loadBlocks = async () => {
      try {
        // Load block components for display
        const displayBlocks = blocksData.map((block) => ({
          ...block,
          Component:
            blockComponents[block.path] || (() => <div>Block not found</div>),
        }));

        // Load source codes for copying
        const sourceCodePromises = blocksData.map(async (block) => {
          try {
            // Method 1: Using dynamic import with raw query
            const module = await import(`./blocks/${block.path}.jsx?raw`);
            return { path: block.path, sourceCode: module.default };
          } catch (error) {
            console.warn(`Failed to load source for ${block.path}:`, error);

            // Method 2: Fallback to fetch
            try {
              const response = await fetch(
                `/src/pages/UIBlocksLibrary/blocks/${block.path}.jsx`
              );
              if (response.ok) {
                const sourceCode = await response.text();
                return { path: block.path, sourceCode };
              }
            } catch (fetchError) {
              console.error(`Fetch failed for ${block.path}:`, fetchError);
            }

            return {
              path: block.path,
              sourceCode: "// Source code not available",
            };
          }
        });

        const sourceCodeResults = await Promise.all(sourceCodePromises);
        const codeMap = {};
        sourceCodeResults.forEach((result) => {
          codeMap[result.path] = result.sourceCode;
        });

        setBlocks(displayBlocks);
        setSourceCodes(codeMap);
      } catch (error) {
        console.error("Error loading blocks:", error);
      }
    };

    loadBlocks();
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

  // Function to clean Vite-specific code from source
  const cleanSourceCode = (code) => {
    if (!code || code === "// Source code not available") return code;

    // Remove Vite's hot module replacement code
    let cleanCode = code.replace(/import\.meta\.hot.*?}\s*$/s, "");

    // Remove source map comments
    cleanCode = cleanCode.replace(/\/\/# sourceMappingURL=.*$/gm, "");

    // Remove Vite preamble
    cleanCode = cleanCode.replace(/import.*vite.*client.*/g, "");
    cleanCode = cleanCode.replace(/import.*jsxDevRuntime.*/g, "");
    cleanCode = cleanCode.replace(/\$RefreshReg\$.*/g, "");
    cleanCode = cleanCode.replace(/\$RefreshSig\$.*/g, "");

    // Remove React import if it's the only import and we're using JSX
    cleanCode = cleanCode.replace(/import React.*?;?\s*/g, "");

    // Trim extra whitespace and clean up
    cleanCode = cleanCode.trim();

    // Ensure proper formatting
    const lines = cleanCode.split("\n");
    const filteredLines = lines.filter((line) => {
      return (
        !line.includes("@vite") &&
        !line.includes("vite_") &&
        !line.includes("RefreshRuntime") &&
        !line.includes("$RefreshReg$") &&
        !line.includes("$RefreshSig$") &&
        !line.includes("sourceMappingURL")
      );
    });

    return filteredLines.join("\n").trim();
  };

  const handleCopyCode = async (blockPath) => {
    const sourceCode = sourceCodes[blockPath];
    if (sourceCode && sourceCode !== "// Source code not available") {
      const cleanCode = cleanSourceCode(sourceCode);
      await copyToClipboard(cleanCode);
    } else {
      // Fallback: try direct fetch as last resort
      try {
        const response = await fetch(
          `/src/pages/UIBlocksLibrary/blocks/${blockPath}.jsx`
        );
        if (response.ok) {
          const sourceCode = await response.text();
          const cleanCode = cleanSourceCode(sourceCode);
          await copyToClipboard(cleanCode);
        } else {
          alert("Source code not available for this block");
        }
      } catch (error) {
        console.error("Final fallback failed:", error);
        alert("Could not load source code for this block");
      }
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
                  <a className="text-sm text-gray-500 dark:text-gray-400 " href={block.contributor_github ? block.contributor_github : "https://github.com/roshansuthar1105"} target="_blank" >
                    by <span className=" hover:text-purple-400 cursor-pointer hover:underline " > {block.contributor} </span>
                  </a>
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
                  disabled={
                    !sourceCodes[block.path] ||
                    sourceCodes[block.path] === "// Source code not available"
                  }
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
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
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Example block structure:
              </p>
              <pre className="text-sm text-gray-700 dark:text-gray-300">
                {`// blocks/YourBlock.jsx
const YourBlock = () => {
  return (
    <section className="your-styles">
      {/* Your block content */}
    </section>
  );
};

export default YourBlock;`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UIBlocksLibrary;
