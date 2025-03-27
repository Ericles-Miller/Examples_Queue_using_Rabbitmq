import { InternalServerErrorException } from '@nestjs/common';
import * as amqp from 'amqplib';

export class RabbitMQConnection {
  private static connection: amqp.ChannelModel;
  private static channel: any = null;
  private static readonly typeExchange = 'direct';

  static async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL);

      if (this.connection) {
        this.channel = await this.connection.createChannel();

        await this.channel.assertExchange(this.typeExchange, 'direct', {
          durable: true,
        });

        await this.setQueue('queue1', true);
        await this.setQueue('queue2', false);

        await this.setBindQueue('queue1', this.typeExchange, 'key1');
        await this.setBindQueue('queue1', this.typeExchange, 'key2');

        /// create a new config to send unique routing key to queue2
        await this.setBindQueue('queue2', this.typeExchange, 'key2');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error connecting to RabbitMQ:',
        error,
      );
    }
  }

  static getChannel(): any {
    if (!this.channel) {
      throw new InternalServerErrorException(
        'RabbitMQ channel not initialized',
      );
    }
    return this.channel;
  }

  static async setQueue(queueName: string, durable: boolean): Promise<any> {
    await this.channel.assertQueue(queueName, { durable });
  }

  static async setBindQueue(
    queueName: string,
    exchangeName: string,
    routingKey: string,
  ): Promise<void> {
    await this.channel.bindQueue(queueName, exchangeName, routingKey);
  }

  static async closeConnection(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error closing RabbitMQ connection:',
        error,
      );
    }
  }
}
