const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let tasks = [];

// 1. Serve static files (like style.css, script.js)
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(express.json());

// 2. Serve enter.html at root "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'enter.html'));
});

// 3. Serve todo page
app.get('/todo', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// 4. API routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/add', (req, res) => {
  const { text } = req.body;
  tasks.push({ text, done: false });
  res.json({ success: true });
});

app.put('/update/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (tasks[index]) {
    tasks[index].done = !tasks[index].done;
  }
  res.json({ success: true });
});

app.delete('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  tasks.splice(index, 1);
  res.json({ success: true });
});

// 5. Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
