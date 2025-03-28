# RabbitMQ - Exemplos de Implementações de Filas

Este repositório contém diferentes implementações de filas usando RabbitMQ e NestJS, cada uma demonstrando diferentes características e configurações. O objetivo é fornecer exemplos práticos de como implementar diferentes tipos de filas de acordo com suas necessidades específicas.

## 🎯 Objetivo

O propósito deste repositório é servir como referência para desenvolvedores que precisam implementar diferentes tipos de filas em seus projetos, demonstrando as melhores práticas e configurações para cada caso de uso.

## 📑 Índice de Implementações

Cada implementação está em uma branch separada, com sua própria documentação e exemplo completo.

### Implementações Disponíveis

1. **[Fila Durável com Persistência e Confirmação](https://github.com/Ericles-Miller/Work_RabbitMq_Micro_Services_Simple_Queue/tree/queue_durable_persistent_)** - Branch: `durable-persistent-ack`
   - ✅ Durabilidade: Fila sobrevive a reinicializações
   - ✅ Persistência: Mensagens salvas em disco
   - ✅ Confirmação: Acknowledgment manual de mensagens
   - 📝 [Documentação Detalhada](./QueueREADME.MD)

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


# Tutorial english

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

### 1. Queue Configuration (queue.constants.ts)
```typescript
export const EXCHANGE_TYPE = 'direct';
export const EXCHANGE_NAME = 'direct_exchange';

export const queues: IQueue[] = [
  {
    name: 'queue1',
    durable: true,
    routingKeys: ['key1', 'key2']
  },
  // ... other queues
];
```

### 2. Message Publishing (rabbitmq.service.ts)
Example of sending messages to different queues:

```typescript
// Send to queue1 with key1
await sendToQueue1key1(message: string)

// Send to queue2 with key2
await sendToQueue2key2(message: string)
```

### 3. Message Consumer (rabbit-mq-consumer.service.ts)
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

### 4. Message Options Interface
```typescript
interface IMessageOptions {
  persistent?: boolean;
  queueName?: string;
  expiration?: string | number;
  priority?: number;
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

# Tutorial in portuguese
# RabbitMQ Direct Exchange NestJS Microservice

Este projeto demonstra uma implementação RabbitMQ usando o padrão Direct Exchange com microsserviços NestJS.

## Visão Geral da Arquitetura

- **Tipo de Exchange**: Direct
- **Nome do Exchange**: direct_exchange
- **Durabilidade do Exchange**: Durável (sobrevive a reinicializações do broker)

### Configuração das Filas

Temos 4 filas configuradas com diferentes propriedades:

1. **queue1**
   - Durável: sim
   - Chaves de Roteamento: ['key1', 'key2']

2. **queue2**
   - Durável: não
   - Chaves de Roteamento: ['key1', 'key2']

3. **queue3**
   - Durável: sim
   - Chave de Roteamento: ['key3']

4. **queue4**
   - Durável: sim
   - Chave de Roteamento: ['key4']

## Instruções de Configuração

1. Inicie o RabbitMQ usando Docker:

```bash
docker-compose up -d
```

Isso iniciará o RabbitMQ com:
- Interface de gerenciamento na porta 15672
- AMQP na porta 5672
- Credenciais padrão: admin/admin

2. Acesse a Interface de Gerenciamento do RabbitMQ:
- URL: http://localhost:15672
- Usuário: admin
- Senha: admin

## Detalhes da Implementação

### 1. Configuração das Filas (queue.constants.ts)
```typescript
export const EXCHANGE_TYPE = 'direct';
export const EXCHANGE_NAME = 'direct_exchange';

export const queues: IQueue[] = [
  {
    name: 'queue1',
    durable: true,
    routingKeys: ['key1', 'key2']
  },
  // ... outras filas
];
```

### 2. Publicação de Mensagens (rabbitmq.service.ts)
Exemplo de envio de mensagens para diferentes filas:

```typescript
// Enviar para queue1 com key1
await sendToQueue1key1(message: string)

// Enviar para queue2 com key2
await sendToQueue2key2(message: string)
```

### 3. Consumidor de Mensagens (rabbit-mq-consumer.service.ts)
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

### 4. Interface de Opções de Mensagem
```typescript
interface IMessageOptions {
  persistent?: boolean;
  queueName?: string;
  expiration?: string | number;
  priority?: number;
}
```

## Funcionalidades

- **Durabilidade**: Mensagens persistem através de reinicializações do broker
- **Direct Exchange**: Mensagens são roteadas com base em correspondências exatas de chaves de roteamento
- **Múltiplos Bindings**: Filas podem se vincular a múltiplas chaves de roteamento
- **Tratamento de Erros**: Tratamento abrangente de erros com confirmação de mensagens
- **Persistência de Mensagens**: Opções para persistência de mensagens e durabilidade de filas

## Gerenciamento de Conexão

A conexão RabbitMQ é gerenciada através da classe `RabbitMQConfig` que lida com:
- Estabelecimento de conexão
- Criação de canal
- Configuração de exchange
- Criação de filas e bindings
- Publicação de mensagens
- Fechamento adequado de conexão

## Tratamento de Erros

- Mensagens são confirmadas apenas após processamento bem-sucedido
- Mensagens com falha são recolocadas na fila usando `channel.nack()`
- Erros de conexão são tratados com mensagens apropriadas
- Tentativas automáticas de reconexão em caso de falha

## Melhores Práticas Implementadas

1. Exchanges e filas duráveis para mensagens críticas
2. Persistência de mensagens para dados importantes
3. Gerenciamento adequado de canais e conexões
4. Tratamento adequado de desligamento
5. Tratamento e registro abrangente de erros
