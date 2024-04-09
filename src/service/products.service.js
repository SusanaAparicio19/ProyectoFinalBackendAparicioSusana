import { productRepository } from '../repository/product.repository.js';
import { FakeEmailServicePremium } from '../service/email.service.js';


export class ProductService {
   
    async addProduct(productData) {
        if (!productData.category || !productData.object || !productData.title || !productData.description || !productData.owner || !productData.ownerEmail || !productData.code || !productData.stock || !productData.status || !productData.price) {
            throw new Error('Los datos de los productos son obligatorios.');
        }
        return await productRepository.addProduct(productData);
    }
    
    async getAllProducts({ limit = 10, page = 1, skip = 0,sort, query }) {
        const skipCount = (page - 1) * limit;
        const products = await productRepository.getAllProducts({ limit, skip: skipCount, sort, query });
        const totalProducts = await productRepository.getTotalProducts(query);
        const totalPages = Math.ceil(totalProducts / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}` : null;
        const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}` : null;
    
        return {
            status: "success",
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        };
    }

    async getProductById(pid) {
        const product = await productRepository.getProductById(pid);
        return product;
    }

    async updateProduct(pid, updatedProductData) {
        return await productRepository.updateProduct(pid, updatedProductData);
    }
    

    async deleteProduct(productId, userRole, userEmail) {
        const product = await this.getProductById(productId);
    
        if (!product) {
            throw new Error(`Producto con ID ${productId} no encontrado.`);
        }

        if (userRole === 'admin') {
            await productRepository.deleteProduct(productId);
    
            if (product.owner === 'premium') {
                await this.sendProductDeletionNotification(product.ownerEmail, product.title);
            }
        } else {
            throw new Error('No tienes permiso para eliminar este producto.');
        }
    }
    
    async sendProductDeletionNotification(userEmail, productName) {
        try {
            await FakeEmailServicePremium.sendEmail(userEmail, `Su producto "${productName}" ha sido eliminado.`);
        } catch (error) {
            console.error('Error al enviar el correo electrónico de notificación:', error);
            throw new Error('Error al enviar el correo electrónico de notificación.');
        }
    }
    
}
export const productService = new ProductService();



    
    

