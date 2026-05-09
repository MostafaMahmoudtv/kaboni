const slides = document.querySelector(".slides");
const allSlides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 1;
const slideWidth = 100;
let interval;

// ================= CLONE =================
const firstClone = allSlides[0].cloneNode(true);
const lastClone = allSlides[allSlides.length - 1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone, allSlides[0]);

// start from first real slide
slides.style.transform = `translateX(-${slideWidth}%)`;

// ================= DOTS =================
function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));

  let realIndex = index - 1;

  if (realIndex < 0) realIndex = dots.length - 1;
  if (realIndex >= dots.length) realIndex = 0;

  dots[realIndex].classList.add("active");
}

// ================= MOVE =================
function moveToIndex() {
  slides.style.transition = "transform 0.6s ease-in-out";
  slides.style.transform = `translateX(-${index * slideWidth}%)`;
  updateDots();
}

// ================= NEXT =================
function goNext() {
  if (index >= allSlides.length + 1) return;
  index++;
  moveToIndex();
}

// ================= PREV =================
function goPrev() {
  if (index <= 0) return;
  index--;
  moveToIndex();
}

// ================= RESET (INFINITE FIX) =================
slides.addEventListener("transitionend", () => {
  // لو وصلنا للـ clone الأخير
  if (index === allSlides.length + 1) {
    slides.style.transition = "none";
    index = 1;
    slides.style.transform = `translateX(-${slideWidth}%)`;
  }

  // لو رجعنا لأول clone
  if (index === 0) {
    slides.style.transition = "none";
    index = allSlides.length;
    slides.style.transform = `translateX(-${index * slideWidth}%)`;
  }
});

// ================= DOT CLICK =================
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i + 1;
    moveToIndex();
    resetAuto(); // مهم علشان الريست
  });
});

// ================= AUTO =================
function startAuto() {
  interval = setInterval(() => {
    goNext();
  }, 4000);
}

function resetAuto() {
  clearInterval(interval);
  startAuto();
}

// ================= EVENTS =================
next.addEventListener("click", () => {
  goNext();
  resetAuto();
});

prev.addEventListener("click", () => {
  goPrev();
  resetAuto();
});

// ================= INIT =================
updateDots();
startAuto();
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
    ".about-content, .team-content",
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
    },
  );

  animatedSections.forEach((el) => observer.observe(el));
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});
