class User {
    constructor(username) {
        this.id = Date.now().toString();
        this.username = username;
    }

    toHTML() {
        return `
            <div class="user-item" data-id="${this.id}">
                ${this.username}
            </div>
        `;
    }
} 