import { Router } from "express";
import tokenController from "../controllers/token.js";

const router = Router();

// Autenticação
router.post("/login", (req, res) => tokenController.login(req, res));

// Redefinição de senha
router.post("/password-reset/request", (req, res) => tokenController.requestPasswordReset(req, res));
router.post("/password-reset/verify", (req, res) => tokenController.verifyResetToken(req, res));
router.post("/password-reset", (req, res) => tokenController.resetPassword(req, res));

export default router;