const express = require('express');
const app = express();
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const { Store } = require('express-session');
const { Pool, Client } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: 'postgres',
  port: 5432,
});
pool.connect()
.then(() => {
  app.emit('ready');
})
.catch((e) => console.log(e));

const routes = require('./routes');

const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError } = require('./src/middlewares/middleware');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
  
const sessionOptions = session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(routes);

app.on('ready', () => {
  app.listen(3000, () =>{
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  })
});
