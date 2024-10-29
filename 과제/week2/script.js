import { members } from "./utils/data.js";
import { renderMembersTable } from "./utils/render.js";
// import modal from "./utils/modal.js";

let membersData = JSON.parse(localStorage.getItem("membersData")) || [];

if (membersData.length === 0) {
  membersData = members;
  localStorage.setItem("membersData", JSON.stringify(membersData));
}

const membersTableBody = document.querySelector(".members-table-body");
renderMembersTable(membersData, membersTableBody);

// const addBtn = document.querySelector(".add_btn");
// addBtn.addEventListener("click", () => {
//   modal();
// });
