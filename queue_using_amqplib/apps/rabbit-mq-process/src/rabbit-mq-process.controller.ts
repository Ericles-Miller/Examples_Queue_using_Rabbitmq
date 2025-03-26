import {
  Controller,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { RabbitMqProcessService } from './rabbit-mq-process.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class RabbitMqProcessController {
  private readonly logger = new Logger(RabbitMqProcessController.name);

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

    try {
      this.logger.log(`Processing message: ${message}`);
      await this.rabbitMqProcessService.consumerQueue(message);
      channel.ack(originalMessage);
      this.logger.log(`Message processed: ${message}`);
    } catch (error) {
      this.logger.error(`Error processing message: ${error.message}`);

      // reject message and put it back in the queue
      channel.nack(originalMessage, false, true);

      throw new InternalServerErrorException(error);
    }
  }
}
