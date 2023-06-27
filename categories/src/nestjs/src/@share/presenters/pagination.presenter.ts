import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type PaginationPresenterProps = {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
};

export class PaginationPresenter {
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  current_page: number;
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  per_page: number;
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  last_page: number;
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  total: number;

  constructor(props: PaginationPresenterProps) {
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = props.last_page;
    this.total = props.total;
  }
}
