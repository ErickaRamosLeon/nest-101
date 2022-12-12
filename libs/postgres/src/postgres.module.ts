import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from '../config/env.config';
import { PostgresService } from './postgres.service';

@Module({
  imports: [
    ConfigModule.forRoot(
    { load: [ EnvConfiguration] }
    ),
    
  ],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule {}
