
const mongoose = require('mongoose');
require('dotenv').config();



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('DB Connected'));