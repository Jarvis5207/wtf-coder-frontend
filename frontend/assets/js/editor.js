const files = {
  "index.html": "<!DOCTYPE html>\n<html>\n<head>\n  <title>Hello</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
  "style.css": "body { background-color: #f4f4f4; color: #333; }",
  "script.js": "console.log('Hello from JS');"
};

let currentFile = "index.html";
let editorInstance;

require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' }});
require(['vs/editor/editor.main'], function () {
  editorInstance = monaco.editor.create(document.getElementById('editor'), {
    value: files[currentFile],
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true
  });

  editorInstance.onDidChangeModelContent(() => updateLivePreview());
  openFile(currentFile);
});

function openFile(filename) {
  currentFile = filename;

  let lang = filename.endsWith('.js') ? 'javascript' :
             filename.endsWith('.css') ? 'css' : 'html';

  if (!files[filename]) files[filename] = "";

  const oldModel = editorInstance.getModel();
  const newModel = monaco.editor.createModel(files[filename], lang);
  editorInstance.setModel(newModel);
  if (oldModel) oldModel.dispose();

  updateTabs();
  updateLivePreview();
}

function updateTabs() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = `<div class="tab">${currentFile}</div>`;
}

function updateLivePreview() {
  if (currentFile === "index.html") {
    const html = editorInstance.getValue();
    document.getElementById("livePreview").srcdoc = html;
  }
}
