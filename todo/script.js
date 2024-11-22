const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  appendTaskToDOM(task);
  saveTaskToLocalStorage(task);
  taskInput.value = '';
}

function appendTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = `task-item ${task.completed ? 'completed' : ''}`;
  li.dataset.id = task.id;

  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle-completion">
      <button class="delete-btn">Delete</button>
    </div>
  `;

  taskList.appendChild(li);
}

function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => appendTaskToDOM(task));
}

taskList.addEventListener('click', handleTaskActions);

function handleTaskActions(e) {
  const li = e.target.closest('.task-item');
  const taskId = parseInt(li.dataset.id);

  if (e.target.classList.contains('toggle-completion')) {
    toggleTaskCompletion(taskId);
    li.classList.toggle('completed');
  }

  if (e.target.classList.contains('delete-btn')) {
    deleteTask(taskId);
    li.remove();
  }
}

function toggleTaskCompletion(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
