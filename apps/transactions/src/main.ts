import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransactionsModule } from './transactions.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsModule);
  const config = new DocumentBuilder()
  .setTitle('Transactions App')
  .setDescription('Transactions service App')
  .setVersion('1.0')
  .addTag('transactions')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe(
      {
      whitelist: true,
      forbidNonWhitelisted: true, 
      }
    )
  );
  
  await app.listen(3000);
}
bootstrap();
