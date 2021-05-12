import amqp from 'amqplib';

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const exchange = 'topic_logs';
  const key = 'topic';
  const msg = { msg: 'string' };

  await channel.assertExchange(exchange, 'topic', { durable: false });
  channel.publish(exchange, key, Buffer.from(JSON.stringify(msg)));

  console.log('Sent Message: %s', msg);

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
}

main();
