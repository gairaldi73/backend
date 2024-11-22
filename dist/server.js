"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const servicio_router_1 = __importDefault(require("./routes/servicio.router"));
const port = process.env.PORT || 5555;
const app = (0, express_1.default)();
function auth(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        const payload = jsonwebtoken_1.default.verify(token, "2134ESTE_ES_EL_SECRET_DEL_JWT");
        next();
    }
    else {
        res.status(401);
        res.end();
    }
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/auth", auth_router_1.default);
app.use("/servicio", auth, servicio_router_1.default);
app.get("/segurizado1", (req, res) => {
    res.send("Hola");
});
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ${port}');
});
