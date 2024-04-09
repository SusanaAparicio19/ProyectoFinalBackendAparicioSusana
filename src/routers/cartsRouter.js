import { Router } from 'express';
import { createCart , findAllCarts,  findCartById, deleteCartById, addProductToCart, updateProductQuantityInCart, deleteProductFromCart, purchaseCart } from '../controllers/cartsRouter.controller.js';
import { passportAuth } from '../middlewares/passport.js';
import { usersOnly } from '../middlewares/autorizar.js';

const cartsRouter = Router();

cartsRouter.post('/', createCart);
cartsRouter.get('/', findAllCarts);
cartsRouter.get('/:cid', findCartById);
cartsRouter.delete('/:cid', deleteCartById);
cartsRouter.put('/:cid/add/:pid', passportAuth, usersOnly, addProductToCart);
cartsRouter.put('/:cid/product/:pid', updateProductQuantityInCart);
cartsRouter.delete('/:cid/product/:pid', deleteProductFromCart);
cartsRouter.post('/:cid/purchase', purchaseCart);

export default cartsRouter;

