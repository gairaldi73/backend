"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
exports.Usuario = Usuario;
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
