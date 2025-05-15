const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

let tasks = [];

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
