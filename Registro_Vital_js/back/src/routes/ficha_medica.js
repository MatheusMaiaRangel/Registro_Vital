import { Router } from "express";
import {
  createFichaMedica,
  getFichasMedicas,
  getFichaMedicaById,
  getFichaMedicaByUsuarioId,
  updateFichaMedica,
  deleteFichaMedica,
} from "../controllers/ficha_medica.js";

const router = Router();

router.post("/", createFichaMedica);
router.get("/", getFichasMedicas);
router.get("/usuario/:usuarioId", getFichaMedicaByUsuarioId);
router.get("/:id", getFichaMedicaById);
router.put("/:id", updateFichaMedica);
router.delete("/:id", deleteFichaMedica);

export default router;
