import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@core/api/category/application';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from './presenter/category.presenter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  private updateUseCase: UpdateCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteUseCase: DeleteCategoryUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  private getUseCase: GetCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase;

  @Post()
  @ApiResponse({ type: CategoryPresenter })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const output = await this.createUseCase.execute(createCategoryDto);
      return new CategoryPresenter(output);
    } catch (e) {
      return e;
    }
  }

  @Get()
  @ApiResponse({ type: CategoryCollectionPresenter })
  async search(@Query() searchParams: SearchCategoryDto) {
    try {
      const output = await this.listUseCase.execute(searchParams);
      return new CategoryCollectionPresenter(output);
    } catch (e) {
      return e;
    }
  }

  @Get(':id')
  @ApiResponse({ type: CategoryPresenter })
  async findOne(@Param('id') id: string) {
    try {
      const output = await this.getUseCase.execute({ id });
      return new CategoryPresenter(output);
    } catch (e) {
      return e;
    }
  }

  @Put(':id')
  @ApiResponse({ type: CategoryPresenter })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const output = await this.updateUseCase.execute({
        id,
        ...updateCategoryDto,
      });
      return new CategoryPresenter(output);
    } catch (e) {
      return e;
    }
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    try {
      return this.deleteUseCase.execute({ id });
    } catch (e) {
      return e;
    }
  }
}
