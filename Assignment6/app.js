let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('task');
    const taskValue = taskInput.value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value;

    if (taskValue === '') return;

    const newTask = {
        id: Date.now(),
        task: taskValue,
        category: category,
        priority: priority,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = ''; // Clear input field
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to localStorage
    renderTasks();
}

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
            <span>${task.task} (${task.category}, ${task.priority}, Due: ${task.dueDate})</span>
            <button onclick="markComplete(${task.id})">${task.completed ? 'Unmark' : 'Mark'} Complete</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

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

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function filterTasks(filter) {
    renderTasks(filter);
}

// Initial render when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});
