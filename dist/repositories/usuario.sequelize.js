"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.insertarUsuario = exports.getAll = void 0;
const sequelize_1 = require("sequelize");
const dbdb = process.env.DB_DB;
let UsuarioModel;
const seq = new sequelize_1.Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASS, {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT
});
seq
    .authenticate()
    .then(() => {
    console.log("Conexión exitosa");
    const UsuarioModel = seq.define("usuarios", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    seq
        .sync()
        .then(() => {
        console.log("tabla creada");
    })
        .catch(error => {
        console.log(error);
    });
})
    .catch(error => {
    console.log("No me pude conectar", error);
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UsuarioModel.findAll();
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UsuarioModel.findOne({
        where: {
            id: id
        }
    });
});
exports.getById = getById;
const insertarUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UsuarioModel.create(usuario);
});
exports.insertarUsuario = insertarUsuario;
