import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateEventDto {
  
  @IsUUID()
  @ApiProperty({ required: true })
  transactionId: string;

  @ApiProperty({ required: true })
  time: Date;

  @ApiProperty({ required: true })
  type: string;

  @ApiProperty({ required: true })
  data: object;
}
