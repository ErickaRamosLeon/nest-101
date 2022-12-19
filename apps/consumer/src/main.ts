import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProducerModule } from './producer.module';

async function bootstrap() {
  const app = await NestFactory.create(ProducerModule);
  const config = new DocumentBuilder()
  .setTitle('Events producer')
  .setDescription('Events producer App')
  .setVersion('1.0')
  .addTag('consumer')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  await app.listen(3001);
}
bootstrap();
