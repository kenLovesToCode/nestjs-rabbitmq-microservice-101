import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('list')
  async all() {
    return this.productService.all();
  }

  @EventPattern('product_created')
  async create(product: any) {
    return this.productService.create(product);
  }

  @EventPattern('product_updated')
  async updateProduct(payload: any) {
    await this.productService.updateProduct(payload);
  }

  @EventPattern('product_deleted')
  async deleteProduct(data: any) {}
}
