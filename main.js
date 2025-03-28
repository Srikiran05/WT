document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = '';
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();
    let delay = 0;
    tasks.forEach(task => {
        setTimeout(() => renderTask(task), delay);
        delay += 100; // Staggered animation for initial load
    });
}

function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    if (task.completed) taskItem.classList.add('completed');

    taskItem.innerHTML = `
        <input type="checkbox" 
               ${task.completed ? 'checked' : ''} 
               onchange="toggleTask(${task.id})">
        <span>${task.text}</span>
        <button class="delete-btn" 
                onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(taskItem);
    // Force reflow to ensure animation plays
    void taskItem.offsetWidth;
}

function toggleTask(id) {
    let tasks = getTasks();
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTaskList();
}

function deleteTask(id) {
    const taskItem = document.querySelector(`button[onclick="deleteTask(${id})"]`).parentElement;
    taskItem.style.animation = 'slideOut 0.3s ease forwards';

    setTimeout(() => {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        refreshTaskList();
    }, 300); // Match animation duration
}

function refreshTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    loadTasks();
}

document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Add this to styles.css if not automatically included
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`, styleSheet.cssRules.length);