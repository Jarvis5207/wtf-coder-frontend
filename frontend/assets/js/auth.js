// Signup
document.getElementById("signupForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://wtf-coder-backend.onrender.com/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/pages/dashboard.html"; // ✅ Redirect to dashboard
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("Something went wrong during signup.");
  }
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://wtf-coder-backend.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/pages/dashboard.html"; // ✅ Redirect to dashboard
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong while logging in.");
  }
});
