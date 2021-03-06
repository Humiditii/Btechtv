const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
//require('./models/db');

const app = express();

const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const favicon = require('serve-favicon');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);

const MONGO_URI = 'mongodb+srv://sebago:ibaolqho1085_@cluster0-r4hei.mongodb.net/test?retryWrites=true&w=majority';

const  store = new mongoDbStore({
    uri: MONGO_URI,
    collection: 'sessions'
});

app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout', extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', 'views');

const applicationRoutes = require('./routes/app');


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret' ,
                resave: false,
                saveUninitialized: false,
                store: store
            }));



app.use(applicationRoutes);



const port = process.env.PORT || 7000;
//  app.listen(port, ()=>{
//     // console.log('serving on port ' + port);
//  });

 mongoose
     .connect(MONGO_URI, {
             useNewUrlParser: true
        })
     .then(result => {
         app.listen(port);
     })
     .catch(err => {
         console.log(err);
     });


