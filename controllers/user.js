const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function getMe(req, res) {
  res.header('Access-Control-Allow-Origin', 'https://fullstack-frontend-nu.vercel.app/')
  const { user_id } = req.user;
  const response = await User.findById(user_id);
  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}
// Crear Usuarios
async function createUser(req, res) {
  const {password} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPaswword = bcrypt.hashSync(password, salt);
  const user = new User({ ...req.body, password: hashPaswword });
  user
    .save()
    .then((userStored) => {
      res.status(200).send(userStored);
      console.log("Usuario Creado");
    })
    .catch((error) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear el usuario" });
      }
    });
}


module.exports = {
    createUser,
    getMe,
  };
  