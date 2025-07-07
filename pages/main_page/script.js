const user = JSON.parse(localStorage.getItem("user"));
const logout = document.getElementById("logOut");
const welcome = document.getElementById("welcome");

if (!user) {
  window.location.href = "../login.html";
} else {
  welcome.innerHTML = `<p>Welcome back, ${user.name}!</p>`;
}

logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "../../index.html";
});

async function countEventsByStatus() {
  try {
    const res = await fetch("http://localhost:3000/events");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    const elements = document.querySelectorAll(".contador-evento");

    elements.forEach(el => {
      const status = el.dataset.estado;
      let count = 0;

      if (status === "todos") {
        count = events.length;
      } else {
        count = events.filter(e => e.estado === status).length;
      }

      el.innerHTML = el.innerHTML.replace("##variable##", count);
    });
  } catch (error) {
    console.error("Error while counting events:", error);
  }
}

async function countEventsByStatus() {
  try {
    const res = await fetch("http://localhost:3000/events");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    const elements = document.querySelectorAll(".event-counter");

    elements.forEach(el => {
      const status = el.dataset.status;
      let count = 0;

      if (status === "total") {
        count = events.length;
      } else {
        count = events.filter(e => e.status?.toLowerCase() === status).length;
      }

      el.innerHTML = el.innerHTML.replace("##variable##", count);
    });
  } catch (error) {
    console.error("Error counting events:", error);
  }
}

async function countMailsAndMessages() {
  const elements = document.querySelectorAll(".contador");

  elements.forEach(async el => {
    const resource = el.dataset.recurso;

    try {
      const res = await fetch(`http://localhost:3000/${resource}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      el.innerHTML = el.innerHTML.replace("##variable##", data.length);
    } catch (err) {
      console.error(`Error fetching ${resource}:`, err);
      el.innerHTML = el.innerHTML.replace("##variable##", "⚠️");
    }
  });
}

countMailsAndMessages();
countEventsByStatus();
countOtherResources();
