const express = require('express');
const bodyParser = require('body-parser');
const routers = require("./routers");
const Authentication = require("./middlewares/authentication");
const {sequelize} = require("./database/sequelize");
const cors = require("cors");

const app = express();
app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(Authentication);
app.use('/', routers);
sequelize.sync();
app.listen(8080);
