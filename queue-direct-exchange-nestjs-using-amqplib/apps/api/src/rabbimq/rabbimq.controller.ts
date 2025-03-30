import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RabbitMQService } from './rabbimq.service';
import { ProducerDto } from './producer.dto';

@Controller('rabbimq')
@ApiTags('rabbimq')
export class RabbiMqController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('queue1-key1')
  async sendMessageQueue1Key1(@Body() message: ProducerDto) {
    const result = await this.rabbitMQService.sendToQueue1key1(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue1-key2')
  async sendMessageQueue1Key2(@Body() message: ProducerDto) {
    const result = await this.rabbitMQService.sendToQueue1key2(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue2-key1')
  async sendMessageQueue2Key1(@Body() message: ProducerDto) {
    const result = await this.rabbitMQService.sendToQueue2key1(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue2-key2')
  async sendMessageQueue2Key2(@Body() message: ProducerDto) {
    const result = await this.rabbitMQService.sendToQueue2key2(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue3')
  async sendMessageQueue3(@Body() message: ProducerDto) {
    const result = await this.rabbitMQService.sendToQueue3(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue4')
  async sendMessageQueue4(@Body() message: ProducerDto) {
    const result = await this.rabbitMQService.sendToQueue4(message);
    return { success: result, message: 'Message sent to queue' };
  }
}
