const openBtn = document.querySelector(".add_btn");
const closeBtn = document.querySelector(".modal__closeBtn");
const modal = document.querySelector(".modal");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
