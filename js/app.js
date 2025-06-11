document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    const userManager = new UserManager();
    window.taskManager = taskManager;
    window.userManager = userManager;

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(themeToggle, savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(themeToggle, newTheme);
    });

    function updateThemeButton(button, theme) {
        button.innerHTML = theme === 'dark'
            ? '<i class="bi bi-sun-fill"></i> Jasny motyw'
            : '<i class="bi bi-moon-fill"></i> Ciemny motyw';
    }

    // User form handling
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('username').value;
        if (name.trim()) {
            const user = userManager.addUser(name);
            // Aktualizuj listę użytkowników w formularzu zadań
            updateUserSelect();
            userForm.reset();
        }
    });

    // Funkcja aktualizująca listę użytkowników w formularzu zadań
    function updateUserSelect() {
        const userSelect = document.getElementById('taskUser');
        userSelect.innerHTML = '<option value="">Wybierz użytkownika (opcjonalnie)</option>';
        userManager.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
    }

    // Task form handling
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('taskContent').value;
        const priority = document.getElementById('taskPriority').value;
        const category = document.getElementById('taskCategory').value;
        const dueDate = document.getElementById('taskDueDate').value || null;
        const userId = document.getElementById('taskUser').value || null;

        if (content.trim()) {
            taskManager.addTask(content, priority, category, dueDate, userId);
            taskForm.reset();
        }
    });

    // Filter buttons
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            taskManager.setFilter(button.dataset.filter);
        });
    });

    // Sort dropdown
    const sortDropdown = document.querySelectorAll('[data-sort]');
    sortDropdown.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            taskManager.setSort(item.dataset.sort);
            document.getElementById('sortDropdown').textContent = `Sortuj: ${item.textContent}`;
        });
    });

    // Search functionality
    const searchInput = document.getElementById('taskSearch');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            taskManager.setSearch(e.target.value);
        }, 300);
    });

    // Initial render
    taskManager.renderTasks();
    userManager.renderUsers();
    updateUserSelect();
}); 