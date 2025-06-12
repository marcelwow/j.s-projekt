class User {
    constructor(name) {
        this.id = Date.now().toString();
        this.name = name;
    }

    toHTML() {
        const userElement = document.createElement('div');
        userElement.className = 'user-item d-flex justify-content-between align-items-center mb-2';
        userElement.innerHTML = `
            <span class="user-name">${this.name}</span>
            <div class="user-actions">
                <button class="btn btn-sm btn-danger" onclick="userManager.deleteUser('${this.id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
        return userElement;
    }
}

class UserManager {
    constructor() {
        this.users = [];
        this.loadFromLocalStorage();
    }

    addUser(name) {
        const user = new User(name);
        this.users.push(user);
        this.saveToLocalStorage();
        this.renderUsers();
        return user;
    }

    deleteUser(userId) {
        if (confirm('Czy na pewno chcesz usunąć tego użytkownika? Wszystkie jego zadania zostaną odprzypisane.')) {
            this.users = this.users.filter(user => user.id !== userId);
            window.taskManager.unassignUserTasks(userId);
            this.saveToLocalStorage();
            this.renderUsers();
        }
    }

    getUserById(userId) {
        return this.users.find(user => user.id === userId);
    }

    renderUsers() {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        this.users.forEach(user => {
            userList.appendChild(user.toHTML());
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    loadFromLocalStorage() {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            const parsedUsers = JSON.parse(savedUsers);
            this.users = parsedUsers.map(userData => {
                const user = new User(userData.name);
                user.id = userData.id;
                return user;
            });
        }
    }
} 