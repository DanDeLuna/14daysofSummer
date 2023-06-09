const path = require('path');
const express = require('express');
const routes = require('./controller');
const sequelize = require('./config/connection');
const helpers = require('./utils/helper');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const hbs = exphbs.create({ helpers });

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
