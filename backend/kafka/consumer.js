const { Kafka } = require('kafkajs');
const mongoose = require('mongoose');
const Order = require('../models/orderModel'); // Adjust path as necessary

const kafka = new Kafka({
    clientId: 'order-consumer-app',
    brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'order-group' });

const consumeMessages = async (topic) => {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const orderData = JSON.parse(message.value.toString());
                console.log(`Received message: ${JSON.stringify(orderData)}`);
                await processOrder(orderData);
            } catch (error) {
                console.error('Error processing message:', error.message);
            }
        },
    });
};

const processOrder = async (orderData) => {
    try {
        // Log the order data for debugging
        console.log(`Processing order data: ${JSON.stringify(orderData)}`);

        // Validate the orderData object
        if (!orderData || typeof orderData._id !== 'string') {
            console.error('order data:', orderData);
            return; // Early exit if order data is invalid
        }

        // Convert the _id to ObjectID
        const orderId = mongoose.Types.ObjectId(orderData._id);
        const order = await Order.findById(orderId);
        
        if (order) {
            order.status = 'Processing';
            await order.save();
            console.log(`Order ${order._id} processed successfully.`);
        } else {
            console.log(`Order with ID ${orderData._id} not found.`);
        }
    } catch (error) {
        console.error('Error processing order:', error.message);
    }
};

module.exports = consumeMessages;
