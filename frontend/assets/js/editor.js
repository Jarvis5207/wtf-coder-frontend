const runButton = document.getElementById("run");
const previewFrame = document.getElementById("preview");

// Get Monaco Editor values
runButton.addEventListener("click", () => {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const fullCode = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;

  previewFrame.srcdoc = fullCode;
});
