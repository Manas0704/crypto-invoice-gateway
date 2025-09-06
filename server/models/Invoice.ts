import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  invoiceId: string;
  fiatAmount: number;
  fiatCurrency: string;
  cryptoCurrency: string;
  cryptoAmount: number;
  status: 'pending' | 'confirmed' | 'paid';
  clientEmail?: string;
  createdAt: Date;
  updatedAt: Date; 
}

const invoiceSchema: Schema = new Schema<IInvoice>(
  {
    invoiceId: { type: String, required: true, unique: true },
    fiatAmount: { type: Number, required: true },
    fiatCurrency: { type: String, required: true },
    cryptoCurrency: { type: String, required: true },
    cryptoAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'paid'], default: 'pending' },
    clientEmail: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Invoice = mongoose.model<IInvoice>('Invoice', invoiceSchema);
export default Invoice;
