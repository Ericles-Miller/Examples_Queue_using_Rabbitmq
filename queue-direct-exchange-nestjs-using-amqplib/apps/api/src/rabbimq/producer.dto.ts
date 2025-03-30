import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProducerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
