const mongoose = require('mongoose');

//mongoose-mongodb
mongoose.Promise = global.Promise;
const db = mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true },
    err => {
        if (err) throw err;
        console.log(`Successfully connected to database.`);
    }).catch(err => {
        console.log('database err', err);
    });

module.exports = db;
