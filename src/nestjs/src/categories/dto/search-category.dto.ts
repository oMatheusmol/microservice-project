import { ListCategoriesUseCase } from '@core/api/category/application';
import { SortDirection } from '@core/api/@seedwork/domain';

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
