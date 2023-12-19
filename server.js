const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
});

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'User registered successfully' });
  });

  res.send('Registered')
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
