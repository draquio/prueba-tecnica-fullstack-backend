const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    create_at: Date,
    categorie:String,
    active:Boolean,
    user_id:String,
});

module.exports = mongoose.model("Note", NoteSchema);