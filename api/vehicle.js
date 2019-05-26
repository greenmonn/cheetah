const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection({
  host: '18.220.88.197',
  user: 'cheetah',
  password: config.mysql_secret,
  port: 3306,
  database: 'cheetah',
});

connection.connect();

const router = express.Router();

router.get('/search', (req, res) => {
  const sql = 'SELECT * FROM VEHICLE';
  connection.query(
  sql,
  (err, rows) => {
    if (err) {
      res.send({
        success: false,
      });
      console.log(err);
      return;
    }

    // const vehicle_datas = [];
    // const vehicle_data = {};
    // Object.keys(row).forEach((key) => {
    //   const newkey = firstToUpperCase(key);
    //   vehicle_data[newkey] = row[key];
    // });
    // vehicle_datas.push(vehicle_data)

    console.log(rows);
    res.send({
      vehicle_data: rows,
      success: true,
    });
  },
)});


router.post('/join', async (req, res) => {
  req.body.password = await hash(req.body.password);

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
