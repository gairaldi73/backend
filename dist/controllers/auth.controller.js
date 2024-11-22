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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUsuario = void 0;
const auth_repository_1 = require("../repositories/auth.repository");
const usuario_sequelize_1 = require("../repositories/usuario.sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = require("../models/usuario");
const authUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_repository_1.getByUsernameAndPassword)(req.body.username, req.body.password);
    if (user) {
        //genero JWT
        const payload = {
            name: user.username,
            role: "guest",
            iss: new Date()
        };
        const token = jsonwebtoken_1.default.sign(payload, 'ESTE_ES_EL_SECRET_DEL_JWT');
        res.end(token);
    }
    else {
        res.status(401).end("Usuario o password inválido");
    }
});
exports.authUsuario = authUsuario;
const altaUsuario = (req, res) => {
    console.log(req.body);
    if (!req.body.nombre || req.body.apellido) {
        res.status(400).end("Nombre y apellido requeridos");
    }
    else {
        const usuario = new usuario_1.Usuario(req.body.nombre, req.body.apellido);
        (0, usuario_sequelize_1.insertarUsuario)(usuario);
        res.status(201).end("Usuario guardado con éxito");
    }
};
const consultaUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield (0, usuario_sequelize_1.getAll)();
    res.json(usuarios);
});
const consultaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield (0, usuario_sequelize_1.getById)(+req.params.id);
    console.log(usuario);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).end("Usuario no encontrado");
    }
});
