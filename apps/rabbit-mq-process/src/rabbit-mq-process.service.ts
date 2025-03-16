import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class RabbitMqProcessService {
  constructor(
    @Inject('RMQ_SERVICE')
    public readonly client: ClientRMQ,
  ) {}

  async consumerQueue(message: string): Promise<void> {
    console.log(message);
  }
}
