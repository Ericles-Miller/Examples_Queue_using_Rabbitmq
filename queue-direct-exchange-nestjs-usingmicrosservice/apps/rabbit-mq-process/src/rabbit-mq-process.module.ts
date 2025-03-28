import { Module } from '@nestjs/common';
import { ConsumerService } from './rabbit-mq-consumer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ConsumerService],
})
export class RabbitMqProcessModule {}
