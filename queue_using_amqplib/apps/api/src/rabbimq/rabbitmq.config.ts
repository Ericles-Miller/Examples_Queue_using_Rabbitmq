import { InternalServerErrorException } from '@nestjs/common';
import * as amqp from 'amqplib';

export class RabbitMQConnection {
  private static connection: any = null;
  private static channel: any = null;

  static async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL);

      if (this.connection) {
        this.channel = await this.connection.createChannel();
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
