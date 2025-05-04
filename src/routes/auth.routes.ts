import express from "express";
import {signup, login} from "../controllers/auth.controller";
import { createpaymentLink,
    getAllpaymentLinks, 
    getpaymentLinkById, 
    updatepaymentLink, 
    deletepaymentLink } from "../controllers/PaymentLink.controller";

const router = express.Router();

router.post('/signup', signup);      // ✅ Create
router.post('/login', login);       // ✅ Create
router.post('/', createpaymentLink);       // ✅ Create
router.get('/', getAllpaymentLinks);       // 📄 List
router.get('/:id', getpaymentLinkById);    // 👁 View One
router.put('/:id', updatepaymentLink);       // ✏️ Update
router.delete('/:id', deletepaymentLink);    // 🗑 Delete


export default router;
