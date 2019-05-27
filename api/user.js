const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config');

const saltRounds = 10;

const connection = mysql.createConnection({
  host: '18.220.88.197',
  user: 'cheetah',
  password: config.mysql_secret,
  port: 3306,
  database: 'cheetah',
});

connection.connect();

const router = express.Router();

const firstToUpperCase = property => property.charAt(0).toUpperCase() + property.slice(1);

const createToken = (userInfo, secret) => new Promise((resolve, reject) => {
  jwt.sign(
    userInfo,
    secret,
    {
      expiresIn: '7d',
      issuer: 'cheetah',
      subject: 'userInfo',
    },
    (err, token) => {
      if (err) reject(err);
      resolve(token);
    },
  );
});

const verifyToken = (token, secret) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded);
  });
});

const hash = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) reject(err);

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM USER where Username = ?', [username], async (err, rows) => {
    if (err) {
      throw err;
    }

    if (rows.length > 0) {
      const isCorrectPassword = await bcrypt.compare(password, rows[0].Password);

      if (!isCorrectPassword) {
        res.send({ authenticated: false });
        return;
      }

      const user = {
        uid: rows[0].Uid,
        username: rows[0].Username,
        name: `${rows[0].Lname} ${rows[0].Fname}`,
        fname: rows[0].Fname,
        lname: rows[0].Lname,
        phone_no: rows[0].Phone_no.toString(),
        license_no: rows[0].License_no.toString(),
      };

      createToken(user, req.app.get('jwt-secret'))
        .then((token) => {
          res.send({ authenticated: true, user, token });
        })
        .catch(() => {
          res.send({ authenticated: false });
        });
    } else {
      res.send({ authenticated: false });
    }
  });
});

router.post('/updateInfo', (req, res) => {
  verifyToken(req.body.token, req.app.get('jwt-secret'))
    .then((decoded) => {
      console.log(decoded);
      const user = req.body;
      const updatedUser = {};

      delete user.name;
      delete user.token;

      Object.keys(user).forEach((key) => {
        const newKey = firstToUpperCase(key);
        updatedUser[newKey] = user[key];
      });

      console.log(updatedUser);

      connection.query(
        'UPDATE USER SET ? WHERE Username = ?',
        [updatedUser, user.username],
        (err, result) => {
          if (err) {
            res.send({
              success: false,
            });
            console.log(err);
            return;
          }
          console.log(result);
          res.send({
            success: true,
            user,
          });
        },
      );
    })
    .catch(() => {
      res.send({
        sucess: false,
      });
    });
});

router.post('/join', async (req, res) => {
  req.body.password = await hash(req.body.password);

  connection.query(
    'INSERT INTO USER (Username, Password, Fname, Lname, Phone_no, License_no, Card_no, Expr_date, Cvv) VALUES ?',
    [[Object.values(req.body)]],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
        return;
      }
      console.log(result);
      res.send(true);
    },
  );
});

module.exports = router;
