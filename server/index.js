console.log('yooo');

const express = require('express');
const cors = require('cors');
const  morgan = require('morgan');

const app = express();
app.use(morgan('combine'));
app.use(cors());
app.use(express.json());




app.get('/status', (req,res) => {
    res.send({message: 'It starts'})
})









const port = process.env.PORT || 3000
app.listen(port, () =>{ console.log(`listening on port ${port}`) })