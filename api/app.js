const express = require('express');

const app = express();

const cors = require('cors');

const config = require('./config');
const userRoute = require('./user');
const vehicleRoute = require('./vehicle');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.set('jwt-secret', config.jwt_secret);

app.use('/api/user', userRoute);
app.use('/api/vehicle', vehicleRoute);

app.get('/api', (req, res) => {
  res.send('api');
});

app.listen(3001, () => {
  console.log('API Server running in 3001');
});
