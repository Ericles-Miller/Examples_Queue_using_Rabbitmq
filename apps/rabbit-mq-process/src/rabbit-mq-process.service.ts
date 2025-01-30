import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMqProcessService {
  getHello(): string {
    return 'Hello World!';
  }
}
