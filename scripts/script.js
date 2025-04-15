const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const errorMessage = document.getElementById("error-message");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to save todos to localStorage
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to render todos to the UI
const renderTodos = () => {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "todo-item";

        const span = document.createElement("span");
        span.textContent = todo.text;

        const checkBtn = document.createElement("button");
        checkBtn.innerHTML = todo.completed ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-check"></i>';
        checkBtn.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt" style="margin: 0 0 0 20px"></i>';
        deleteBtn.addEventListener("click", () => {
            // Adding a fade-out animation before removing
            li.classList.add("fade-out");
            setTimeout(() => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            }, 300);  // Match with animation duration
        });

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.append(span, checkBtn, deleteBtn);
        todoList.appendChild(li);
    });
};

// Function to add a new todo with validation
const addTodo = () => {
    const text = todoInput.value.trim();
    if (!text) {
        errorMessage.style.display = "block"; // Show error message if input is empty
        return;
    }
    errorMessage.style.display = "none"; // Hide error message

    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = "";
};

// Add event listeners
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});

// Initial render
renderTodos();