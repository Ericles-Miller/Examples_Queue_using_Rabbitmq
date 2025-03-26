# Fila RabbitMQ - Durável, Persistente e com Confirmação

## Conceitos Básicos

### Durabilidade
Uma fila durável sobrevive a reinicializações do broker RabbitMQ. Mesmo se o servidor for reiniciado, a fila será recriada automaticamente.

### Persistência
Mensagens persistentes são salvas em disco. Se o RabbitMQ for reiniciado, as mensagens não serão perdidas.

### Confirmação de Mensagens (Acknowledgment)
O consumidor deve confirmar explicitamente que processou a mensagem com sucesso. Se não confirmar, a mensagem volta para a fila.

## Implementação no Projeto

### 1. Configuração do RabbitMQ (docker-compose.yml)
```yaml
services: 
   rabbitmq:
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq/mnesia  # Garante persistência dos dados
    restart: always  # Garante que o serviço sempre esteja disponível
```

### 2. Configuração do Consumidor (apps/rabbit-mq-process/src/main.ts)
```typescript
{
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://guest:guest@localhost:5672'],
    queue: 'queue_name',
    persistent: true,     // Mensagens persistentes
    noAck: false,        // Habilita confirmação manual
    queueOptions: {
      durable: true,     // Fila durável
    },
  },
}
```

### 3. Processamento de Mensagens (apps/rabbit-mq-process/src/rabbit-mq-process.controller.ts)
```typescript
@MessagePattern('queue_name')
async ConsumerQueue(
  @Payload() message: string,
  @Ctx() context: RmqContext,
): Promise<void> {
  const channel = context.getChannelRef();
  const originalMessage = context.getMessage();

  try {
    await this.rabbitMqProcessService.consumerQueue(message);
    channel.ack(originalMessage);  // Confirma processamento com sucesso
  } catch (error) {
    channel.nack(originalMessage, false, true);  // Rejeita e recoloca na fila
  }
}
```

## Benefícios desta Implementação

1. **Confiabilidade**: Mensagens não são perdidas mesmo em caso de falhas
2. **Durabilidade**: Filas sobrevivem a reinicializações
3. **Garantia de Entrega**: Mensagens são reprocessadas em caso de falha
4. **Persistência**: Dados são salvos em disco

Esta implementação é ideal para sistemas que não podem perder mensagens e precisam garantir o processamento de todas elas.
