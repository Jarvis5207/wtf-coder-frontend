document.getElementById("feedbackForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const res = await fetch("https://wtf-coder-backend.onrender.com/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      alert("✅ Feedback submitted successfully!");
      document.getElementById("feedbackForm").reset();
    } else {
      alert("❌ Error submitting feedback.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("⚠️ Could not connect to the server.");
  }
});
