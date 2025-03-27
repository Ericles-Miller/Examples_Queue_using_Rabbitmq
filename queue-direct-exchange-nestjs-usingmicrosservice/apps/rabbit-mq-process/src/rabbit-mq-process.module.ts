import { Module } from '@nestjs/common';
import { RabbitMqProcessController } from './rabbit-mq-process.controller';
import { RabbitMqProcessService } from './rabbit-mq-process.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RMQ_SERVICE',
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
    ]),
  ],

  controllers: [RabbitMqProcessController],
  providers: [RabbitMqProcessService],
})
export class RabbitMqProcessModule {}
