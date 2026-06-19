const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

// Lucide icons
if (window.lucide) {
  window.lucide.createIcons();
}

// =====================
// TOAST
// =====================
function showToast(message) {
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// =====================
// MOBILE NAVBAR
// =====================
if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    document.body.classList.toggle("nav-open", isOpen);

    menuButton.innerHTML = `
      <i data-lucide="${isOpen ? "x" : "menu"}"></i>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
}

// =====================
// REVEAL ANIMATION
// =====================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// =====================
// PDF MODAL
// =====================
const modal = document.getElementById("pdfModal");
const viewer = document.getElementById("pdfViewer");
const closeBtn = document.getElementById("closeModal");
const downloadBtn = document.getElementById("downloadPdf");

function openPDF(path) {
  if (!modal || !viewer || !downloadBtn) return;

  viewer.src = path;
  downloadBtn.href = path;
  modal.classList.add("show");
}

if (closeBtn && modal && viewer) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    viewer.src = "";
  });
}

// ==================== AUTH SYSTEM ====================

function login(role) {
  localStorage.setItem("userRole", role);
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("userRole");
  window.location.href = "index.html";
}

function updateNavbar() {
  const role = localStorage.getItem("userRole");
  const navLinks = document.getElementById("navLinks");
  const navCTA = document.getElementById("navCTA");

  if (!navLinks || !navCTA) return;

  // Guest
  if (!role) {
    navLinks.innerHTML = `
      <a href="index.html#home">Home</a>
      <a href="index.html#why">About</a>
      <a href="index.html#features">Features</a>
      <a href="index.html#teachers">For Teachers</a>
      <a href="index.html#about-us">About Us</a>
    `;

    navCTA.textContent = "Login / Sign Up";
    navCTA.href = "auth.html";
    navCTA.onclick = null;
    return;
  }

  // Teacher
  if (role === "teacher") {
    navLinks.innerHTML = `
      <a href="index.html#home">Home</a>
      <a href="index.html#why">About</a>
      <a href="index.html#features">Features</a>
      <a href="topics.html">Topics</a>
     <a href="resources.html">Teacher Resources</a>
    `;
  }

  // Student
  if (role === "student") {
    navLinks.innerHTML = `
      <a href="index.html#home">Home</a>
      <a href="index.html#why">About</a>
      <a href="index.html#features">Features</a>
      <a href="topics.html">Topics</a>
    `;
  }

  navCTA.textContent = "Logout";
  navCTA.href = "#";
  navCTA.onclick = function(e) {
    e.preventDefault();
    logout();
  };
}

document.addEventListener("DOMContentLoaded", updateNavbar);
lucide.createIcons();

function login(role) {
  if (role === "student") {
    localStorage.setItem("userRole", "student");
    window.location.href = "topics.html";
  }

  if (role === "teacher") {
    window.location.href = "teacher-login.html";
  }
}

function teacherLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (
    email === "teacher@vocavo.com" &&
    password === "vocavo123"
  ) {
    alert("Verification code sent to your email: 123456");
    window.location.href = "teacher-otp.html";
  } else {
    alert("Invalid email or password.");
  }
}

function verifyOTP() {
  const otp = document.getElementById("otpInput").value;

  if (otp === "123456") {
    localStorage.setItem("userRole", "teacher");
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Wrong verification code.");
  }
}