const Categorie = require("../models/categorie");

// Agregar nota
async function createCategorie(req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  const categorie = new Categorie({
    ...req.body,
    active: true,
  });
  categorie
    .save()
    .then((categorieStored) => {
      res.status(200).send(categorieStored);
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear la categoria" });
      }
    });
}
// Listar Notas
async function getCategories(req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  Categorie.find({ active: true })
  .then((categorieStored) => {
    res.status(200).send(categorieStored);
  })
  .catch((error) => {
    if (error) {
      res.status(400).send({ msg: "No se han encontrado categorias" });
    }
  })
}

module.exports = {
  createCategorie,
  getCategories
};
