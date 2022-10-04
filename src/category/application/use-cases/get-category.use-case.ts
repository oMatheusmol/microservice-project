import CategoryRepository from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dto/category-output';
import { default as DefaultUseCase } from '#seedwork/application/use-case/use-case';
import { Category } from '#category/domain/entities/category';

export namespace GetCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity: Category = await this.repository.findById(input.id);
      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = CategoryOutput;
}

export default GetCategoryUseCase;
