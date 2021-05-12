import amqp from 'amqplib';

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const exchange = 'topic_logs';
  const key = 'topic';

  await channel.assertExchange(exchange, 'topic', { durable: false });

  const assertNewQueue = await channel.assertQueue('', { exclusive: true });

  await channel.bindQueue(assertNewQueue.queue, exchange, key);

  channel.consume(
    assertNewQueue.queue,
    (msg) => {
      console.log(
        'Rota: %s e Mensagem: %s',
        msg?.fields.routingKey,
        msg?.content.toString(),
      );
    },
    { noAck: true },
  );
}

main();
