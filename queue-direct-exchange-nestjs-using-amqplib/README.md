# RabbitMQ Direct Exchange NestJS Microservice

This project demonstrates a RabbitMQ implementation using Direct Exchange pattern with NestJS microservices.

## Architecture Overview

- **Exchange Type**: Direct
- **Exchange Name**: direct_exchange
- **Exchange Durability**: Durable (survives broker restarts)

### Queue Configuration

We have 4 queues configured with different properties:

1. **queue1**
   - Durable: true
   - Routing Keys: ['key1', 'key2']

2. **queue2**
   - Durable: false
   - Routing Keys: ['key1', 'key2']

3. **queue3**
   - Durable: true
   - Routing Key: ['key3']

4. **queue4**
   - Durable: true
   - Routing Key: ['key4']

## Setup Instructions

1. Start RabbitMQ using Docker:

```bash
docker-compose up -d
```

This will start RabbitMQ with:
- Management UI on port 15672
- AMQP on port 5672
- Default credentials: admin/admin

2. Access RabbitMQ Management UI:
- URL: http://localhost:15672
- Username: admin
- Password: admin

## Implementation Details

### 1. Queue Constants (queue.constants.ts)
```typescript
import { IQueue } from './queue.interface';

export const EXCHANGE_TYPE = 'direct' as const;
export const EXCHANGE_NAME = 'direct_exchange' as const;

export const queues: IQueue[] = [
  {
    name: 'queue1',
    durable: true,
    routingKeys: ['key1', 'key2'],
  },
  {
    name: 'queue2',
    durable: false,
    routingKeys: ['key1', 'key2'],
  },
  {
    name: 'queue3',
    durable: true,
    routingKeys: ['key3'],
  },
  {
    name: 'queue4',
    durable: true,
    routingKeys: ['key4'],
  },
];

```

### 2. Queue Confiiguration (queue.config.ts)
```typescript
import { InternalServerErrorException } from '@nestjs/common';
import * as amqp from 'amqplib';
import { EXCHANGE_NAME, EXCHANGE_TYPE, queues } from './queue.constants';
import { IQueue } from './queue.interface';
import { IPublishMessage } from './publish-message.interface';
import 'dotenv/config';

export class RabbitMQConfig {
  private static connection: amqp.ChannelModel;
  private static channel: any = null;
  private static readonly typeExchange = 'direct';

  static async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL, {
        timeout: 15000,
        heartbeat: 60,
      });

      if (this.connection) {
        this.channel = await this.connection.createChannel();

        await this.channel.assertExchange(this.typeExchange, 'direct', {
          durable: true,
        });

        await this.setupExchange();
        await this.setupQueuesAndBindings();
      }
    } catch (error) {
      throw new InternalServerErrorException('Error connecting to RabbitMQ:', error);
    }
  }

  private static async setupExchange(): Promise<void> {
    await this.channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, {
      durable: true,
    });
  }

  private static async setupQueuesAndBindings(): Promise<void> {
    for (const queue of queues) {
      await this.setupQueue(queue);
    }
  }

  private static async setupQueue(queue: IQueue): Promise<void> {
    await this.channel.assertQueue(queue.name, { durable: queue.durable });

    for (const routingKey of queue.routingKeys) {
      await this.channel.bindQueue(queue.name, EXCHANGE_NAME, routingKey);
    }
  }

  static getChannel(): amqp.Channel {
    if (!this.channel) {
      throw new InternalServerErrorException('RabbitMQ channel not initialized');
    }
    return this.channel;
  }

  static async publishMessage({ routingKey, message, options }: IPublishMessage): Promise<boolean> {
    try {
      if (options.queueName) {
        await this.channel.assertQueue(options.queueName, { durable: true });
        await this.channel.bindQueue(options.queueName, EXCHANGE_NAME, routingKey);
      }

      return this.channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)), {
        persistent: options.persistent ?? true,
        options,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error publishing message:', error);
    }
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
      throw new InternalServerErrorException('Error closing RabbitMQ connection:', error);
    }
  }
}
```

