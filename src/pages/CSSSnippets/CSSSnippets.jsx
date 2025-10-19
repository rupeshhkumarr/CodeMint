// src/pages/CSSSnippets/CSSSnippets.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import snippetsData from "../../data/snippets.json";
import { copyToClipboard } from "../../utils/copyToClipboard";

const CSSSnippets = () => {
  const [snippets] = useState(snippetsData);
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const types = ["all", ...new Set(snippets.map((snippet) => snippet.type))];

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesType = selectedType === "all" || snippet.type === selectedType;
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesType && matchesSearch;
  });

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
            CSS Snippets Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Collection of useful CSS snippets for modern designs. Copy and paste
            directly into your projects!
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Snippets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSnippets.map((snippet, index) => (
            <motion.div
              key={snippet.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {snippet.title}
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm rounded-full">
                    {snippet.type}
                  </span>
                </div>

                {/* Preview Box */}
                <div className="mb-4 p-4 bg-gray-100 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className=" cursor-pointer flex justify-center items-center min-h-[80px]">
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: `<style>${snippet.css}</style>
                                <div class="${
                                  snippet.css.includes(".glass")
                                    ? "glass p-4 rounded-lg bg-white/20"
                                    : snippet.css.includes(".neon-glow")
                                    ? "neon-glow text-2xl font-bold"
                                    : "p-4"
                                }">
                                  ${snippet.title} Preview
                                </div>`,
                      }}
                    />
                  </div>
                </div>

                {/* CSS Code */}
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{snippet.css}</code>
                  </pre>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {snippet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a className="text-sm text-gray-500 dark:text-gray-400 " href={snippet.contributor_github ? snippet.contributor_github : "https://github.com/roshansuthar1105"} target="_blank" >
                    by <span className=" hover:text-purple-400 cursor-pointer hover:underline " > {snippet.contributor} </span>
                  </a>

                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
                <button
                  onClick={() => handleCopyCode(snippet.css)}
                  className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  📋 Copy CSS
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
            How to Contribute CSS Snippets
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Share your awesome CSS snippets with the community:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                Edit <code>src/data/snippets.json</code>
              </li>
              <li>Add a new object with your snippet details</li>
              <li>Include the CSS code, type, tags, and your username</li>
              <li>Submit a pull request</li>
            </ol>
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
                {`{
  "title": "Your Snippet Name",
  "css": ".your-class {\\n  property: value;\\n}",
  "type": "effect",
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

export default CSSSnippets;
