import { ListCategoriesUseCase } from '@core/api/category/application';
import { SortDirection } from '@core/api/@seedwork/domain';
import { ApiProperty } from '@nestjs/swagger';

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  @ApiProperty({ required: false })
  page?: number;
  @ApiProperty({ required: false })
  per_page?: number;
  @ApiProperty({ required: false })
  sort?: string;
  @ApiProperty({ required: false })
  sort_dir?: SortDirection;
  @ApiProperty({ required: false })
  filter?: string;
}
