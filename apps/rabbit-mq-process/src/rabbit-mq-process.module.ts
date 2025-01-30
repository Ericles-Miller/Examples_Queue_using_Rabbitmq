import { Module } from '@nestjs/common';
import { RabbitMqProcessController } from './rabbit-mq-process.controller';
import { RabbitMqProcessService } from './rabbit-mq-process.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'queue_name',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],

  controllers: [RabbitMqProcessController],
  providers: [RabbitMqProcessService],
})
export class RabbitMqProcessModule {}
