import { members } from "./data.js";
import { renderMembersTable } from "./render.js";

let membersData = JSON.parse(localStorage.getItem("membersData")) || [];

if (membersData.length === 0) {
  membersData = members;
  localStorage.setItem("membersData", JSON.stringify(membersData));
}

const membersTableBody = document.querySelector(".members-table-body");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__contents");
const addBtn = document.querySelector(".add_btn");
const closeBtn = document.querySelector(".modal__closeBtn");
const modalAddBtn = document.querySelector(".modal__addBtn");
const deleteBtn = document.querySelector(".delete_btn");
const selectAllCheckbox = document.querySelector("#select__item");

renderMembersTable(membersData, membersTableBody);

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modalContent.showModal();
});
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalContent.close();
});

modalAddBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const newMember = {
    name: document.querySelector(".modal__name").value,
    englishName: document.querySelector(".modal__enname").value,
    github: document.querySelector(".modal__github").value,
    gender: document.querySelector(".modal__gender").value,
    role: document.querySelector(".modal__role").value,
    firstWeekGroup: document.querySelector(".modal__group1").value,
    secondWeekGroup: document.querySelector(".modal__group2").value,
  };

  membersData.push(newMember);
  localStorage.setItem("membersData", JSON.stringify(membersData));
  document.querySelector(".modal__contents").close();
  renderMembersTable(membersData, membersTableBody);
});

deleteBtn.addEventListener("click", () => {
  let updatedData = JSON.parse(localStorage.getItem("membersData")) || [];
  const checkedBoxes = document.querySelectorAll(".rowCheckbox:checked");
  let memberId = [];

  checkedBoxes.forEach((checkbox) => {
    const row = checkbox.closest("tr");
    let Id = row.dataset.id;
    row.remove();
    memberId.push(Number(Id));
  });
  updatedData = updatedData.filter((member) => !memberId.includes(member.id));

  localStorage.setItem("membersData", JSON.stringify(updatedData));
  renderMembersTable(updatedData, membersTableBody);
});

selectAllCheckbox.addEventListener("click", () => {
  const rowCheckboxes = document.querySelectorAll(".rowCheckbox");
  rowCheckboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.checked;
  });
});
