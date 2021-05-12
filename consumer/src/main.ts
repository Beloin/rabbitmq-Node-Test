import amqp from 'amqplib';

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'hello';
  const msg = 'Hello World';

  channel.assertQueue(queue, { durable: false });

  channel.consume(
    queue,
    (msg) => {
      console.log('A mensagem em Si:', msg?.content?.toString());
    },
    { noAck: true },
  );
}

main();
