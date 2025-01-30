import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMqProcessService {
  consumerQueue(message: string): void {
    console.log(message);
  }
}
