import { INestApplication } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject, DocumentBuilder } from '@nestjs/swagger';
import { CategoriesModule } from 'src/categories/categories.module';

export class Swagger {
  static setup(app: INestApplication): void {
    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle('Typescript API')
      .setDescription('🚀🚀')
      .setVersion('1.0')
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config, {
      include: [CategoriesModule],
    });
    SwaggerModule.setup('api', app, document);
  }
}
