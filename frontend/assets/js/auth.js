console.log("auth.js loaded ✅");

// ----------------------
// SIGNUP PAGE HANDLER
// ----------------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  console.log("Signup form found ✅");

  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Signup form submitted ✅");

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
      console.log("Signup response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/pages/dashboard.html";
      } else {
        alert(data.message || "Signup failed ❌");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong while signing up.");
    }
  });
}

// ----------------------
// LOGIN PAGE HANDLER
// ----------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  console.log("Login form found ✅");

  loginForm.addEventListener("submit", async function (e) {
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
}
