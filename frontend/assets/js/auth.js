console.log("auth.js loaded ✅");

const form = document.getElementById("loginForm");

if (form) {
  console.log("Login form found ✅");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Login form submitted ✅");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("https://wtf-coder-backend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      console.log("Login response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/pages/dashboard.html";
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in.");
    }
  });
} else {
  console.warn("Login form not found ❌");
}
