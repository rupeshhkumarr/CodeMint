// src/pages/Contribute/Contribute.jsx
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaPalette, FaMagic } from "react-icons/fa";
import { RiGradienterLine } from "react-icons/ri";
import toast from "react-hot-toast";
const ContributionTypeSelector = ({ selectedType, onTypeChange }) => {
  const types = [
    {
      id: "effect",
      name: "CSS Effect",
      icon: FaMagic,
      description: "Interactive CSS effects and animations"
    },
    {
      id: "snippet",
      name: "CSS Snippet",
      icon: FaCode,
      description: "Reusable CSS code snippets"
    },
    {
      id: "palette",
      name: "Color Palette",
      icon: FaPalette,
      description: "Beautiful color combinations"
    },
    {
      id: "gradient",
      name: "Gradient",
      icon: RiGradienterLine,
      description: "Smooth color gradients"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {types.map((type) => {
        const IconComponent = type.icon;
        return (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTypeChange(type.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedType === type.id
                ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-400"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${
                selectedType === type.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {type.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {type.description}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
};

const EffectForm = ({ formData, onFormChange, onJsonOutput }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const jsonOutput = {
      name: formData.name,
      type: formData.type,
      previewClass: formData.previewClass,
      css: formData.css.replace(/\n/g, "\n"),
      html: formData.html,
      js: formData.js,
      contributor: formData.contributor,
      contributor_github: formData.contributor_github,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    };

    onJsonOutput(jsonOutput);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Effect Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => onFormChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Hover Underline"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => onFormChange("type", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select type</option>
            <option value="animation">Animation</option>
            <option value="interaction">Interaction</option>
            <option value="hover">Hover</option>
            <option value="transition">Transition</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preview Class *
        </label>
        <input
          type="text"
          required
          value={formData.previewClass}
          onChange={(e) => onFormChange("previewClass", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="hover-underline"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          CSS Code *
        </label>
        <textarea
          required
          rows={8}
          value={formData.css}
          onChange={(e) => onFormChange("css", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
          placeholder=".your-class { property: value; }"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          HTML Structure *
        </label>
        <textarea
          required
          rows={4}
          value={formData.html}
          onChange={(e) => onFormChange("html", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
          placeholder='<div class="your-class">Content</div>'
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          JavaScript Code
        </label>
        <textarea
          rows={4}
          value={formData.js}
          onChange={(e) => onFormChange("js", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
          placeholder="// Optional JavaScript code"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags *
          </label>
          <input
            type="text"
            required
            value={formData.tags}
            onChange={(e) => onFormChange("tags", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="hover, underline, text, interaction"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Separate tags with commas
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your GitHub URL *
          </label>
          <input
            type="url"
            required
            value={formData.contributor_github}
            onChange={(e) => onFormChange("contributor_github", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="https://github.com/yourusername"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Generate JSON
        </button>
        <button
          type="button"
          onClick={() => {
            onFormChange("name", "Hover Underline");
            onFormChange("type", "interaction");
            onFormChange("previewClass", "hover-underline");
            onFormChange("css", `.hover-underline {\n  position: relative;\n  text-decoration: none;\n  color: #fff;\n  font-size: 1.2rem;\n  padding: 10px 0;\n}\n.hover-underline::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background: linear-gradient(45deg, #667eea, #764ba2);\n  transition: width 0.3s ease;\n}\n.hover-underline:hover::after {\n  width: 100%;\n}`);
            onFormChange("html", '<a href="#" class="hover-underline">Hover to underline</a>');
            onFormChange("js", "");
            onFormChange("tags", "hover, underline, text, interaction");
            onFormChange("contributor", "Roshan Suthar");
            onFormChange("contributor_github", "https://github.com/roshansuthar1105");
          }}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Load Example
        </button>
      </div>
    </motion.form>
  );
};

const JsonOutput = ({ jsonOutput, onCopy }) => {
  if (!jsonOutput) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 bg-gray-900 rounded-xl border border-gray-700"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Generated JSON</h3>
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Copy JSON
        </button>
      </div>
      <pre className="text-green-400 text-sm overflow-x-auto">
        <code>{JSON.stringify(jsonOutput, null, 2)}</code>
      </pre>
      <p className="text-gray-400 text-sm mt-3">
        Copy this JSON and add it to the appropriate data file in your pull request.
      </p>
    </motion.div>
  );
};

const Contribute = () => {
  const [selectedType, setSelectedType] = useState("effect");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    previewClass: "",
    css: "",
    html: "",
    js: "",
    contributor: "",
    contributor_github: "",
    tags: ""
  });
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleFormChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleJsonOutput = useCallback((output) => {
    setJsonOutput(output);
  }, []);

  const handleCopyJson = useCallback(async () => {
    if (jsonOutput) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
        toast.success("JSON copied to clipboard!")
      } catch (err) {
        console.error("Failed to copy JSON: ", err);
      }
    }
  }, [jsonOutput]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Contribute to Codemint
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Share your creative components, effects, and utilities with the community.
            Fill out the form below to generate the proper JSON format for your contribution.
          </p>
        </motion.div>

        {/* Type Selection */}
        <ContributionTypeSelector
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        {/* Dynamic Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          {selectedType === "effect" && (
            <EffectForm
              formData={formData}
              onFormChange={handleFormChange}
              onJsonOutput={handleJsonOutput}
            />
          )}
          
          {/* Add similar form components for other types (snippet, palette, gradient) */}
          {selectedType !== "effect" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <FaCode className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} contribution form is under development.
              </p>
            </motion.div>
          )}
        </div>

        {/* JSON Output */}
        <JsonOutput jsonOutput={jsonOutput} onCopy={handleCopyJson} />

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            How to Submit Your Contribution
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Fill out the form above with your contribution details</li>
            <li>Generate the JSON output using the form</li>
            <li>Fork the Codemint repository on GitHub</li>
            <li>Add your generated JSON to the appropriate data file</li>
            <li>Submit a pull request with a clear description</li>
            <li>Our team will review and merge your contribution</li>
          </ol>
          
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <FaGithub className="w-4 h-4" />
              <span>
                Repository:{" "}
                <a
                  href="https://github.com/roshansuthar1105/codemint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  github.com/roshansuthar1105/codemint
                </a>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contribute;