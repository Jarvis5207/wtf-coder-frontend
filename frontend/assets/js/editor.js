// Load saved content if available
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("html-code").value = localStorage.getItem("html") || "";
  document.getElementById("css-code").value = localStorage.getItem("css") || "";
  document.getElementById("js-code").value = localStorage.getItem("js") || "";
  updatePreview();
});

// Update preview when user types
document.querySelectorAll("textarea").forEach(area => {
  area.addEventListener("input", () => {
    localStorage.setItem("html", document.getElementById("html-code").value);
    localStorage.setItem("css", document.getElementById("css-code").value);
    localStorage.setItem("js", document.getElementById("js-code").value);
    updatePreview();
  });

  // Add Tab key support
  area.addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
      this.value = this.value.substring(0, start) + "  " + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 2;
    }
  });
});

// Preview function
function updatePreview() {
  const html = document.getElementById("html-code").value;
  const css = `<style>${document.getElementById("css-code").value}</style>`;
  const js = `<script>${document.getElementById("js-code").value}<\/script>`;
  const output = document.getElementById("output");

  output.srcdoc = html + css + js;
}
