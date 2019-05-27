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
  const sql = 'SELECT * FROM VEHICLE ORDER BY Is_reserved DESC';
  connection.query(sql, (err, rows) => {
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
  });
});

router.post('/book', async (req, res) => {
  const { Vid, reservation } = req.body;

  connection.query(
    'INSERT INTO RESERVATION (Reserve_date, Charge, Reserved_by, Reserved_vehicle) VALUES (now(), ?, ?, ?)',
    reservation,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(false);
        return;
      }
      console.log(result);
      connection.query(
        'UPDATE VEHICLE SET Is_reserved = 1 WHERE Vid = ?',
        [[Vid]],
        (err, result) => {
          if (err) {
            res.send(false);
            return;
          }
          console.log(result);
          res.send(true);
        },
      );
    },
  );
});

router.post('/return', async (req, res) => {
  const { vid, rid } = req.body;

  connection.query('UPDATE VEHICLE SET Is_reserved = 0 WHERE Vid = ?', [vid], (err, result) => {
    if (err) {
      res.send(false);
      return;
    }
    console.log(result);

    connection.query(
      'UPDATE RESERVATION SET Return_date = now() WHERE Rid = ?',
      [rid],
      (err, result) => {
        if (err) {
          res.send(false);
          return;
        }
        res.send(true);
        console.log(result);
      },
    );
  });
});

module.exports = router;
