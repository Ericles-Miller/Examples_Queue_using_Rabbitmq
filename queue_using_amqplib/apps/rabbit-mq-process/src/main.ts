import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMqProcessModule } from './rabbit-mq-process.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RabbitMqProcessModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'queue_name',
        persistent: true,
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  console.log('RabbitMq Service is running');
  await app.listen();
}

bootstrap();
