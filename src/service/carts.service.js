import { CartsModel } from '../models/carts.model.js';
import { CartsDao } from '../dao/carts.dao.js'
import { cartsRepository } from '../repository/carts.repository.js';
import { productDao } from '../dao/product.dao.js';
import { TicketsModel } from '../models/ticket.model.js';
import { v4 as uuidv4 } from 'uuid';
import { emailService } from './email.service.js'
import { userDao } from '../dao/user.dao.js'

class CartsService {

  async createCart(cartData) {
    try {
      let totalAmount = 0;
      for (const product of cartData.products) {
        const { price } = await productDao.getProductById(product.product);
        totalAmount += price * product.quantity;
      }

      const cartWithTotalAmount = { ...cartData, totalAmount };

      const newCart = await CartsModel.create(cartWithTotalAmount);
  
      return newCart;
    } catch (error) {
      throw new Error(`Error al crear un nuevo carrito: ${error.message}`);
    }
  }
  
  async findAllCarts() {
    try {
        const allCarts = await cartsRepository.findAllCarts();
        return allCarts;
    } catch (error) {
        (error.message)
    }
  }

  async findCartById(cid) {
    const cartById = await cartsRepository.findCartById(cid);
    return cartById;
  }

  async deleteCartById(cid) {
    const deletedCart = await cartsRepository.deleteCartById(cid);
    return deletedCart;
  }

  async addProductToCart(cid, pid) {
      return cartsRepository.addProductToCart(cid, pid);
  }
 
  async updateProductQuantityInCart(cid, pid, newQuantity) {
    try {
      const quantity = parseInt(newQuantity);
      if (isNaN(quantity) || quantity < 0) {
        throw new Error('La nueva cantidad debe ser un número válido y no negativo');
      }

      const cart = await cartsRepository.findCartById(cid);

      cart.products.forEach(item => {
        console.log("Valor de item.product.toString():", item.product.toString());
        console.log("Valor de pid:", pid);
      });

      const productInCart = cart.products.find(item => item._id && item._id.toString() === pid);
      if (!productInCart) {
        return { error: 'El producto no existe en el carrito.' };
      }

      return await cartsRepository.updateProductQuantityInCart(cid, pid, newQuantity);
    } catch (error) {
      return { error: `Error al actualizar carrito: ${error.message}` };
    }
  }

  async deleteProductFromCart(cid, pid) {
      return await cartsRepository.deleteProductFromCart(cid, pid);
  }

  async purchaseCart(cartId) {
      try {
        const cartPurchase = await cartsRepository.findCartById(cartId);
        const failedProductIds = [];
        
        let totalAmount = 0;
        for (const product of cartPurchase.products) {
            const { price } = await productDao.getProductById(product.product);
            totalAmount += price * product.quantity;
        }

        console.log('Total amount:', totalAmount);

                
        const ticket = await this.createTicket(cartPurchase, totalAmount); 

        await this.processProducts(cartPurchase, failedProductIds);

        await this.updateCartAfterPurchase(cartPurchase, failedProductIds);


        const _id = cartPurchase.user;
        const user = await userDao.findOne({ _id });
                  
          if (user && user.email) {
            const email = user.email;

            await this.sendPurchaseConfirmationEmail(email, ticket.code);
          } else {
            console.error("Usuario no encontrado o sin dirección de correo electrónico.");
        }

        return { ticket, failedProductIds };
      } catch (error) {
        throw new Error("Error purchasing cart");
      }
    }

    async createTicket(cart, totalAmount) {
      try {
        const ticketData = {
          code: uuidv4(), 
          purchase_datetime: new Date(),
          totalAmount, 
          purchaser: cart.user,
        };

        const ticket = new TicketsModel(ticketData);

        await ticket.save();
  
        return ticket;
      
      } catch (error) {
        throw new Error('Error al crear el ticket');
      }
    }
  
    async processProducts(cart, failedProductIds) {
      for (const cartProduct of cart.products) {
        const success = await this.updateProductStock(
          cartProduct.product,
          cartProduct.quantity,
          failedProductIds
        );

        if (!success) {
          continue;
        }
      }
    }

  async updateProductStock(pid, quantity, failedProductIds) {
    try {
      const product = await productDao.getProductById(pid);

      if (product.stock >= quantity) {
        product.stock -= quantity;
        await product.save();
        return true;
      } else {
        failedProductIds.push(pid);
        return false;
      }
    } catch (error) {
      throw new Error('Error al actualizar el stock del producto.');
    }
  }

  async updateCartAfterPurchase(cart, failedProductIds) {
    try {
      const failedProducts = cart.products.filter(product =>
        failedProductIds.includes(product._id)
      );

      cart.products = failedProducts;

      const cartsDao = new CartsDao();
      await cartsDao.saveCart(cart);
    } catch (error) {
      throw new Error("Error updating cart after purchase");
    }
  }

  async sendPurchaseConfirmationEmail(userEmail, ticketCode) {
      try {
        await emailService.sendEmail(
          userEmail,
          '¡Agradecemos tu Compra, te esperamos pronto en 46Soles!!!',
          `Tu compra se ha realizado con éxito. Número de ticket: ${ticketCode}`
        );
      } catch (error) {
        throw new Error("Error sending purchase confirmation email");
      }
  }
}  

export const cartService = new CartsService();
