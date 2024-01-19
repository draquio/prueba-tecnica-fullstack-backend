const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { API_Version } = require("./constants");

const app = express();

const noteRoutes = require("./router/note");
const userRoutes = require("./router/user");
const authRoutes = require("./router/auth");
const categorieRoutes = require("./router/categorie");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const whitelist = ["https://fullstack-frontend-nu.vercel.app"];
app.use(cors({origin:whitelist}));


app.use(`/api/${API_Version}`, noteRoutes);
app.use(`/api/${API_Version}`, userRoutes);
app.use(`/api/${API_Version}`, authRoutes);
app.use(`/api/${API_Version}`, categorieRoutes);
module.exports = app;