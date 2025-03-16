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
  async ConsumerQueue(
    @Payload() message: string,
    @Ctx() context: RmqContext,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    await this.rabbitMqProcessService.consumerQueue(message);
    channel.ack(originalMessage);
  }
}
