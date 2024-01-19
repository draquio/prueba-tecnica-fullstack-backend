const mongoose = require("mongoose");
const app = require("./app");

const {
  DB_User,
  DB_Password,
  DB_Host,
  IP_Server,
  API_Version,
  dbName,
} = require("./constants");

const PORT = process.env.port || 3977;
const url = `mongodb+srv://${DB_User}:${DB_Password}@${DB_Host}/${dbName}`;

try {
  mongoose.connect(url);
  app.listen(PORT, () => {
    console.log("##################");
    console.log("#### API REST ####");
    console.log("##################");
    console.log(`http://${IP_Server}:${PORT}/api/${API_Version}`);
  });
} catch (error) {
  console.error("Error al conectar a MongoDB:", error);
  throw error;
}
