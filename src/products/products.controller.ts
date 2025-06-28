import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  private readonly categories = ['cat1', 'cat2', 'cat3'];

  constructor(private readonly productsService: ProductsService) {}

  @Get('categories')
  getCategories(): string[] {
    return this.categories;
  }

   @Get('category/:id')
  @Header('Content-Type', 'text/plain')
  getCategoryById(@Param('id') id: string): string {
    const categoryId = +id - 1;
    return `Category with id: ${this.categories[categoryId]}`;
  }

  @Post('add')
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { id: string } {
    const prodId = this.productsService.insertProduct(
      title,
      description,
      price,
    );
    return { id: prodId };
  }

  @Get('get-all')
  getProducts(): Product[] {
    return this.productsService.getProducts();
  }

   @Get(':id')
  @Header('Content-Type', 'text/plain')
  getProductById(@Param('id') id: string): Product {
    return this.productsService.getProductById(id);
  }
 
}

export default ProductsController;
