const express = require("express");
const CategorieController = require("../controllers/categorie");
const api = express.Router();

api.get("/categorie", CategorieController.getCategories); 
api.post("/categorie", CategorieController.createCategorie); 

module.exports = api;