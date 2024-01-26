require('dotenv').config();
const DB_User = process.env.DB_User;
const DB_Password = process.env.DB_Password;
const DB_Host = process.env.DB_Host;
const dbName = process.env.dbName;
const API_Version = "v1";;
const IP_Server = "localhost";
const JWT_SECRET_KEY = "asdPKASJMhsdJSJKAJSDSAWETAS";
module.exports = {
    DB_User,
    DB_Password,
    DB_Host,
    API_Version,
    IP_Server,
    dbName,
    JWT_SECRET_KEY
};