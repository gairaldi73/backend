import {Request, Response} from "express";
import { getReuniones } from "../repositories/reuniones.repository";
import jsonwebtoken from "jsonwebtoken";
import {Usuario} from "../models/usuario";

const mostrarReunion = async (req: Request, res: Response) => {
    const reuniones = await getReuniones();
    res.json(reuniones);
    };

export {mostrarReunion};
