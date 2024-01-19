const mongoose = require("mongoose");

const CategorieSchema = mongoose.Schema({
    title: String,
    active:Boolean,
});

module.exports = mongoose.model("Categorie", CategorieSchema);