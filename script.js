document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const taskDueDateInput = document.getElementById('task-due-date'); // Assuming you have a due date input
    const taskName = newTaskInput.value.trim();
    const taskDueDate = taskDueDateInput.value;

    if (taskName) {
        const task = createTask(taskName, taskDueDate);
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="task-name">${task.title}</span>
            <span class="task-due-date">Due: ${task.dueDate}</span>
            <button class="delete-btn" onclick="removeTask(this)">🗑️</button>
            <button class="done-btn" onclick="toggleDone(this)">✓</button>
        `;
        taskList.appendChild(listItem);
        newTaskInput.value = '';
        taskDueDateInput.value = ''; // Clear the due date input
        saveTasks();
    }
}

function removeTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    saveTasks();
}

function toggleDone(button) {
    const taskItem = button.previousElementSibling;
    taskItem.classList.toggle('completed');
    saveTasks();
}

function createTask(title, dueDate) {
    return {
        id: Date.now(),
        title: title,
        dueDate: dueDate,
        completed: false
    };
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const taskNameElement = li.querySelector('.task-name');
        const taskDueDateElement = li.querySelector('.task-due-date');
        tasks.push({
            title: taskNameElement.textContent,
            dueDate: taskDueDateElement.textContent.replace('Due: ', ''),
            completed: taskNameElement.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    savedTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="task-name ${task.completed ? 'completed' : ''}">${task.title}</span>
            <span class="task-due-date">Due: ${task.dueDate}</span>
            <button class="delete-btn" onclick="removeTask(this)">🗑️</button>
            <button class="done-btn" onclick="toggleDone(this)">✓</button>
        `;
        taskList.appendChild(listItem);
    });
}
