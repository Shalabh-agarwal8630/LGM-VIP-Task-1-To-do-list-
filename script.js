const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

todos.forEach(todo => addTodoToList(todo));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = input.value.trim();

  if (todoText) {
    const todo = {
      text: todoText,
      completed: false
    };

    addTodoToList(todo);
    todos.push(todo);
    updateLocalStorage();
    input.value = '';
  }
}

function addTodoToList(todo) {
  const todoEl = document.createElement('li');
  todoEl.innerText = todo.text;
  todoEl.addEventListener('click', toggleTodo);
  todoEl.addEventListener('contextmenu', deleteTodo);

  if (todo.completed) {
    todoEl.classList.add('completed');
  }

  todosUL.appendChild(todoEl);
}

function toggleTodo() {
  this.classList.toggle('completed');
  updateLocalStorage();
}

function deleteTodo(e) {
  e.preventDefault();
  const todoText = this.innerText;
  const todoIndex = todos.findIndex(todo => todo.text === todoText);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    this.remove();
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
