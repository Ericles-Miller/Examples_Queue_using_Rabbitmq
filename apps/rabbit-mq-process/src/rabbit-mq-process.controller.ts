import { Controller, Get } from '@nestjs/common';
import { RabbitMqProcessService } from './rabbit-mq-process.service';

@Controller()
export class RabbitMqProcessController {
  constructor(
    private readonly rabbitMqProcessService: RabbitMqProcessService,
  ) {}

  @Get()
  getHello(): string {
    return this.rabbitMqProcessService.getHello();
  }
}
