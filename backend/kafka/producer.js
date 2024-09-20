const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'order-producer-app',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

const produceMessage = async (topic, message) => {
    try {
        await producer.connect();
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    } catch (error) {
        console.error("Error producing message:", error);
    } finally {
        await producer.disconnect();
    }
};

module.exports = produceMessage;


