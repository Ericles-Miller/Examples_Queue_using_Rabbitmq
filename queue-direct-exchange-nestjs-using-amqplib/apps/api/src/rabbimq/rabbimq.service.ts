import { Injectable, OnModuleInit, OnModuleDestroy, InternalServerErrorException } from '@nestjs/common';
import { RabbitMQConfig } from './rabbitmq.config';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  constructor() {}

  async onModuleInit() {
    await RabbitMQConfig.connect();
  }

  async onModuleDestroy() {
    await RabbitMQConfig.closeConnection();
  }

  async sendToQueue1key1(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key1',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue1',
        },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue1key2(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key2',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue1',
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue2key1(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key1',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue2',
        },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue2key2(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key2',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue2',
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue3(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key3',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue3',
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue4(message: any): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key4',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue4',
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
