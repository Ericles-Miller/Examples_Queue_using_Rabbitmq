import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from 'apps/api/src/rabbimq/rabbimq.service';
import { RabbitMQConnection } from 'apps/api/src/rabbimq/rabbitmq.config';

@Injectable()
export class ConsumerService implements OnModuleInit {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async onModuleInit() {
    await RabbitMQConnection.connect();
  }

  async consume(queue: string): Promise<void> {
    try {
      const channel = RabbitMQConnection.getChannel();
      await channel.assertQueue(queue, { durable: true });

      channel.consume(queue, async (message) => {
        await this.exampleService(message);
        channel.ack(message);
      });
    } catch (error) {
      console.error('Error consuming message:', error);
      throw error;
    }
  }

  async exampleService(message: string): Promise<void> {
    console.log('Received message:', message);
  }
}
