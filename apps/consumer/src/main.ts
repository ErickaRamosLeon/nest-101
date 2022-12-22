import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  const config = new DocumentBuilder()
  .setTitle('Consumer apps')
  .setDescription('Consumer apps')
  .setVersion('1.0')
  .addTag('consumer')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  await app.listen(3004);
}
bootstrap();
