import { Injectable } from '@nestjs/common';
import { RabbitMQConnection } from './rabbitmq.config';

@Injectable()
export class RabbitMQService {
  constructor() {}
  async publishMessage(message: string): Promise<boolean> {
    try {
      await RabbitMQConnection.connect();
      const channel = RabbitMQConnection.getChannel();

      await channel.assertQueue('queueName', { durable: true });
      const messageBuffer = Buffer.from(JSON.stringify(message));

      const result = channel.sendToQueue('queueName', messageBuffer, {
        persistent: true,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
