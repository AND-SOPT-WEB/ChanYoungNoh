// querySelector
// document.querySelector("태그명 또는 CSS 선택자");
// document.querySelector("h2");

// document.querySelectorAll : 해당하는 모든 요소를 찾아 배열로 반환

// document.querySelector(".todoList");

const container = document.querySelector(".todoList");

const btn = document.querySelector(".addBtn");
btn.addEventListener("click", () => {
  const paragraph = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const todo = document.querySelector(".todo");

  console.log(todo.value);

  paragraph.textContent = todo.value;
  deleteBtn.textContent = "삭제";
  container.appendChild(paragraph);
  paragraph.appendChild(deleteBtn);

  todo.value = "";

  deleteBtn.addEventListener("click", () => {
    container.removeChild(paragraph);
  });
});
