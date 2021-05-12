import amqp from 'amqplib';

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'hello';
  const msg = 'Hello World';

  channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log('Sent Message:', msg);

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
}

main();
