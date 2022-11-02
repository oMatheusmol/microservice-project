import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CATEGORY_PROVIDERS } from './category.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorySequelize } from '@core/api/category/infra';
//categoria, entidade 1 e entidade 2
@Module({
  imports: [SequelizeModule.forFeature([CategorySequelize.CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}

// testes no categoriesmodule
// levantar o modulo
// verificar imports,
// verificar controllers
// verificar providers
