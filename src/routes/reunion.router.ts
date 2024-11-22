import express from "express";
import {mostrarReunion} from "../controllers/algo.controller";
const router = express.Router();
router.get("/", mostrarReunion);
export default router;