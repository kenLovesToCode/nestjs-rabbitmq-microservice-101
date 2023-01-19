import { IsOptional } from 'class-validator';

export class ProductDto {
  @IsOptional()
  title: string;

  @IsOptional()
  image: string;
}
