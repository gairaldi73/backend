import mysql, {ResultSetHeader, RowDataPacket} from "mysql2";
import {IUsuario} from "../models/usuario";

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
});
async function getByUsernameAndPassword(username: string, password: string) {
    const [rows] = await conn
        .promise()
        .query<RowDataPacket[]>('select * from usuarios where username = ? and password = ?',
            [username, password]);

    return rows[0];
}
export {getByUsernameAndPassword};
