const Note = require("../models/note");

// Listar Notas
async function getNotes(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  const { active } = req.query;
  let response = null;
  if (!active) {
    response = await Note.find();
  } else {
    response = await Note.find({ active });
  }
  if (!response) {
    res.status(400).send({ msg: "No se han encontrado notas" });
  } else {
    res.status(200).send(response);
  }
}

// Listar Notas
async function getSingleNote(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  const { id } = req.params;
  Note.findOne({ _id: id })
    .then((noteStored) => {
      if (noteStored) {
        res.status(200).send(noteStored);
      } else {
        res.status(400).send({ msg: "No se ha encontrado la nota" });
      }
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "No se ha encontrado la nota" });
      }
    });
}

async function getMyNotes(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  const { active, user_id } = req.query;
  let response = await Note.find({active, user_id });
  if (!response) {
    res.status(400).send({ msg: "No se han encontrado notas" });
  } else {
    res.status(200).send(response);
  }
}

// Agregar nota
async function createNote(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  const note = new Note({
    ...req.body,
    create_at: new Date().toISOString(),
    active: true,
  });
  note
    .save()
    .then((noteStored) => {
      res.status(200).send(noteStored);
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear la nota" });
      }
    });
}

// Actualizar notas
async function updateNote(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  const { id } = req.params;
  const noteData = req.body;
  Note.findByIdAndUpdate({ _id: id }, noteData)
    .then(() => {
      res.status(200).send({ msg: "Nota actualizada" });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al actualizar la nota" });
      }
    });
}

// borrar nota
async function deleteNote(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  const { id } = req.params;
  Note.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).send({ msg: "Nota eliminada" });
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al eliminar la nota" });
      }
    });
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getMyNotes,
  getSingleNote,
};
