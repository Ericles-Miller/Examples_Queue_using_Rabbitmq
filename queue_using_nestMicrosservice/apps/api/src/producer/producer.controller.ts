import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('producer')
@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @ApiOperation({
    summary: 'Send message to queue',
    description: 'Send message to queue',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Send message to queue',
        },
      },
    },
  })
  @Post()
  async create(@Body('message') message: string): Promise<void> {
    return await this.producerService.sendMessageToQueue(message);
  }
}
