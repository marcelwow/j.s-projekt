class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.loadFromLocalStorage();
    }

    addTask(content, priority, category, userId) {
        const task = new Task(content, priority, category, userId);
        this.tasks.push(task);
        this.saveToLocalStorage();
        return task;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveToLocalStorage();
    }

    updateTask(taskId, content, priority, category) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.update(content, priority, category);
            this.saveToLocalStorage();
        }
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.toggleStatus();
            this.saveToLocalStorage();
        }
    }

    getTasks(filter = this.currentFilter, userId = null) {
        let filteredTasks = this.tasks;
        
        if (userId) {
            filteredTasks = filteredTasks.filter(task => task.userId === userId);
        }

        if (filter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.status === filter);
        }

        return filteredTasks.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
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
                    taskData.userId
                );
                task.id = taskData.id;
                task.status = taskData.status;
                task.createdAt = new Date(taskData.createdAt);
                return task;
            });
        }
    }
} 