// 取得元素
const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector("#todo-list");
const clearBtn = document.querySelector("#clear-btn");

// 新增待辦
addBtn.onclick = () =>{
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;
  // 刪除按鈕
  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.classList.add("delete");
  li.appendChild(delBtn);

  // 點擊待辦 → 標記完成
  li.onclick = (e) => {
    if (e.target.tagName === "BUTTON") return; // 避免刪除鍵觸發
    li.classList.toggle("completed");
  };

  // 點擊刪除
  delBtn.onclick = () => {
    li.remove();
  };

  // 加入清單
  list.appendChild(li);
  input.value = "";
};

// 清除全部
clearBtn.onclick = () => {
  list.textContent = "";
};
