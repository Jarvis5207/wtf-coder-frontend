const token = localStorage.getItem("token");
if (!token) {
  alert("Not logged in!");
  window.location.href = "index.html";
}

async function fetchProjects() {
  const res = await fetch("https://wtf-coder-backend.onrender.com/api/projects", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const list = document.getElementById("projectList");
  list.innerHTML = "";
  data.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.style.cursor = "pointer";
    li.onclick = () => {
      localStorage.setItem("projectId", project._id);
      window.location.href = "editor.html";
    };
    list.appendChild(li);
  });
}

document.getElementById("createProjectForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("projectName").value;
  await fetch("https://wtf-coder-backend.onrender.com/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  fetchProjects();
  document.getElementById("projectName").value = "";
});

fetchProjects();