### 3. Message Publishing (rabbitmq.service.ts)
Example of sending messages to different queues:

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy, InternalServerErrorException } from '@nestjs/common';
import { RabbitMQConfig } from './rabbitmq.config';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  constructor() {}

  async onModuleInit() {
    await RabbitMQConfig.connect();
  }

  async onModuleDestroy() {
    await RabbitMQConfig.closeConnection();
  }

  async sendToQueue1key1(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key1',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue1',
        },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue1key2(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key2',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue1',
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue2key1(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key1',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue2',
        },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue2key2(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key2',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue2',
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue3(message: string): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key3',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue3',
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendToQueue4(message: any): Promise<boolean> {
    try {
      await RabbitMQConfig.publishMessage({
        routingKey: 'key4',
        message: message,
        options: {
          persistent: true,
          queueName: 'queue4',
        },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

```

### 4. Rabbitmq Controller (rabbitmq.controller.ts)
```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RabbitMQService } from './rabbimq.service';

@Controller('rabbimq')
@ApiTags('rabbimq')
export class RabbiMqController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('queue1-key1')
  async sendMessageQueue1Key1(@Body() message: string) {
    const result = await this.rabbitMQService.sendToQueue1key1(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue1-key2')
  async sendMessageQueue1Key2(@Body() message: string) {
    const result = await this.rabbitMQService.sendToQueue1key2(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue2-key1')
  async sendMessageQueue2Key1(@Body() message: string) {
    const result = await this.rabbitMQService.sendToQueue2key1(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue2-key2')
  async sendMessageQueue2Key2(@Body() message: string) {
    const result = await this.rabbitMQService.sendToQueue2key2(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue3')
  async sendMessageQueue3(@Body() message: string) {
    const result = await this.rabbitMQService.sendToQueue3(message);
    return { success: result, message: 'Message sent to queue' };
  }

  @Post('queue4')
  async sendMessageQueue4(@Body() message: string) {
    const result = await this.rabbitMQService.sendToQueue3(message);
    return { success: result, message: 'Message sent to queue' };
  }
}
```

### 5. Message Consumer (rabbit-mq-consumer.service.ts)
```typescript
@Injectable()
export class ConsumerService implements OnModuleInit {
  async onModuleInit() {
    await RabbitMQConfig.connect();
    await this.setupConsumers();
  }

  private async setupConsumers(): Promise<void> {
    const channel = RabbitMQConfig.getChannel();
    
    for (const queue of queues) {
      await channel.assertQueue(queue.name, { 
        durable: queue.durable 
      });
      
      channel.consume(queue.name, async (message) => {
        try {
          const content = JSON.parse(message.content.toString());
          await this.processMessage(content, queue.name);
          channel.ack(message);
        } catch (error) {
          channel.nack(message, false, true);
        }
      });
    }
  }
}
```

### 6. Message Options Interface
```typescript
interface IMessageOptions {
  persistent?: boolean;
  queueName?: string;
  expiration?: string | number;
  priority?: number;
}

export interface IPublishMessage {
  routingKey: string;
  message: string;
  options?: IMessageOptions;
}

```

## Features

- **Durability**: Messages persist through broker restarts
- **Direct Exchange**: Messages are routed based on exact routing key matches
- **Multiple Bindings**: Queues can bind to multiple routing keys
- **Error Handling**: Comprehensive error handling with message acknowledgment
- **Message Persistence**: Options for message persistence and queue durability

## Connection Management

The RabbitMQ connection is managed through `RabbitMQConfig` class which handles:
- Connection establishment
- Channel creation
- Exchange setup
- Queue creation and bindings
- Message publishing
- Graceful connection closure

## Error Handling

- Messages are acknowledged only after successful processing
- Failed messages are requeued using `channel.nack()`
- Connection errors are handled with proper error messages
- Automatic reconnection attempts on connection failure

## Best Practices Implemented

1. Durable exchanges and queues for critical messages
2. Message persistence for important data
3. Proper channel and connection management
4. Graceful shutdown handling
5. Comprehensive error handling and logging


## 🚀 Como Usar

1. Clone o repositório
```bash
git clone https://github.com/ericles/Work_RabbitMq_Micro_Services_Simple_Queue.git
```

2. Escolha a implementação
```bash
git checkout <nome-da-branch>
```

3. Instale as dependências
```bash
yarn install
```

4. Inicie o RabbitMQ
```bash
docker-compose up -d
```

5. Execute o projeto
```bash
# development
yarn run start

# watch mode
yarn run start:dev api && yarn start:dev rabbit-mq-process
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).