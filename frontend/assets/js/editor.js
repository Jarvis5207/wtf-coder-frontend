require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs" }});
require(["vs/editor/editor.main"], () => {
  const editorContainer = document.getElementById("editor");

  const editors = {
    html: monaco.editor.create(editorContainer, {
      value: "<!-- Write your HTML here -->",
      language: "html",
      theme: "vs-dark"
    }),
    css: monaco.editor.create(editorContainer, {
      value: "/* Write your CSS here */",
      language: "css",
      theme: "vs-dark"
    }),
    js: monaco.editor.create(editorContainer, {
      value: "// Write your JavaScript here",
      language: "javascript",
      theme: "vs-dark"
    })
  };

  let current = "html";
  editors.css.getDomNode().style.display = "none";
  editors.js.getDomNode().style.display = "none";

  // Tab Switch
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (!lang || lang === current) return;

      editors[current].getDomNode().style.display = "none";
      editors[lang].getDomNode().style.display = "block";

      document.querySelector(".tab-btn.active")?.classList.remove("active");
      btn.classList.add("active");
      current = lang;
    });
  });

  // Run Output
  document.getElementById("run-btn").addEventListener("click", () => {
    const html = editors.html.getValue();
    const css = editors.css.getValue();
    const js = editors.js.getValue();

    const output = `
      <!DOCTYPE html>
      <html>
        <head><style>${css}</style></head>
        <body>${html}<script>${js}<\/script></body>
      </html>
    `;
    document.getElementById("output").srcdoc = output;
  });

  // Download Current Code
  document.getElementById("download-btn").addEventListener("click", () => {
    const blob = new Blob([editors[current].getValue()], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${current}.txt`;
    a.click();
  });

  // Open File
  document.getElementById("open-btn").addEventListener("click", () => {
    document.getElementById("fileInput").click();
  });

  document.getElementById("fileInput").addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        editors[current].setValue(reader.result);
      };
      reader.readAsText(file);
    }
  });

  // Feedback Button
  document.getElementById("feedback-btn").addEventListener("click", () => {
    const feedback = prompt("Please enter your feedback:");
    if (!feedback) return;

    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback })
    })
    .then(res => {
      if (res.ok) {
        alert("✅ Thank you for your feedback!");
      } else {
        alert("❌ Failed to submit feedback.");
      }
    })
    .catch(() => alert("❌ Error sending feedback."));
  });
});
