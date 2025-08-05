const apiBase = "";

if (location.pathname.endsWith("login.html")) {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("message");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const identity = form.identity.value;
    const password = form.password.value;
    const resp = await fetch(apiBase + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identity, password })
    });
    if (resp.ok) location.href = "editor.html";
    else {
      const data = await resp.json();
      msg.textContent = data.message || "Login failed";
    }
  });
}

if (location.pathname.endsWith("signup.html")) {
  const form = document.getElementById("signupForm");
  const msg = document.getElementById("message");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const fullname = form.fullname.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const resp = await fetch(apiBase + "/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, phone, password })
    });
    const data = await resp.json();
    if (data.success) location.href = "login.html";
    else msg.textContent = data.message || "Signup failed";
  });
}

if (location.pathname.endsWith("editor.html")) {
  require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs" }});
  require(["vs/editor/editor.main"], () => {
    const editors = {
      html: monaco.editor.create(document.getElementById("editor"), {
        value: "<!-- HTML -->",
        language: "html", theme: "vs-dark"
      })
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
