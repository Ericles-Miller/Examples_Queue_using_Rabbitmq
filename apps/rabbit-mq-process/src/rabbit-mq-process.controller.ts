import { Controller } from '@nestjs/common';
import { RabbitMqProcessService } from './rabbit-mq-process.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class RabbitMqProcessController {
  constructor(
    private readonly rabbitMqProcessService: RabbitMqProcessService,
  ) {}

  @MessagePattern('queue_name')
  ConsumerQueue(@Payload() message: string, @Ctx() context: RmqContext): void {
    this.rabbitMqProcessService.consumerQueue(message);
  }
}
