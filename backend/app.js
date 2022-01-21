/* eslint-disable array-callback-return */
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/router');

app.use(cors());
app.use(express.json())

app.use('/api', router);

app.listen(3001, () => console.log('App berjalan di http://localhost:3001'));