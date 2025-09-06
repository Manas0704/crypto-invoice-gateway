import express from 'express';
import { createInvoice, getInvoiceById } from '../controllers/invoiceController.js';
import { convertFiatToCrypto } from "../services/conversion.js";

const router = express.Router();

// Create new invoice
router.post("/", createInvoice);
// Get invoice by ID
router.get('/:id', getInvoiceById);

export default router;
