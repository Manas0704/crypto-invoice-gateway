import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import invoiceRoutes from './routes/invoice.js';


dotenv.config();
const app = express();
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/invoice', invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
