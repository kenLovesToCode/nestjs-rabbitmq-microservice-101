import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductDto } from 'src/dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('list')
  all() {
    return this.productService.all();
  }

  @Post('create')
  async create(@Body() createProductDto: ProductDto) {
    const newProduct = await this.productService.create(createProductDto);
    this.client.emit('product_created', newProduct);
    return newProduct;
  }

  @Get(':id/details')
  async get(@Param('id') id: number) {
    return this.productService.get(id);
  }

  @Put(':id/update')
  async update(@Param('id') id: number, @Body() updateProductDto: ProductDto) {
    const product = await this.productService.update(id, updateProductDto);
    this.client.emit('product_updated', { ...updateProductDto, id });
    return product;
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: number) {
    const product = await this.productService.delete(id);
    this.client.emit('product_deleted', product);
    return product;
  }
}
