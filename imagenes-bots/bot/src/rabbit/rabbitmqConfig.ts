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
    const connection = await amqp.connect(rabbitSettings);
    const channel = await connection.createChannel();
    await channel.assertQueue("bases", { durable: true });
    channel.prefetch(1);
    return { connection, channel };
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};
