import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./schemas/schema.products";
import { Model } from "mongoose";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
  }

  async getAllProducts(id: string | null): Promise<Product[]> {
    const filter: any = {};
    if (id) {
      filter.id = { $regex: id };
    }
    return this.productModel.find(filter).exec();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  async createProduct(newProduct: CreateProductDto): Promise<Product> {
    // await this.productModel.insertMany([{newProduct}])
    //   return newProduct
    const createProduct = new this.productModel(newProduct);
    return createProduct.save();
  }

  async removeProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  async updateProduct(id: string, updateProduct: UpdateProductDto) {

    return this.productModel.findByIdAndUpdate( id , updateProduct,{new:false});
  }
}
