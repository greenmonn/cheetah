const express = require('express');

const app = express();

const cors = require('cors');

const userRoute = require('./user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/user', userRoute);

app.get('/', (req, res) => {
  res.send('api');
});

app.listen(3001, () => {
  console.log('API Server running in 3001');
});
