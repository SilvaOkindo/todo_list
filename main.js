import './style.css'



const addTodoBtn  = document.querySelector('#add__todo');
const todoInput   = document.querySelector('#todo__input');
const todoContainer = document.querySelector('#todo__container');

// Retrieve todos from local storage if they exist
const storedTodos = localStorage.getItem('todos');
const todos = storedTodos ? JSON.parse(storedTodos) : [];



function renderTodos() {
    todoContainer.innerHTML = '';
    todos.forEach(todo=> {
        const h2 = document.createElement('h2');
        h2.classList.add('text-xl', 'font-normal', 'text-red-300')
        h2.textContent = todo;
        todoContainer.appendChild(h2);
    })
}

addTodoBtn.addEventListener('click', ()=> {
    const todo = todoInput.value.trim();
    if(todo !== '') {
        todos.push(todo);
        renderTodos();

        // save to local storage
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
    }
    
})

renderTodos();
