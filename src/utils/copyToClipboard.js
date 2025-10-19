// src/utils/copyToClipboard.js
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);

    // Show success message
    const toast = document.createElement("div");
    toast.textContent = "Copied to clipboard!";
    toast.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in";
    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2000);

    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    const toast = document.createElement("div");
    toast.textContent = "Copied to clipboard!";
    toast.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    document.body.appendChild(toast);

    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2000);

    return true;
  }
};
