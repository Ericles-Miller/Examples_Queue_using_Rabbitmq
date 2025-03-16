import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class RabbitMqProcessService {
  private readonly logger = new Logger(RabbitMqProcessService.name);

  constructor(
    @Inject('RMQ_SERVICE')
    public readonly client: ClientRMQ,
  ) {}

  async consumerQueue(message: string): Promise<void> {
    try {
      this.logger.log({
        message: 'Starting message processing',
        data: message,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('Error processing message:', error);
      throw error;
    }
  }
}
