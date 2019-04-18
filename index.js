const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const app = express();
const members = require('./members')



//init middleware
//app.use(logger);

//Handlebars Midleare
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body Parser Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Homepage route
app.get('/',(req,res) =>res.render('index',{
    title:'Member app',
    members
}))

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members',require('./routes/api/members'))

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log('server started'))