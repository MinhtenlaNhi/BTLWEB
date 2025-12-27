const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const path = require('path');

const app = express();
app.use(express.json());


// cors
const cors = require('cors')
app.use(cors({
  origin: "http://localhost:5173",
  method: ["GET","POST","PATCH","DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// End cors

// flash
const cookieParser = require('cookie-parser')
app.use(cookieParser("VDSAJHDJHASGDJ"));
const session = require('express-session')
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// body-parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// method overide
app.use(methodOverride("_method"));
//End method overide

// app local
app.locals.prefixAdmin = "/admin";
// end app local

// static file
app.use(express.static(`${__dirname}/public`));
// app.use(express.static(path.join(__dirname, 'public')));
// end static file



// env
require("dotenv").config();
const port = process.env.PORT;
// end env

// database
const database = require("./config/database");
database.connect();
// end database


// tiny-mce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// end tiny-mce

// engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
// end engine

// router
const routerClient = require("./routes/client/index.route");
const routerAdmin = require("./routes/admin/index.route");
routerClient(app);
routerAdmin(app);
// end router



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
