import { UpdateCategoryUseCase } from '@core/api/category/application';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, 'id'>
{
  @ApiProperty()
  name: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  is_active?: boolean;
}
