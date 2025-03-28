import { Module } from '@nestjs/common';
import { RabbiMqModule } from './rabbimq/rabbimq.module';

@Module({
  imports: [RabbiMqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
