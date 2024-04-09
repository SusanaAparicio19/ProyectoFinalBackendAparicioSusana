import { productDao } from '../dao/product.dao.js';
import { ProductsModel } from '../models/products.model.js';

class ProductRepository {
        
    async addProduct(productData) {
        return await productDao.addProduct(productData);
    }

    async getAllProducts({ limit = 10, skip = 0, sort, query }) {
        let findQuery = {};
    
        if (query) {
            findQuery = { category: query };
        }
    
        const options = {};
        
        const sortQuery = sort ? { price: sort === 'asc' ? 1 : -1 } : {};
    
        return await ProductsModel.find(findQuery)
                                   .sort(sort)
                                   .skip(skip)
                                   .limit(limit)
                                   .lean();
    }

    async getProductById(pid) {
        return await productDao.getProductById(pid);
    }

    async updateProduct(pid, updatedProductData) {
        return await productDao.updateProduct(pid, updatedProductData);
    }
    
    async deleteProduct(pid) {
        return await productDao.deleteProduct(pid);
    }

    async getTotalProducts(query) {
        let findQuery = {};
    
        if (query) {
            findQuery = { category: query };
        }
    
        return await ProductsModel.countDocuments(findQuery);
    }

}

export const productRepository = new ProductRepository()
