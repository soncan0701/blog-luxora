require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const path = require('path');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const PORT = process.env.PORT || 4000;


app.set('json spaces', 2);
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
); //
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); //

// Routes
route(app);

// Server
app.listen(PORT, () => {
    // Dòng log này sẽ cho bạn biết nó đang chạy ở cổng nào
    console.log(`App listening at port ${PORT}`); 
});
