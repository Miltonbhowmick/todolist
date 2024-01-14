document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const taskDueDateInput = document.getElementById('task-due-date'); // Assuming you have a due date input
    const taskCategoryInput = document.getElementById('task-category'); // Get the category input
    const taskName = newTaskInput.value.trim();
    const taskDueDate = taskDueDateInput.value;
    const taskCategory = taskCategoryInput.value.trim(); // Get the category value

    if (taskName) {
        const task = createTask(taskName, taskDueDate, taskCategory);
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="task-name">${task.title}</span>
            <span class="task-due-date">Due: ${task.dueDate}</span>
            <span class="task-category">Category: ${task.category}</span> <!-- Display category -->
            <button class="delete-btn" onclick="removeTask(this)">🗑️</button>
            <button class="done-btn" onclick="toggleDone(this)">✓</button>
        `;
        taskList.appendChild(listItem);
        newTaskInput.value = '';
        taskDueDateInput.value = '';
        taskCategoryInput.value = ''; // Clear the category input
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

function createTask(title, dueDate, category) {
    return {
        id: Date.now(),
        title: title,
        dueDate: dueDate,
        category: category, // New property for category
        completed: false
    };
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const taskNameElement = li.querySelector('.task-name');
        const taskDueDateElement = li.querySelector('.task-due-date');
        const taskCategoryElement = li.querySelector('.task-category');
        tasks.push({
            title: taskNameElement.textContent,
            dueDate: taskDueDateElement.textContent.replace('Due: ', ''),
            category: taskCategoryElement.textContent.replace('Category: ', ''),
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
            <span class="task-category">Category: ${task.category}</span>
            <button class="delete-btn" onclick="removeTask(this)">🗑️</button>
            <button class="done-btn" onclick="toggleDone(this)">✓</button>
        `;
        taskList.appendChild(listItem);
    });
}
