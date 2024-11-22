import express, {Request, Response} from "express";
import morgan from "morgan";
import cors from "cors"; 
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
dotenv.config();

import authRouter from "./routes/auth.router";
import servicioRouter from "./routes/reunion.router";

const port = process.env.PORT || 5555;
const app = express();

function auth(req: Request, res: Response, next: any){
    const token = req.headers.authorization;
if (token){
    const payload = jsonwebtoken.verify(token, process.env.JWT_PASS!);
    next();
}else{
    res.status(401);
    res.end();
}
}
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRouter);
app.use("/reuniones", auth, reunionRouter);
app.get("/segurizado1", (req:Request, res:Response) =>{
    res.send("Hola");
});
app.listen(port, () =>{
    console.log('Servidor escuchando en el puerto ${port}');
})
