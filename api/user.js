const express = require('express');

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '18.220.88.197',
  user: 'cheetah',
  password: 'cs360project',
  port: 3306,
  database: 'cheetah',
});

connection.connect();

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query(
    'SELECT * FROM USER where Username = ? AND Password = ?',
    [username, password],
    (err, rows) => {
      if (err) {
        throw err;
      }

      if (rows.length > 0) {
        const user = {
          username: rows[0].Username,
          name: `${rows[0].Lname} ${rows[0].Fname}`,
        };

        res.send({ authenticated: true, user });
      } else {
        res.send({ authenticated: false });
      }
    },
  );
});

router.get('/join', (req, res) => {
  res.send('joined');
});

module.exports = router;
