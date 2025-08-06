
if (location.pathname.endsWith("editor.html")) {
  getWorkerUrl: function (moduleId, label) {
      return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = { baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/' };
        importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs/base/worker/workerMain.js');`
      )}`;
    }
  };
  require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
  monaco.editor.create(document.getElementById('container'), {
    value: '',
    language: 'html',
    theme: 'vs-dark',
    experimental: {
      domReadOnly: false,
      useTouchEvents: true
    }
  });
});

    };
    let current = "html";
    document.querySelectorAll(".tab-btn").forEach(btn => {
      const lang = btn.dataset.lang;
      if (lang !== "html") {
        editors[lang] = monaco.editor.create(document.getElementById("editor"), {
          value: `/* ${lang} */`, language: lang, theme: "vs-dark"
        });
        editors[lang].getDomNode().style.display = "none";
      }
      btn.addEventListener("click", () => {
        editors[current].getDomNode().style.display = "none";
        btn.parentNode.querySelector(".active").classList.remove("active");
        btn.classList.add("active");
        editors[lang].getDomNode().style.display = "block";
        current = lang;
      });
    });
    document.getElementById("feedback-btn").addEventListener("click", () => {
      window.location.href = "feedback.html";
    });
    document.getElementById("run-btn").onclick = () => {
      const html = editors.html.getValue();
      const css = editors.css.getValue();
      const js = editors.js.getValue();
      const src = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
      document.getElementById("output").srcdoc = src;
    };

    document.getElementById("download-btn").onclick = () => {
      const blob = new Blob([editors[current].getValue()], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = current + ".txt";
      a.click();
    };

    document.getElementById("open-btn").onclick = () => {
      document.getElementById("fileInput").click();
    };

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

    document.getElementById("logout-btn").onclick = () => {
      location.href = "login.html";
    };
  });
}
