import $unAuthApi from "../config/unAuthApi";
import Paginate from "../helper/paginate";
import Api from "./api";

export interface CategoryItem {
  id?: number;
  name: string;
  description?: string;
  img: string;
  products?: ProductItem[];
}

export interface CategoryPag extends Paginate {
  results: CategoryItem[];
}

export interface ProductItem {
  id?: number;
  title: string;
  description?: string;
  img: string;
  file?: string;
  category: number;
}

class Category extends Api {
  async GetCategories(): Promise<CategoryPag> {
    const response = await $unAuthApi.get("/category");
    this.LogResponse("Category", response);
    return response.data;
  }

  /**
   * Get one category which includes products
   * @param id
   * @returns With Products
   */
  async CategoryByID(id: number | string): Promise<CategoryItem> {
    const response = await $unAuthApi.get(`/category/${id}`);
    this.LogResponse("CategoryById", response);
    return response.data;
  }

  parseCategory(data: CategoryPag) {
    return super.parseData(data, "description");
  }

  getParseOneCategory(data: CategoryItem) {
    return super.oneParseData(data, "description");
  }
}

class Product extends Category {
  async ProductById(id: number | string): Promise<ProductItem> {
    const response = await $unAuthApi.get(`/product/${id}`);
    this.LogResponse("ProductById", response);
    return response.data;
  }

  parseProduct(data: ProductItem) {
    return super.oneParseData(data, "description");
  }
}

export default new Product();
