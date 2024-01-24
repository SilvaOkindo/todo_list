import './style.css'

const addTodoBtn = document.querySelector("#add__todo");
const todoInput = document.querySelector("#todo__input");
const todoContainer = document.querySelector("#todo__container");
const searchIcon = document.querySelector("#search");
const createContainer = document.querySelector("#create__container");
const searchContainer = document.querySelector("#search__container");

// Retrieve todos from local storage if they exist
const storedTodos = localStorage.getItem("todos");
const todos = storedTodos ? JSON.parse(storedTodos) : [];
//

function renderTodos() {
  todoContainer.innerHTML = "";
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "bg-gray-900",
      "p-4",
      "rounded-lg",
      "my-2"
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add(
      "text-red-500",
      "text-sm",
      "font-bold",
      "cursor-pointer"
    );

    deleteBtn.addEventListener("click", () => {
      const index = todos.indexOf(todo);
      todos.splice(index, 1);
      renderTodos();
      localStorage.setItem("todos", JSON.stringify(todos));
    });

    const h2 = document.createElement("h2");
    h2.classList.add("text-xl", "font-normal", "text-red-300");
    h2.textContent = todo;
    todoDiv.append(h2, deleteBtn);
    todoContainer.appendChild(todoDiv);
  });
}

addTodoBtn.addEventListener("click", () => {
  const todo = todoInput.value.trim();
  if (todo !== "") {
    todos.push(todo);
    renderTodos();

    // save to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
    todoInput.value = "";
  }
});

// Check if the search input is already visible
if (!searchContainer.classList.contains("hidden")) {
  // If visible, hide it, show the createContainer, and remove the aria-disabled class
  searchContainer.classList.add("hidden");
  createContainer.classList.remove("hidden");
  // searchIcon.classList.remove("aria-disabled");
}

searchIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  const searchInput = searchContainer.querySelector('input[name="searchTodo"]');

  if (!searchInput) {
      searchContainer.classList.remove("hidden");
      createContainer.classList.add("hidden");
      // searchIcon.classList.add("aria-disabled");

      const newSearchInput = document.createElement("input");
      const removeSearchInput = document.createElement("button");
      removeSearchInput.textContent = "X";
      removeSearchInput.classList.add(
          "text-red-500",
          "text-xl",
          "font-bolder",
          "cursor-pointer"
      );
      removeSearchInput.addEventListener("click", () => {
          searchContainer.classList.add("hidden");
          createContainer.classList.remove("hidden");
          // searchIcon.classList.remove("aria-disabled");
      });

      newSearchInput.name = "searchTodo";
      newSearchInput.classList.add(
          "p-2",
          "text-gray-100",
          "bg-gray-900",
          "rounded-lg",
          "my-2",
          "mr-5",
          "flex-grow"
      );
      newSearchInput.setAttribute("placeholder", "Search todo");
      searchContainer.append(newSearchInput, removeSearchInput);
  } else {
      searchContainer.classList.remove("hidden");
      createContainer.classList.add("hidden");

      searchInput.addEventListener("input", () => {
          const foundTodos = todos.filter((todo) => {
              return todo.toLowerCase().includes(searchInput.value.trim().toLowerCase());
          });
          console.log(foundTodos);
          render(foundTodos);
      });
  }
});


render(todos);

// const btn = document.querySelector('.off');

// btn.addEventListener('click', changeBtnName);

// function changeBtnName() {
//     if (btn.textContent === 'Machine is off') {
//         btn.textContent = 'Machine is on';
//     } else {
//         btn.textContent = 'Machine is off';
//     }
// }



function render(tds) {
    tds.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "bg-gray-900",
          "p-4",
          "rounded-lg",
          "my-2"
        );
    
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add(
          "text-red-500",
          "text-sm",
          "font-bold",
          "cursor-pointer"
        );
    
        deleteBtn.addEventListener("click", () => {
          const index = todos.indexOf(todo);
          todos.splice(index, 1);
          renderTodos();
          localStorage.setItem("todos", JSON.stringify(todos));
        });
    
        const h2 = document.createElement("h2");
        h2.classList.add("text-xl", "font-normal", "text-red-300");
        h2.textContent = todo;
        todoDiv.append(h2, deleteBtn);
        todoContainer.appendChild(todoDiv);
    })

   
}