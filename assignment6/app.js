let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add task function
function addTask() {
    const taskInput = document.getElementById('task');
    const taskValue = taskInput.value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value;
    const status = document.getElementById('status').value;


    if (taskValue === '') return;

    const newTask = {
        id: Date.now(),
        task: taskValue,
        category: category,
        priority: priority,
        dueDate: dueDate,
        status: status,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = ''; // Clear input field
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to localStorage
    renderTasks();
}

// Render tasks on the page
function renderTasks(filter = 'all') {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear previous tasks

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.task} (${task.category}, ${task.priority}, ${task.status}, Due: ${task.dueDate})</span>
            <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Edit task function
function editTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
        document.getElementById('task').value = taskToEdit.task;
        document.getElementById('category').value = taskToEdit.category;
        document.getElementById('priority').value = taskToEdit.priority;
        document.getElementById('due-date').value = taskToEdit.dueDate;
        document.getElementById('status').value = taskToEdit.status;

        // Remove the task from the array for editing
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Mark task as complete
function markComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Delete task function
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Filter tasks based on status
function filterTasks(filter) {
    renderTasks(filter);
}

// Initial render when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

