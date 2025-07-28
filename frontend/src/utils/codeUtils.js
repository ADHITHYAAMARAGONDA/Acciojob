// frontend/src/utils/codeUtils.js

// Format JSX code for better readability
export const formatJSX = (jsxCode) => {
  if (!jsxCode) return "";

  // Basic JSX formatting
  let formatted = jsxCode
    .replace(/>\s*</g, ">\n<") // Add line breaks between tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  return formatted;
};

// Format CSS code for better readability
export const formatCSS = (cssCode) => {
  if (!cssCode) return "";

  // Basic CSS formatting
  let formatted = cssCode
    .replace(/;\s*/g, ";\n  ") // Add line breaks after semicolons
    .replace(/\s*{\s*/g, " {\n  ") // Format opening braces
    .replace(/\s*}\s*/g, "\n}\n") // Format closing braces
    .trim();

  return formatted;
};

// Extract component name from JSX
export const extractComponentName = (jsxCode) => {
  if (!jsxCode) return "Component";

  const match = jsxCode.match(/<(\w+)/);
  return match ? match[1] : "Component";
};

// Create a downloadable file
export const createDownloadFile = (content, filename) => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Create a ZIP file with multiple files
export const createZipDownload = (files) => {
  // This is a simplified version - in a real app, you'd use a library like JSZip
  files.forEach(({ content, filename }) => {
    createDownloadFile(content, filename);
  });
};

// Validate JSX syntax (basic validation)
export const validateJSX = (jsxCode) => {
  if (!jsxCode) return { isValid: false, error: "No JSX code provided" };

  // Check for basic JSX structure
  const hasOpeningTag = /<[^>]+>/.test(jsxCode);
  const hasClosingTag = /<\/[^>]+>/.test(jsxCode);

  if (!hasOpeningTag) {
    return { isValid: false, error: "Missing opening tag" };
  }

  return { isValid: true, error: null };
};

// Validate CSS syntax (basic validation)
export const validateCSS = (cssCode) => {
  if (!cssCode) return { isValid: true, error: null };

  // Check for basic CSS structure
  const hasSelector = /[.#]?\w+\s*{/.test(cssCode);
  const hasProperty = /:\s*[^;]+;/.test(cssCode);

  if (!hasSelector) {
    return { isValid: false, error: "Missing CSS selector" };
  }

  return { isValid: true, error: null };
};

// Generate a unique filename
export const generateFilename = (componentName, extension) => {
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${componentName}_${timestamp}.${extension}`;
};
