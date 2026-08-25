import 'dotenv/config';
import express from "express";
import path from "path";
import flash from "connect-flash";
import session from "express-session";
import { route as routes } from "./routes.js";
import csrf from "csurf";
import {
  middlewareGlobal,
  checkCsrfError,
} from "./src/middlewares/middleware.js";
import { pool } from "./src/lib/pg.js";

pool
  .connect()
  .then(() => {
    app.emit("ready");
  })
  .catch((e) => console.log(e));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionOptions = session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

const __dirname = path.resolve()
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(routes);

app.on("ready", () => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000");
    console.log("Servidor executando na porta 3000");
  });
});
