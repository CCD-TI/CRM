import amqp from "amqplib";

const rabbitSettings = {
  protocol: "amqp",
  hostname: process.env.HOST_RABBITMQ,
  port: 5672,
  username: process.env.USER_RABBITMQ,
  password: process.env.PASSWORD_RABBITMQ,
  vhost: "/",
  authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
};

export const connectRabbitMQ = async () => {
  try {
    const queueName = process.env.PHONE;
    const connection = await amqp.connect(rabbitSettings);
    const channel = await connection.createChannel();
    const exchange = 'asesores';
    
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchange, queueName);

    channel.prefetch(1);
    return { connection, channel };
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};
