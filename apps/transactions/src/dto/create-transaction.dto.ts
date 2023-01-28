import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';


export class CreateTransactionDto {
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })    
  customId: string;

  @IsDateString()
  @IsNotEmpty()  
  @ApiProperty({ required: true })
  readonly time: Date;

  @IsString()
  @IsNotEmpty()  
  @ApiProperty({ required: true })
  readonly flowId: string;
}
