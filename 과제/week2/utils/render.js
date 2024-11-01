export const renderMembersTable = (membersData, tableBody) => {
  localStorage.setItem("membersData", JSON.stringify(membersData));

  membersData.forEach((member) => {
    const tr = document.createElement("tr");
    tr.dataset.id = member.id;

    const checkBoxTd = document.createElement("td");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("rowCheckbox");
    checkBoxTd.appendChild(checkBox);
    tr.appendChild(checkBoxTd);

    const nameTd = document.createElement("td");
    nameTd.textContent = member.name;
    tr.appendChild(nameTd);

    const englishNameTd = document.createElement("td");
    englishNameTd.textContent = member.englishName;
    tr.appendChild(englishNameTd);

    const githubTd = document.createElement("td");
    const githubLink = document.createElement("a");
    githubLink.href = `https://github.com/${member.github}`;
    githubLink.target = "_blank";
    githubLink.textContent = member.github;
    githubTd.appendChild(githubLink);
    tr.appendChild(githubTd);

    const genderTd = document.createElement("td");
    genderTd.textContent = member.gender;
    tr.appendChild(genderTd);

    const roleTd = document.createElement("td");
    roleTd.textContent = member.role;
    tr.appendChild(roleTd);

    const firstWeekGroupTd = document.createElement("td");
    firstWeekGroupTd.textContent = member.firstWeekGroup;
    tr.appendChild(firstWeekGroupTd);

    const secondWeekGroupTd = document.createElement("td");
    secondWeekGroupTd.textContent = member.secondWeekGroup;
    tr.appendChild(secondWeekGroupTd);

    tableBody.appendChild(tr);
  });
};
