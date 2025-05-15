const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const list = document.getElementById('todo-list');

let tasks = [];

function renderTasks() {
  
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const span = document.createElement('span');
    span.textContent = task.text;

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'done';
    doneBtn.onclick = () => {
      fetch(`/update/${index}`, { method: 'PUT' })
        .then(() => loadTasks());
        li.style = `
  background: rgba(255, 255, 255, 0.15);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  word-break: break-word; /* Also apply here */
`;
li.style = `
  background: rgba(255, 255, 255, 0.15);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  word-break: break-word; /* Also apply here */
`;

    };
    

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'remove';
    removeBtn.onclick = () => {
      fetch(`/delete/${index}`, { method: 'DELETE' })
        .then(() => loadTasks());
    };

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const task = input.value.trim();
  if (task) {
    fetch('/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: task })
    }).then(() => {
      input.value = '';
      loadTasks();
    });
  }
});

function loadTasks() {
  fetch('/tasks')
    .then(res => res.json())
    .then(data => {
      tasks = data;
      renderTasks();
    });
}

loadTasks();
