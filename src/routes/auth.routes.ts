import express from "express";
import {signup, login} from "../controllers/auth.controller";
const router = express.Router();

router.post('/signup', signup);      // ✅ Create
router.post('/login', login);       // ✅ Create


export default router;
