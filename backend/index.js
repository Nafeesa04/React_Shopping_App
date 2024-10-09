const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const consumeMessages = require('./kafka/consumer');  



const cors = require('cors');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(express.static('frontend/build'));

const startConsumer = async () => {
    try {
        await consumeMessages('order-topic'); // Start consuming messages from the specified topic
    } catch (error) {
        console.error('Error starting consumer:', error);
    }
};

startConsumer();

app.get('/health', (req, res) => res.status(200).send('OK'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

