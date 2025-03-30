import { Injectable, OnModuleInit, OnModuleDestroy, InternalServerErrorException } from '@nestjs/common';
import { RabbitMQConfig } from './rabbitmq.config';
import { ProducerDto } from './producer.dto';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  constructor() {}

  async onModuleInit() {
    await RabbitMQConfig.connect();
  }

  async onModuleDestroy() {
    await RabbitMQConfig.closeConnection();
  }

  async sendToQueue1key1({ message }: ProducerDto): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'Q1-key1',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue1',
          durable: true,
        },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue1key2({ message }: ProducerDto): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'Q1-key2',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue1',
          durable: true,
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue2key1({ message }: ProducerDto): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'Q2-key1',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue2',
          durable: false,
        },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue2key2({ message }: ProducerDto): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'Q2-key2',
        message: message,
        options: {
          persistent: false,
          queueName: 'queue2',
          durable: false,
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue3({ message }: ProducerDto): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key3',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue3',
          durable: true,
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue4({ message }: ProducerDto): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key4',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue4',
          durable: true,
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
