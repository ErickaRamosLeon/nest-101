import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ required: true })
  customId: string;

  @ApiProperty({ required: true })
  time: Date;
}
