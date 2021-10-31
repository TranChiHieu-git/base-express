const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const routers = require("./routers");
const Authentication = require("./middlewares/authentication");
const {sequelize} = require("./database/sequelize");
const cors = require("cors");

const app = express();
app.use(cors({origin: "http://localhost:3000"}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(Authentication);
app.use('/', routers);
sequelize.sync();
app.listen(8080, () => {
    console.log('Authentication service started on port 8080');
});
