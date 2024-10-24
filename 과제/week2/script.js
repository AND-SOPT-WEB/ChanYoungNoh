import { members } from "./utils/data.js";
import { renderMembersTable } from "./utils/render.js";

let membersData = JSON.parse(localStorage.getItem("membersData")) || [];

if (membersData.length === 0) {
  membersData = members;
  localStorage.setItem("membersData", JSON.stringify(membersData));
}

const membersTableBody = document.querySelector(".members-table-body");
renderMembersTable(membersData, membersTableBody);

// let initialData = [...membersData];

// let filteredData = [];
