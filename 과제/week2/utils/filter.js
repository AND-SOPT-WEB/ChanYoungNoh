import { renderMembersTable } from "./render.js";

export const filter = (membersData) => {
  const nameInput = document
    .querySelector(".name-input input")
    .value.toLowerCase();
  const enNameInput = document
    .querySelector(".en_name-input input")
    .value.toLowerCase();
  const githubInput = document
    .querySelector(".github-input input")
    .value.toLowerCase();
  const genderSelect = document.querySelector(".gender-select select").value;
  const roleSelect = document
    .querySelector(".role-select select")
    .value.toUpperCase();
  const group1Input = document.querySelector(".group1-input input").value;
  const group2Input = document.querySelector(".group2-input input").value;

  return membersData.filter((member) => {
    const nameFilter = nameInput
      ? member.name.toLowerCase().includes(nameInput)
      : true;
    const enNameFilter = enNameInput
      ? member.englishName.toLowerCase().includes(enNameInput)
      : true;
    const githubFilter = githubInput
      ? member.github.toLowerCase().includes(githubInput)
      : true;
    const genderFilter = genderSelect ? member.gender === genderSelect : true;
    const roleFilter = roleSelect ? member.role === roleSelect : true;
    const group1Filter = group1Input
      ? member.firstWeekGroup == group1Input
      : true;
    const group2Filter = group2Input
      ? member.secondWeekGroup == group2Input
      : true;

    return (
      nameFilter &&
      enNameFilter &&
      githubFilter &&
      genderFilter &&
      roleFilter &&
      group1Filter &&
      group2Filter
    );
  });
};

export const resetFilters = () => {
  document.querySelector(".name-input input").value = "";
  document.querySelector(".en_name-input input").value = "";
  document.querySelector(".github-input input").value = "";
  document.querySelector(".gender-select select").value = "";
  document.querySelector(".role-select select").value = "";
  document.querySelector(".group1-input input").value = "";
  document.querySelector(".group2-input input").value = "";
};

const searchBtn = document.querySelector(".search_btn");
searchBtn.addEventListener("click", () => {
  const searchData = JSON.parse(localStorage.getItem("membersData")) || [];
  const filteredData = filter(searchData);
  const tableBody = document.querySelector(".members-table-body");
  renderMembersTable(filteredData, tableBody);
  console.log(renderMembersTable);
});

const resetBtn = document.querySelector(".reset_btn");
resetBtn.addEventListener("click", () => {
  resetFilters();
  const membersData = JSON.parse(localStorage.getItem("membersData")) || [];
  const tableBody = document.querySelector(".members-table-body");
  renderMembersTable(membersData, tableBody);
});
