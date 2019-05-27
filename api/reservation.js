const express = require('express');
const mysql = require('mysql');

const util = require('./util');
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

router.get('/:id', (req, res) => {
  const uid = req.params.id;

  connection.query(
    'SELECT * FROM RESERVATION AS r JOIN VEHICLE AS v ON v.Vid = r.Reserved_vehicle LEFT OUTER JOIN CAR AS c ON c.Vid = r.Reserved_vehicle LEFT OUTER JOIN KICKBOARD AS k ON k.Vid = r.Reserved_vehicle LEFT OUTER JOIN BIKE AS b ON b.Vid = r.Reserved_vehicle where r.Reserved_by = ?',
    [uid],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.send({
          success: false,
        });
        return;
      }

      const histories = [];
      rows.forEach((row) => {
        const history = {};
        Object.keys(row).forEach((key) => {
          let value = row[key];
          if (key === 'Reserve_date' || key === 'Return_date') {
            if (row[key]) {
              value = row[key].toISOString().slice(0, 10);
            }
          } else if (key === 'Charge') {
            value = util.numberWithCommas(row[key]);
          }
          history[util.firstToLowerCase(key)] = value;
        });
        histories.push(history);
      });

      res.send({
        success: true,
        histories,
      });
    },
  );
});

module.exports = router;
