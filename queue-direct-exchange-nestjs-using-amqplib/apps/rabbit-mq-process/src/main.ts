import { NestFactory } from '@nestjs/core';
import { RabbitMqProcessModule } from './rabbit-mq-process.module';

async function bootstrap() {
  const app = await NestFactory.create(RabbitMqProcessModule);
  await app.listen(3334, () => console.log('RabbitMq Service is running!'));
}

bootstrap();
