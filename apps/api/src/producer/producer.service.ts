import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(@Inject('RMQ_SERVICE') private readonly instance: ClientRMQ) {}

  async sendMessageToQueue(message: string): Promise<void> {
    await this.instance.emit<string>('queue_name', message);
  }
}
