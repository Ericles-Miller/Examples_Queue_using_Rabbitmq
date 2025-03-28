import { Module } from '@nestjs/common';
import { RabbiMqController } from './rabbimq.controller';
import { RabbitMQService } from './rabbimq.service';

@Module({
  controllers: [RabbiMqController],
  providers: [RabbitMQService],
})
export class RabbiMqModule {}
