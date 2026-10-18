const form = document.getElementById('goal-form');
const input = document.getElementById('goal-input');
const errorMessage = document.getElementById('error-message');
const goalList = document.getElementById('goal-list');
const emptyMessage = document.getElementById('empty-message');
const totalCountSpan = document.getElementById('total-count');
const completedCountSpan = document.getElementById('completed-count');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = input.value.trim();
    
    if (text.length < 3 || text.length > 100) {
        errorMessage.hidden = false;
        return;
    }
    
    errorMessage.hidden = true;
    createGoal(text);
    
    input.value = '';
    input.focus();
    updateApp();
});

function createGoal(text) {
    const li = document.createElement('li');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('goal-content');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        updateApp();
    });
    
    const span = document.createElement('span');
    span.classList.add('goal-text');
    span.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.classList.add('delete-btn');
    
    deleteBtn.addEventListener('click', () => {
        li.remove();
        updateApp();
    });
    
    contentDiv.append(checkbox, span);
    li.append(contentDiv, deleteBtn);
    goalList.append(li);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        updateApp();
    });
});

function updateApp() {
    const goals = goalList.querySelectorAll('li');
    let total = goals.length;
    let completed = 0;
    
    if (total === 0) {
        emptyMessage.hidden = false;
    } else {
        emptyMessage.hidden = true;
    }
    
    goals.forEach(goal => {
        const isCompleted = goal.classList.contains('completed');
        if (isCompleted) {
            completed++;
        }
        
        if (currentFilter === 'active' && isCompleted) {
            goal.hidden = true;
        } else if (currentFilter === 'completed' && !isCompleted) {
            goal.hidden = true;
        } else {
            goal.hidden = false;
        }
    });
    
    totalCountSpan.textContent = total;
    completedCountSpan.textContent = completed;
}