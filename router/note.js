const express = require("express");
const NoteController = require("../controllers/note");
const md_auth = require("../middlewares/authenticated");
const api = express.Router();

api.get("/note", NoteController.getNotes); 
api.get("/mynote", [md_auth.asureAuth], NoteController.getMyNotes);
api.get("/singlenote/:id", [md_auth.asureAuth], NoteController.getSingleNote);
api.post("/note",[md_auth.asureAuth], NoteController.createNote); 
api.patch("/note/:id", [md_auth.asureAuth], NoteController.updateNote); 
api.delete("/note/:id", [md_auth.asureAuth], NoteController.deleteNote); 

module.exports = api;