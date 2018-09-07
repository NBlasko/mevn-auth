const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./db/connection');
//const passport = require('passport');

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8080'
}));
//app.use(passport.initialize());
app.use(express.json());



app.use('/auth',  require('./routes/auth'));
// initialize passport




// Catch 404 errors
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

// Error handler function
app.use((err, req, res, next) => {

    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    //respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });
    // respond to server
    console.error(err);
})


//start the server
const port = app.get('port') || 3000;
app.listen(port, () => { console.log(`listening on ${port}...`) });