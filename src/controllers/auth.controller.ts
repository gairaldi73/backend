import {Request, Response} from "express";
import {getByUsernameAndPassword} from "../repositories/auth.repository";
import {getAll, getById, insertarUsuario} from "../repositories/usuario.sequelize";
import jsonwebtoken from "jsonwebtoken";

import {Usuario} from "../models/usuario";

const authUsuario = async(req: Request, res: Response) =>{
    const user= await getByUsernameAndPassword(
    req.body.username,
    req.body.password 
    );
    if (user){
    //genero JWT
    const payload = {
        name: user.username,
        role: "guest",
        iss: new Date()
    };
    const token = jsonwebtoken.sign(payload,'ESTE_ES_EL_SECRET_DEL_JWT');
    res.end(token);
    }else{
    res.status(401).end("Usuario o password inválido");
}
};
const altaUsuario = (req: Request, res: Response) =>{
    console.log(req.body);
    if (!req.body.nombre || req.body.apellido) {
        res.status(400).end ("Nombre y apellido requeridos");
    }else {
        const usuario = new Usuario (req.body.nombre, req.body.apellido);
        insertarUsuario(usuario);
        res.status(201).end("Usuario guardado con éxito");
        }
    };

    const consultaUsuarios = async (req: Request, res: Response) =>{
        const usuarios = await getAll();
        res.json(usuarios);
    };

    const consultaPorId = async(req: Request, res: Response) =>{
        const usuario = await getById(+req.params.id);
        console.log(usuario);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).end("Usuario no encontrado");
        }
    };


export {authUsuario};
