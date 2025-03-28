import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RabbitMQConfig } from 'apps/api/src/rabbimq/rabbitmq.config';
import { queues } from 'apps/api/src/rabbimq/queue.constants';
import { IQueue } from 'apps/api/src/rabbimq/queue.interface';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private readonly logger = new Logger(ConsumerService.name);

  async onModuleInit() {
    await RabbitMQConfig.connect();
    await this.setupConsumers();
  }

  private async setupConsumers(): Promise<void> {
    const channel = RabbitMQConfig.getChannel();

    for (const queue of queues) {
      await channel.assertQueue(queue.name, {
        durable: queue.durable,
      });

      channel.consume(queue.name, async (message) => {
        try {
          if (message) {
            const content = JSON.parse(message.content.toString());

            await this.processMessage(content, queue);
            channel.ack(message);
          }
        } catch (error) {
          this.logger.error(`Error processing message from ${queue.name}:`, error);
          channel.nack(message, false, true);
        }
      });
    }
  }

  private async processMessage(message: any, queue: IQueue): Promise<void> {
    switch (queue.name) {
      case 'queue1':
        console.log('received message:', message);
        break;
      case 'queue2':
        console.log('received message:', message);
        break;
      case 'queue3':
        console.log('received message:', message);
        break;
      case 'queue4':
        console.log('received message:', message);
        break;
    }
  }
}
