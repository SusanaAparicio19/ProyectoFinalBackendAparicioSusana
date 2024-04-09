import { ProductsModel } from '../models/products.model.js';

class ProductDao {
    async addProduct(productData) {
        try {
            const newProduct = await ProductsModel.create(productData);
            return newProduct;
        } catch (error) {
            throw new Error(`Error al crear un nuevo producto`);
        }
    }
    
    async getAllProducts() {
        return await ProductsModel.find().lean();
    }

    async getProductById(pid) {
        try {
            const product = await ProductsModel.findOne({ $or: [{ _id: pid }, { '_id.$oid': pid }] });
            if (!product) {
                throw new Error(`No se encontró ningún producto con el ID ${pid}`);
            }
            return product;
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            throw error;
        }
    }

    async updateProduct(pid, updatedProductData) {
        try {
            const existingProduct = await ProductsModel.findOneAndUpdate(
                { _id: pid },
                { $set: updatedProductData },
                { new: true }
            );

            if (!existingProduct) {
                throw new Error(`No se encontró el producto`);
            }

            return existingProduct;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }
    
    async deleteProduct(pid) {
        try {
            return await ProductsModel.findOneAndDelete({ _id: pid });
        } catch (error) {
            throw error;
        }
     } 
    
    async getTotalProducts(query) {
        try {
            let findQuery = {};

            if (query) {
                findQuery = { category: query.category };
            }

            const totalProducts = await ProductsModel.countDocuments(findQuery);
            return totalProducts;
        } catch (error) {
            throw new Error(`Error al obtener el número total de productos: ${error.message}`);
        }
    }
}

export const productDao = new ProductDao()

