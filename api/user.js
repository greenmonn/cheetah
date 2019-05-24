const express = require('express');

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '18.220.88.197',
  user: 'cheetah',
  password: 'cs360project', // should be hided
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

router.post('/join', (req, res) => {
  // const user = [];
  // Object.keys(req.body).forEach((key) => {
  //   if (
  //     key === 'phone_no'
  //     || key === 'license_no'
  //     || key === 'card_no'
  //     || key === 'expr_date'
  //     || key === 'cvv'
  //   ) {
  //     user.push(parseInt(req.body[key], 10));
  //   } else {
  //     user.push(req.body[key]);
  //   }
  // });

  connection.query(
    'INSERT INTO USER (Username, Password, Fname, Lname, Phone_no, License_no, Card_no, Expr_date, Cvv) VALUES ?',
    [[Object.values(req.body)]],
    (err, result) => {
      if (err) {
        res.send(false);
        return;
      }
      console.log(result);
      res.send(true);
    },
  );
});

module.exports = router;
