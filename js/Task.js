class Task {
    constructor(content, priority, category, dueDate = null, userId = null) {
        this.id = Date.now().toString();
        this.content = content;
        this.priority = priority;
        this.category = category;
        this.dueDate = dueDate;
        this.userId = userId;
        this.completed = false;
        this.createdAt = new Date();
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    isOverdue() {
        if (!this.dueDate) return false;
        return new Date(this.dueDate) < new Date() && !this.completed;
    }

    getFormattedDueDate() {
        if (!this.dueDate) return '';
        return new Date(this.dueDate).toLocaleDateString('pl-PL');
    }

    toHTML() {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item priority-${this.priority} ${this.completed ? 'completed' : ''}`;

        const content = document.createElement('div');
        content.className = 'task-content';
        content.textContent = this.content;

        const meta = document.createElement('div');
        meta.className = 'task-meta';
        meta.innerHTML = `
            <span class="badge bg-${this.getPriorityColor()}">${this.getPriorityLabel()}</span>
            <span class="badge bg-secondary">${this.category}</span>
            ${this.dueDate ? `<span class="task-due-date ${this.isOverdue() ? 'overdue' : ''}">Termin: ${this.getFormattedDueDate()}</span>` : ''}
            ${this.userId ? `<span class="badge bg-info">Użytkownik: ${this.getUserName()}</span>` : ''}
        `;

        const actions = document.createElement('div');
        actions.className = 'task-actions';
        actions.innerHTML = `
            <button class="btn btn-sm btn-${this.completed ? 'warning' : 'success'}" onclick="taskManager.toggleTask('${this.id}')">
                ${this.completed ? 'Cofnij' : 'Zakończ'}
            </button>
            <button class="btn btn-sm btn-danger" onclick="taskManager.deleteTask('${this.id}')">Usuń</button>
        `;

        taskElement.appendChild(content);
        taskElement.appendChild(meta);
        taskElement.appendChild(actions);

        return taskElement;
    }

    getPriorityColor() {
        switch(this.priority) {
            case 'high': return 'danger';
            case 'medium': return 'primary';
            case 'low': return 'success';
            default: return 'secondary';
        }
    }

    getPriorityLabel() {
        switch(this.priority) {
            case 'high': return 'Wysoki';
            case 'medium': return 'Średni';
            case 'low': return 'Niski';
            default: return 'Nieznany';
        }
    }

    getUserName() {
        const user = window.userManager.getUserById(this.userId);
        return user ? user.name : 'Nieznany użytkownik';
    }
} 