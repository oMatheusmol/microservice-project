import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Swagger } from './config/swagger';

export const PORT = 3000;

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  Swagger.setup(app);
  await app.listen(PORT);
}
bootstrap();
