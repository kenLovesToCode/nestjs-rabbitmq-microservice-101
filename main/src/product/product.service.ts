import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/model/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(data: any): Promise<Product> {
    return new this.productModel(data).save();
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id });
  }

  async updateProduct(payload: any): Promise<any> {
    const { id, ...data } = payload;
    return this.productModel.findOneAndUpdate({ id: Number(id) }, data);
  }

  async deleteProduct(id: number): Promise<any> {
    return this.productModel.deleteOne({ id });
  }
}
