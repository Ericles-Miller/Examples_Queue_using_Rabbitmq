import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [ProducerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
