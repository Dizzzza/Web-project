const express = require('express');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

const dbPath = path.join(__dirname, 'bd', 'weatherapp.db'); // Путь к базе данных в папке bd

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Проверяем существование таблицы users перед созданием
  db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
    if (!row) {
      // Таблица users не существует, создаем ее
      db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
    }
  });
});

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Missing username or password' });
    }

    // Поиск пользователя в базе данных
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!row) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, row.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Аутентификация успешна
      res.json({ message: 'Login successful' });
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
