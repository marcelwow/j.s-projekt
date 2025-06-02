class Task {
    constructor(content, priority = 'medium', category = 'praca', userId = null) {
        this.id = Date.now().toString();
        this.content = content;
        this.status = 'pending';
        this.priority = priority;
        this.category = category;
        this.userId = userId;
        this.createdAt = new Date();
    }

    toggleStatus() {
        this.status = this.status === 'pending' ? 'done' : 'pending';
    }

    update(content, priority, category) {
        this.content = content;
        this.priority = priority;
        this.category = category;
    }

    toHTML() {
        return `
            <div class="task-item ${this.status}" data-id="${this.id}">
                <span class="priority ${this.priority}"></span>
                <span class="task-content">${this.content}</span>
                <span class="category-badge category-${this.category}">${this.category}</span>
                <div class="task-actions">
                    <button class="btn btn-sm btn-outline-primary toggle-status">${this.status === 'pending' ? '✓' : '↩'}</button>
                    <button class="btn btn-sm btn-outline-secondary edit-task">✎</button>
                    <button class="btn btn-sm btn-outline-danger delete-task">×</button>
                </div>
            </div>
        `;
    }
} 