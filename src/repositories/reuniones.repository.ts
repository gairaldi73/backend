import mysql, {ResultSetHeader, RowDataPacket} from "mysql2";
import {IUsuario} from "../models/usuario";

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    port: +process.env.DB_PORT!
});
const getReuniones= async() =>{
    const [rows] = await conn
    .promise()
    .query<RowDataPacket[]>('select * from reuniones');

    return rows[0];    
};
export {getReuniones};
