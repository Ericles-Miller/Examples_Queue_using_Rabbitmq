import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMqProcessService {
  async consumerQueue(message: string): Promise<void> {
    console.log('=== RabbitMqProcessService ===');
    console.log('Iniciando processamento da mensagem:', message);
    console.log('Timestamp:', new Date().toISOString());

    try {
      // Simula um processamento assíncrono
      await this.simulateProcessing();

      console.log('Processamento concluído com sucesso');
      console.log('=============================');
    } catch (error) {
      console.error('Erro durante o processamento:', error);
      console.log('=============================');
      throw error; // Propaga o erro para o controller
    }
  }

  private async simulateProcessing(): Promise<void> {
    // Simula um processamento que leva entre 1 e 3 segundos
    const processingTime = Math.random() * 2000 + 1000;
    await new Promise((resolve) => setTimeout(resolve, processingTime));

    // Simula um erro aleatório (10% de chance)
    if (Math.random() < 0.1) {
      throw new Error('Erro simulado durante o processamento');
    }
  }
}
