const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/connection.js');

const app = express();
// api base url
var corsOptions = {
    origin : 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// connect db
db.mongoose.connect(
    db.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    console.log("Connected DB..");
}).catch(err => {
    console.log('Not Connect DB.',err);
    process.exit;
});

// home page
app.get('/',(req,resp)=>{
    resp.json({ 
        status : 200,
        message: 'Welcome to api application.'
    });
});

// category routes 
const category = require('./app/routes/categories.routes');
app.use('/api/category',category);

// app port
const PORT = process.env.PORT || 3000;
app.listen(PORT,(req,resp)=>{
    console.log('Server is runing.... on port '+PORT);
});