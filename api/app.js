const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(bodyParser.json({extended: true}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use(require('./routes/session-filter'));
//routers

app.use('/',require('./routes/home'));
app.use('/todo',require('./routes/todo/index'));
app.use('/login',require('./routes/login/index'));
app.use('/logout',require('./routes/logout/index'));
app.use('/register',require('./routes/register/index'));

const port = 8080;

app.listen(port,()=> console.log(`Listening on port ${port}`));