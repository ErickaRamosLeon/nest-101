import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class CreateTransactionDto {
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })    
  customId: string;

  @IsDateString()
  @IsNotEmpty()  
  @ApiProperty({ required: true })
  readonly time: Date;
}
