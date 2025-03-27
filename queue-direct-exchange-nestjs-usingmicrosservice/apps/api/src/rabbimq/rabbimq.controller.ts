import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RabbitMQService } from './rabbimq.service';

@Controller('rabbimq')
@ApiTags('rabbimq')
export class RabbiMqController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post()
  async sendMessage(@Body() message: string) {
    try {
      const result = await this.rabbitMQService.publishMessage(message);
      return { success: result, message: 'Message sent to queue' };
    } catch (error) {
      throw error;
    }
  }
}
