// ================= SLIDER =================
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;

function updateSlider() {
  if (!slides || !dots.length) return;

  slides.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));

  if (dots[index]) dots[index].classList.add("active");
}

// NEXT
if (next) {
  next.addEventListener("click", () => {
    index = (index + 1) % slide.length;
    updateSlider();
  });
}

// PREV
if (prev) {
  prev.addEventListener("click", () => {
    index = (index - 1 + slide.length) % slide.length;
    updateSlider();
  });
}

// DOTS
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
  });
});

// AUTO SLIDE
if (slide.length) {
  setInterval(() => {
    index = (index + 1) % slide.length;
    updateSlider();
  }, 7000);
}

// ================= ZOOM =================
const zoomBox = document.getElementById("zoomBox");

if (zoomBox) {
  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    let factor;

    if (window.innerWidth <= 1024) {
      factor = 0.00015; // تابلت
    } else {
      factor = 0.00035; // ديسكتوب
    }

    let scale = 1 + scrollY * factor;

    // حدود الأمان
    if (window.innerWidth <= 1024) {
      if (scale > 1.08) scale = 1.08; // تابلت أقل زووم
    } else {
      if (scale > 1.18) scale = 1.18;
    }

    zoomBox.style.transform = `scale(${scale})`;
  });
}
// ================= VIDEO =================
const video = document.getElementById("myVideo");
const playBtn = document.getElementById("playBtn");

if (video && playBtn) {
  playBtn.addEventListener("click", () => {
    video.play();
    playBtn.style.display = "none";
  });

  video.addEventListener("pause", () => {
    playBtn.style.display = "flex";
  });

  video.addEventListener("ended", () => {
    playBtn.style.display = "flex";
  });
}

// ================= NEWSLETTER =================
const form = document.getElementById("newsletterForm");
const message = document.getElementById("message");

if (form && message) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    message.style.display = "block";
    form.reset();

    setTimeout(() => {
      message.style.display = "none";
    }, 3000);
  });
}

// ================= FOOTER LINKS =================
const footerLinks = document.querySelectorAll(".footer-column a");

footerLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.transform = "translateX(5px)";
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translateX(0)";
  });
});
window.addEventListener("DOMContentLoaded", () => {
  const animatedSections = document.querySelectorAll(
    ".about-content, .team-content"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animatedSections.forEach((el) => observer.observe(el));
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});