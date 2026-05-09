const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});
  const currentPage = window.location.pathname.split("/").pop();

  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (
      linkPage === currentPage ||
      (currentPage === "" && link.getAttribute("href") === "/")
    ) {
      link.classList.add("active");
    }
  });