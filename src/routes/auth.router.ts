import express from "express";
import{authUsuario} from "../controllers/auth.controller";
const router = express.Router();
router.post("/", authUsuario);
export default router;