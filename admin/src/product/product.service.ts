import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dto/product.dto';
import { Product } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(createProductDto: ProductDto): Promise<Product> {
    return this.productRepository.save(createProductDto);
  }

  async get(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: ProductDto): Promise<any> {
    await this.productRepository.update(id, updateProductDto);
    return { message: `Product ${id} updated successfully` };
  }
  async delete(id: number): Promise<any> {
    return this.productRepository.delete(id);
  }
}
