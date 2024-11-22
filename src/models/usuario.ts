/*const {Model, DataTypes} = require ('sequelize');
const sequelize = require ('../db');*/
import {Model} from "sequelize";


export interface IUsuario{

        id?: number;
        username: string;
        pasword: string
}
export class Usuario {
        constructor(
           public id?: number,
           public username?: string,
           public password?: string
        ) { }
}

/*export class UsuarioModel extends Model{}
       UsuarioModel.init({
        id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        password: DataTypes.STRING
       },
       {
        sequelize
       }
);

module.exports= UsuarioModel;*/