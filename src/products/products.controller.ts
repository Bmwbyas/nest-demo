import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";
import { Product } from "./schemas/schema.products";

@Controller("products")
export class ProductsController {
constructor(private readonly productsService:ProductsService) {
}
  //   express example
  //   app.use((res,req,next)=>{
//     res.staus(201).end('poka')
// })
//   @Get()
//   // @Redirect('https://google.com',301)
//   getProducts(@Req() req:Request, @Res() res:Response): string {
//     return "getProducts";
//   }

  @Get(':id')

  // @Redirect('https://google.com',301)
  getProducts(@Query('id') id?: string): Promise<Product[]> {
    return this.productsService.getAllProducts(id);
  }

  @Get(":id")
  getProductById(@Param("id") id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()

  @HttpCode(HttpStatus.CREATED)
  // @Header("Cache-Control", "none")
  createProducts(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Delete(":id")
  remove(@Param('id') id:string):Promise<Product> {
      return this.productsService.removeProduct(id)
  }

  @Put(':id')
  update(@Body() updateProductDto:UpdateProductDto,
         @Param('id') id:string):Promise<Product> {
return this.productsService.updateProduct(id,updateProductDto)
  }

}
