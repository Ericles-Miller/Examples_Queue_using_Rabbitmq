import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(@Inject('RMQ_SERVICE') private readonly instance: ClientRMQ) {}

  async sendMessageToQueue(message: string): Promise<void> {
    try {
      console.log('=== Producer Log ===');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Enviando mensagem:', message);
      console.log('Para a fila: queue_name');
      console.log('===================');

      try {
        await this.instance.connect();
      } catch (error) {
        console.log(
          'Conexão já estabelecida ou erro ao conectar:',
          error.message,
        );
      }

      await this.instance.emit<string>('queue_name', message);

      console.log('=== Producer Log ===');
      console.log('Mensagem enviada com sucesso!');
      console.log('===================');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  }
}
