// Enable Monaco Editor loader
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

let editor;
let currentLang = "html";
const defaultContent = {
  html: '<!-- HTML -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>',
  css: '/* CSS */\nbody {\n  font-family: Arial;\n}',
  js: '// JavaScript\nconsole.log("Hello, world!");'
};

require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: defaultContent[currentLang],
    language: currentLang,
    theme: "vs-dark",
    automaticLayout: true
  });

  // Touch support fix
  editor.updateOptions({ accessibilitySupport: "on" });
});

// Tab Switching (FIXED)
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Save current content before switching
    defaultContent[currentLang] = editor.getValue();

    // Now switch tab
    currentLang = btn.dataset.lang;
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Set new content
    editor.setValue(defaultContent[currentLang]);
    monaco.editor.setModelLanguage(editor.getModel(), currentLang);
  });
});

// Run Button
const runBtn = document.getElementById("run-btn");
runBtn.addEventListener("click", () => {
  const html = defaultContent.html;
  const css = `<style>${defaultContent.css}</style>`;
  const js = `<script>${defaultContent.js}<\/script>`;
  const result = html.replace('</head>', `${css}</head>`).replace('</body>', `${js}</body>`);
  const output = document.getElementById("output");
  output.srcdoc = result;
});

// Download Button
const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", () => {
  const content = {
    html: defaultContent.html,
    css: defaultContent.css,
    js: defaultContent.js
  };
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "code-snippet.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Open File Button
const fileInput = document.getElementById("fileInput");
const openBtn = document.getElementById("open-btn");
openBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const content = JSON.parse(event.target.result);
      if (content.html && content.css && content.js) {
        defaultContent.html = content.html;
        defaultContent.css = content.css;
        defaultContent.js = content.js;
        editor.setValue(defaultContent[currentLang]);
        monaco.editor.setModelLanguage(editor.getModel(), currentLang);
      } else {
        alert("Invalid file format.");
      }
    } catch (err) {
      alert("Error reading file.");
    }
  };
  reader.readAsText(file);
});

// Feedback Button
const feedbackBtn = document.getElementById("feedback-btn");
feedbackBtn.addEventListener("click", () => {
  window.location.href = "/pages/feedback.html";
});

