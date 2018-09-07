const mongoose = require('mongoose');

//mongoose-mongodb
mongoose.Promise = global.Promise;
const db = mongoose.connect(
    'mongodb://test:test1234@ds141221.mlab.com:41221/guitar',
    { useNewUrlParser: true },
    err => {
        if (err) throw err;
        console.log(`Successfully connected to database.`);
    }).catch(err => {
        console.log('database err', err);
    });

module.exports = db;
