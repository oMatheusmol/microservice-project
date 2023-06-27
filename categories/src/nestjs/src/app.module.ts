import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ShareModule } from './@share/@share.module';
import { DocsModule } from './docs/docs.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CategoriesModule,
    DocsModule,
    DatabaseModule,
    ShareModule,
    PrometheusModule.register({
      path: '/metrics',
    }),
  ],
})
export class AppModule {}
