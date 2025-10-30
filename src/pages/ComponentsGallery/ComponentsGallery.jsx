// src/pages/ComponentsGallery/ComponentsGallery.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import componentsData from "../../data/components.json";
import { copyToClipboard } from "../../utils/copyToClipboard";

// Vite's glob import - this gets all .jsx files in the components directory
const componentModules = import.meta.glob("./components/*.jsx", {
  eager: true,
  query: "?raw",
});

// Alternative: if the above doesn't work, use this:
// const componentModules = import.meta.glob('./components/*.jsx', { eager: true })

const ComponentsGallery = () => {
  const [components, setComponents] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sourceCodes, setSourceCodes] = useState({});

  useEffect(() => {
    const loadComponents = async () => {
      try {
        // Load component modules
        const modules = await Promise.all(
          componentsData.map(async (comp) => {
            try {
              // Method 1: Using dynamic import with raw query
              const module = await import(`./components/${comp.path}.jsx?raw`);
              return { ...comp, sourceCode: module.default };
            } catch (error) {
              console.warn(`Failed to load source for ${comp.path}:`, error);

              // Method 2: Fallback to static analysis
              try {
                const response = await fetch(
                  `/src/pages/ComponentsGallery/components/${comp.path}.jsx`
                );
                if (response.ok) {
                  const sourceCode = await response.text();
                  return { ...comp, sourceCode };
                }
              } catch (fetchError) {
                console.error(`Fetch failed for ${comp.path}:`, fetchError);
              }

              return { ...comp, sourceCode: "// Source code not available" };
            }
          })
        );

        // Load components for display
        const displayComponents = await Promise.all(
          componentsData.map(async (comp) => {
            try {
              const module = await import(`./components/${comp.path}.jsx`);
              return { ...comp, Component: module.default };
            } catch (error) {
              console.error(`Failed to load component ${comp.path}:`, error);
              return {
                ...comp,
                Component: () => <div>Component failed to load</div>,
              };
            }
          })
        );

        setComponents(displayComponents);

        // Create source code mapping
        const codeMap = {};
        modules.forEach((module) => {
          codeMap[module.path] = module.sourceCode;
        });
        setSourceCodes(codeMap);
      } catch (error) {
        console.error("Error loading components:", error);
      }
    };

    loadComponents();
  }, []);

  const allTags = [...new Set(componentsData.flatMap((comp) => comp.tags))];
  const filteredComponents =
    selectedTags.length === 0
      ? components
      : components.filter((comp) =>
          comp.tags.some((tag) => selectedTags.includes(tag))
        );

  const handleCopyCode = async (componentPath) => {
    const sourceCode = sourceCodes[componentPath];
    if (sourceCode && sourceCode !== "// Source code not available") {
      // Clean the source code - remove Vite specific code
      const cleanCode = cleanSourceCode(sourceCode);
      await copyToClipboard(cleanCode);
    } else {
      alert("Source code not available for this component");
    }
  };

  // Function to clean Vite-specific code from source
  const cleanSourceCode = (code) => {
    // Remove Vite's hot module replacement code
    let cleanCode = code.replace(/import\.meta\.hot.*?}\s*$/s, "");

    // Remove source map comments
    cleanCode = cleanCode.replace(/\/\/# sourceMappingURL=.*$/gm, "");

    // Remove Vite preamble
    cleanCode = cleanCode.replace(/import.*vite.*client.*/g, "");
    cleanCode = cleanCode.replace(/import.*jsxDevRuntime.*/g, "");
    cleanCode = cleanCode.replace(/\$RefreshReg\$.*/g, "");
    cleanCode = cleanCode.replace(/\$RefreshSig\$.*/g, "");

    // Trim extra whitespace
    return cleanCode.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Components Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover and reuse beautiful React components. Click the copy button
            to get the code!
          </p>
        </motion.div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
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
              className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComponents.map((component, index) => (
            <motion.div
              key={component.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 group"
            >
              <div className="p-8 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 flex justify-center items-center min-h-[150px]">
                <component.Component />
              </div>
              <div className="p-6 bg-white dark:bg-slate-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all">
                  {component.title}
                </h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {component.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    className="text-sm text-gray-500 dark:text-gray-400 "
                    href={
                      component.contributor_github
                        ? component.contributor_github
                        : "https://github.com/roshansuthar1105"
                    }
                    target="_blank"
                  >
                    by{" "}
                    <span className=" hover:text-purple-400 cursor-pointer hover:underline ">
                      {" "}
                      {component.contributor}{" "}
                    </span>
                  </a>
                  <button
                    onClick={() => handleCopyCode(component.path)}
                    disabled={
                      !sourceCodes[component.path] ||
                      sourceCodes[component.path] ===
                        "// Source code not available"
                    }
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    Copy Code
                  </button>
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
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border overflow-auto border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How to Contribute
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Want to add your component to the gallery? Here's how:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                Create a new <code>.jsx</code> file in{" "}
                <code>src/pages/ComponentsGallery/components/</code>
              </li>
              <li>Export your component as default from the file</li>
              <li>
                Add your component metadata to{" "}
                <code>src/data/components.json</code>
              </li>
              <li>Submit a pull request with your changes</li>
            </ol>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Make sure your component is responsive, accessible, and follows
              React best practices!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComponentsGallery;
