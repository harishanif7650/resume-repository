// ====== DATA (from your CV) ======
const projects = [
  {
    title: "Facial Recognition System",
    category: "Robotics",
    description:
      "Python + OpenCV system to detect and recognize human faces; built and tested with live camera input.",
    tags: ["Python", "OpenCV", "Computer Vision"]
  },
  {
    title: "Line Follower Robot",
    category: "Robotics",
    description:
      "Autonomous robot that follows a predefined path using IR sensors and simple control logic.",
    tags: ["Arduino", "IR Sensors", "Robotics"]
  },
  {
    title: "Bluetooth-Controlled Car",
    category: "Robotics",
    description:
      "Phone-controlled car integrating a Bluetooth module with motor driver for real-time control.",
    tags: ["Bluetooth", "Arduino", "Motor Driver"]
  },
  {
    title: "Basics of Drone Technology",
    category: "Robotics",
    description:
      "Hands-on exploration of drone components and flight concepts; frame, ESCs, props, and stabilization.",
    tags: ["Drones", "Flight Concepts"]
  },
  {
    title: "Weather Monitoring App",
    category: "Software",
    description:
      "IoT app for real-time temperature/humidity using sensors, Blynk dashboard, and OpenWeather API.",
    tags: ["Python", "Blynk", "OpenWeather"]
  },
  {
    title: "Restaurant Website",
    category: "Software",
    description:
      "Prototype site with dynamic menus and contact form; structured front-end with clean styling.",
    tags: ["HTML", "CSS", "JS"]
  },
  {
    title: "NGO Reporting Portal",
    category: "Software",
    description:
      "Website for reporting child begging to specific NGOs; includes admin, NGO, and user portals.",
    tags: ["Full-stack", "Auth", "Dashboards"]
  },
  {
    title: "Automated Resume Screening (n8n + OpenAI)",
    category: "Software",
    description:
      "Workflow that ingests resumes and uses OpenAI in n8n for automated filtering and summaries.",
    tags: ["n8n", "OpenAI", "Automation"]
  },
  {
    title: "Python Utility Tools",
    category: "Utilities",
    description:
      "CLI/desktop utilities: file compressor, video downloader, TTS converter, QR + credit-card validators.",
    tags: ["Python", "Utilities"]
  }
];

// ====== RENDER ======
const grid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.getElementById("themeToggle");
const yearSpan = document.getElementById("year");

yearSpan.textContent = new Date().getFullYear();

// mobile nav
navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));

// theme toggle (persists)
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.documentElement.classList.add("light");
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  localStorage.setItem("theme",
    document.documentElement.classList.contains("light") ? "light" : "dark"
  );
});

// create card element
function makeCard(p) {
  const el = document.createElement("article");
  el.className = "card reveal";
  el.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <div class="badges">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <div class="meta">
      <span class="cat"># ${p.category}</span>
      <div class="actions">
        <a class="btn subtle" href="#" aria-disabled="true" title="Demo coming soon">Demo</a>
        <a class="btn subtle" href="#" aria-disabled="true" title="Code coming soon">Code</a>
      </div>
    </div>
  `;
  return el;
}

// render list by query and filter
let activeFilter = "all";
let query = "";
function render() {
  grid.innerHTML = "";
  const q = query.trim().toLowerCase();
  projects
    .filter(p => activeFilter === "all" || p.category === activeFilter)
    .filter(p =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.join(" ").toLowerCase().includes(q)
    )
    .forEach(p => grid.appendChild(makeCard(p)));
  attachReveal();
}
render();

// filtering chips
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    render();
  });
});

// search
searchInput.addEventListener("input", (e) => {
  query = e.target.value;
  render();
});

// intersection reveal animation
function attachReveal(){
  const cards = document.querySelectorAll(".card");
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: .1});
  cards.forEach(c => io.observe(c));
}

// contact form (demo only)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm));
  formStatus.textContent = `Thanks, ${data.name}! I’ll reply to ${data.email} soon.`;
  contactForm.reset();
});
