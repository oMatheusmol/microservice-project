import { CreateCategoryUseCase } from '@core/api/category/application';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false })
  description?: string;
  @ApiProperty({ required: false })
  is_active?: boolean;
}
