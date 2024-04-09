import { CartsDao } from '../dao/carts.dao.js';

class CartsRepository {
    constructor() {
        this.cartsDao = new CartsDao();
    }

    async createCart(cartData) {
        try {
          const createdCart = await this.cartsDao.createCart(cartData);
          return createdCart;
        } catch (error) {
          console.error('Error al crear un nuevo carrito en el repositorio:', error.message);
          //throw new Error(`Error al crear un nuevo carrito: ${error.message}`);
        }
      }

    async findAllCarts() {
        try {
            const allCarts = await this.cartsDao.findAllCarts();
            return allCarts;
        } catch (error) {
            (error.message);
        }
    }
  
    async findCartById(cid) {
        return this.cartsDao.findCartById(cid);
    }
    
    async deleteCartById(cid) {
        return this.cartsDao.deleteCartById(cid);
    }
 
    async addProductToCart(cid, pid) {
        return this.cartsDao.addProductToCart(cid, pid);
    }
 
    async updateProductQuantityInCart(cid, pid, newQuantity) {
        return this.cartsDao.updateProductQuantityInCart(cid, pid, newQuantity);
    }
    
    async deleteProductFromCart(cid, pid) {
        return this.cartsDao.deleteProductFromCart(cid, pid);
    }
}

export const cartsRepository = new CartsRepository()
   
