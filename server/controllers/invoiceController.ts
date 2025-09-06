import { Request, Response } from 'express';
import axios from 'axios';
import Invoice, { IInvoice } from '../models/Invoice.js';
import { v4 as uuidv4 } from 'uuid';
import { convertFiatToCrypto } from "../services/conversion.js";

// Create a new invoice
export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { fiatAmount, fiatCurrency, cryptoCurrency, clientEmail } = req.body;

    if (!fiatAmount || !fiatCurrency || !cryptoCurrency) {
      return res.status(400).json({ message: 'fiatAmount, fiatCurrency, and cryptoCurrency are required.' });
    }

     // Convert fiat → crypto
    const cryptoAmount = await convertFiatToCrypto(fiatAmount, cryptoCurrency, fiatCurrency);



    // Generate unique invoice ID
    const invoiceId = uuidv4();

    // Save invoice to DB
    const newInvoice: IInvoice = new Invoice({
      invoiceId,
      fiatAmount,
      fiatCurrency,
      cryptoCurrency,
      cryptoAmount,
      status: 'pending',
      clientEmail
    });

    await newInvoice.save();

    res.status(201).json({ message: 'Invoice created', invoiceId, cryptoAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

// Get invoice by ID
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findOne({ invoiceId: id });

    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};
