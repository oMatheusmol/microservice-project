import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './category.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorySequelize } from '@core/api/category/infra';

@Module({
  imports: [SequelizeModule.forFeature([CategorySequelize.CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}
