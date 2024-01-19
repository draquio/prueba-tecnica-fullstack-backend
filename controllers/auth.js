const User = require("../models/user");
const bcrypr = require("bcryptjs");
const jwt = require("../utils/jwt");

function login(req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  const { email, password } = req.body;
  if (!email) res.status(400).send({ msg: "Email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });
  const emailLowerCase = email.toLowerCase();
  User.findOne({ email: emailLowerCase }).then((userStore) => {
    if (userStore) {
      bcrypr.compare(password, userStore.password, (bcryprError, check) => {
        if (bcryprError) {
          res.status(500).send({ msg: "error del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "Contraseña incorrecta" });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    } else {
      res.status(400).send({ msg: "Usuario no encontrado" });
    }
  });
}

function refreshAccessToken(req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  const { token } = req.body;
  if (!token) {
    res.status(400).send({ msg: "token requerido" });
  }
  const { user_id } = jwt.decoded(token);
  User.findOne({ _id: user_id })
    .then((userStorage) => {
      res.status(200).send({ accessToken: jwt.createAccessToken(userStorage) });
    })
    .catch((e) => {
      res.status(500).send({ msg: "error del servidor" });
    });
}


module.exports = {
  login,
  refreshAccessToken,
};
