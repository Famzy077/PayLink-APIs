import express from 'express';
import { createpaymentLink, getAllpaymentLinks, getpaymentLinkById, updatepaymentLink, deletepaymentLink } from '../controllers/PaymentLink.controller';
import authenticateToken from '../middlewares/auth.middlewares';

const router = express.Router();

router.post('/payment-link', authenticateToken, createpaymentLink);
router.get('/payment-links', authenticateToken, getAllpaymentLinks);
router.get('/payment-link/:id', authenticateToken, getpaymentLinkById);
router.put('/payment-link/:id', authenticateToken, updatepaymentLink);
router.delete('/payment-link/:id', authenticateToken, deletepaymentLink);

export default router;
