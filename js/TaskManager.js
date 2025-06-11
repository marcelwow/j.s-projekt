class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentSort = 'date';
        this.searchQuery = '';
        this.loadFromLocalStorage();
    }

    addTask(content, priority, category, dueDate, userId = null) {
        const task = new Task(content, priority, category, dueDate, userId);
        this.tasks.push(task);
        this.saveToLocalStorage();
        this.renderTasks();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveToLocalStorage();
        this.renderTasks();
    }

    toggleTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.toggleComplete();
            this.saveToLocalStorage();
            this.renderTasks();
        }
    }

    unassignUserTasks(userId) {
        this.tasks.forEach(task => {
            if (task.userId === userId) {
                task.userId = null;
            }
        });
        this.saveToLocalStorage();
        this.renderTasks();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.renderTasks();
    }

    setSort(sort) {
        this.currentSort = sort;
        this.renderTasks();
    }

    setSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.renderTasks();
    }

    getFilteredTasks() {
        let filteredTasks = [...this.tasks];

        // Apply search filter
        if (this.searchQuery) {
            filteredTasks = filteredTasks.filter(task =>
                task.content.toLowerCase().includes(this.searchQuery) ||
                task.category.toLowerCase().includes(this.searchQuery)
            );
        }

        // Apply status filter
        if (this.currentFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task =>
                this.currentFilter === 'done' ? task.completed : !task.completed
            );
        }

        // Apply sorting
        filteredTasks.sort((a, b) => {
            switch (this.currentSort) {
                case 'priority':
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                case 'date':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

        return filteredTasks;
    }

    getTaskStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const overdue = this.tasks.filter(task => task.isOverdue()).length;

        return {
            total,
            completed,
            pending,
            overdue
        };
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();

        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            taskList.appendChild(task.toHTML());
        });

        this.updateStats();
    }

    updateStats() {
        const stats = this.getTaskStats();
        const statsElement = document.getElementById('taskStats');

        statsElement.innerHTML = `
            <div class="stat-item">
                <span>Wszystkie zadania:</span>
                <span>${stats.total}</span>
            </div>
            <div class="stat-item">
                <span>Zakończone:</span>
                <span>${stats.completed}</span>
            </div>
            <div class="stat-item">
                <span>Do zrobienia:</span>
                <span>${stats.pending}</span>
            </div>
            <div class="stat-item">
                <span>Przeterminowane:</span>
                <span class="text-danger">${stats.overdue}</span>
            </div>
        `;
    }

    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadFromLocalStorage() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            this.tasks = parsedTasks.map(taskData => {
                const task = new Task(
                    taskData.content,
                    taskData.priority,
                    taskData.category,
                    taskData.dueDate,
                    taskData.userId
                );
                task.id = taskData.id;
                task.completed = taskData.completed;
                task.createdAt = new Date(taskData.createdAt);
                return task;
            });
        }
    }
} 