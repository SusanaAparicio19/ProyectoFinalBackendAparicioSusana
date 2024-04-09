import { CartsModel } from '../models/carts.model.js';
import { productDao } from './product.dao.js';

export class CartsDao {
    async createCart(newCartData) {
        try {
            const newCart = await CartsModel.create({ user: newCartData.user });
            return newCart;
        } catch (error) {
            console.error('Error al crear un nuevo carrito en el DAO:', error.message);
            //throw new Error(`Error al crear un nuevo carrito: ${error.message}`);
        }
    };

    async findAllCarts() {
        try {
            const allCarts = await CartsModel.find().populate('products.product').lean();
            return allCarts;
        } catch (error) {
            throw new Error(`Error al obtener los carritos: ${error.message}`);
        }
    }

    async findCartById(cid) {
        try {
            const cartById = await CartsModel.findById(cid).populate('products.product');
            if (!cartById) {
                throw new Error('El carrito buscado no existe');
            }
            return cartById;
        } catch (error) {
            throw new Error(`Error al obtener los carritos: ${error.message}`);
        }
    };
 
    async deleteCartById(cid) {
        try {
            const deleteCart = await CartsModel.findByIdAndDelete(cid, { new: true });
            if (!deleteCart) {
                throw new Error(`El carrito con ID ${cid} no existe`);
            }
            return deleteCart;
        } catch (error) {
            throw new Error(`Error al eliminar el carrito`);
        }
    };

    async addProductToCart(cid, pid) {
        try {
            const product = await productDao.getProductById(pid);
    
            if (!product) {
                throw new Error('Producto no encontrado');
            }
    
            let updatedCart;
    
            const cart = await CartsModel.findById(cid);
    
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
    
            const productIndex = cart.products.findIndex(item => item.product === pid);
    
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
    
            let newTotalAmount = 0;
            for (const item of cart.products) {
                const productPrice = (await productDao.getProductById(item.product)).price;
                newTotalAmount += productPrice * item.quantity;
            }

            cart.totalAmount = newTotalAmount;
            updatedCart = await cart.save();
    
            return updatedCart;
        } catch (error) {
            throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
        }
    }
    
    async updateProductQuantityInCart(cid, pid, newQuantity) {
        try {
            const product = await CartsModel.findByIdAndUpdate(
            cid,
                { $set: { 'products.$[elem].quantity': newQuantity }},
                { arrayFilters: [{ "elem._id": pid }], new: true },
                
            );
            return product;
        } catch (error) {
            throw new Error(`Error al actualizar la cantidad del producto en el carrito: ${error.message}`);
        }
    };

    async deleteProductFromCart(cid, pid) {
        try {
            const deleteProdFromCart = await CartsModel.findByIdAndUpdate(
                cid,
                { $pull: { products: { product: pid } } },
                { new: true }
            );
            if (!deleteProdFromCart) {
                throw new Error(`El producto con ID ${pid} no existe en el carrito ${cid}`);
            }
            return deleteProdFromCart;
        } catch (error) {
            throw new Error(`Error al eliminar el producto del carrito: ${error.message}`);
        }
    }

    async saveCart(cart) {
        try {
        await cart.save();
        } catch (error) {
        throw new Error('Error saving cart');
        }
    }
} 
