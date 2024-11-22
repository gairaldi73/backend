import {stringify} from "querystring";
import {Sequelize, DataTypes, Model, ModelCtor} from "sequelize";
import {Usuario} from "../models/usuario";

const dbdb = process.env.DB_DB;
let UsuarioModel: ModelCtor<Model<any, any>>;

const seq = new Sequelize(
    process.env.DB_DB!,
    process.env.DB_USER!,
    process.env.DB_PASS!,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!
    }
);

seq
.authenticate()
.then(() =>{
    console.log("Conexión exitosa");

    const UsuarioModel = seq.define("usuarios", {
        id: {
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);
seq
    .sync()
    .then(()=>{
        console.log("tabla creada");
    })
    .catch(error =>{
        console.log(error);
    });
})
.catch(error =>{
    console.log("No me pude conectar", error);
});


const getAll = async () => {
    return await UsuarioModel.findAll();
};

const getById = async (id: number) =>{
    return await UsuarioModel.findOne({
        where: {
            id: id
        }
    });
};

const insertarUsuario = async(usuario: Usuario) =>{
    return await UsuarioModel.create(usuario);
};


export {getAll, insertarUsuario, getById};