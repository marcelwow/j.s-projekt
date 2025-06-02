class App {
    constructor() {
        this.taskManager = new TaskManager();
        this.users = [];
        this.currentUser = null;
        this.loadUsers();
        this.initializeEventListeners();
        this.renderTasks();
        this.renderUsers();
    }

    loadUsers() {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            this.users = JSON.parse(savedUsers);
        }
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    addUser(username) {
        const user = new User(username);
        this.users.push(user);
        this.saveUsers();
        this.renderUsers();
        return user;
    }

    initializeEventListeners() {
        // User form submission
        document.getElementById('userForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            this.addUser(username);
            document.getElementById('username').value = '';
        });

        // Task form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            if (!this.currentUser) {
                alert('Wybierz użytkownika przed dodaniem zadania!');
                return;
            }

            const content = document.getElementById('taskContent').value;
            const priority = document.getElementById('taskPriority').value;
            const category = document.getElementById('taskCategory').value;

            this.taskManager.addTask(content, priority, category, this.currentUser.id);
            this.renderTasks();
            document.getElementById('taskForm').reset();
        });

        // Filter buttons
        document.querySelectorAll('[data-filter]').forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.taskManager.currentFilter = filter;
                this.renderTasks();
            });
        });

        // Task list event delegation
        document.getElementById('taskList').addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            const taskId = taskItem.dataset.id;

            if (e.target.classList.contains('toggle-status')) {
                this.taskManager.toggleTaskStatus(taskId);
                this.renderTasks();
            } else if (e.target.classList.contains('delete-task')) {
                this.taskManager.deleteTask(taskId);
                this.renderTasks();
            } else if (e.target.classList.contains('edit-task')) {
                this.editTask(taskId);
            }
        });

        // User list event delegation
        document.getElementById('userList').addEventListener('click', (e) => {
            const userItem = e.target.closest('.user-item');
            if (!userItem) return;

            const userId = userItem.dataset.id;
            this.currentUser = this.users.find(user => user.id === userId);
            this.renderUsers();
            this.renderTasks();
        });
    }

    editTask(taskId) {
        const task = this.taskManager.tasks.find(t => t.id === taskId);
        if (!task) return;

        const content = prompt('Edytuj treść zadania:', task.content);
        if (content === null) return;

        const priority = prompt('Edytuj priorytet (low/medium/high):', task.priority);
        if (priority === null) return;

        const category = prompt('Edytuj kategorię (praca/nauka/hobby):', task.category);
        if (category === null) return;

        this.taskManager.updateTask(taskId, content, priority, category);
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const tasks = this.taskManager.getTasks(
            this.taskManager.currentFilter,
            this.currentUser ? this.currentUser.id : null
        );

        taskList.innerHTML = tasks.map(task => task.toHTML()).join('');
    }

    renderUsers() {
        const userList = document.getElementById('userList');
        userList.innerHTML = this.users.map(user => {
            const isActive = this.currentUser && this.currentUser.id === user.id;
            return `<div class="user-item ${isActive ? 'active' : ''}" data-id="${user.id}">${user.username}</div>`;
        }).join('');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
}); 