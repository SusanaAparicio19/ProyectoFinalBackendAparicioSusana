import { Router } from "express";
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct} from '../controllers/productsRouter.controller.js';
import { passportAuth } from '../middlewares/passport.js';
import { adminsOnly } from '../middlewares/autorizar.js'

export const productsRouter = Router();

productsRouter.post('/', passportAuth, adminsOnly, addProduct);
productsRouter.get('/', getAllProducts);
productsRouter.get('/:pid', getProductById);
productsRouter.put('/:pid', passportAuth, adminsOnly, updateProduct);
productsRouter.delete('/:pid', passportAuth, adminsOnly, deleteProduct);


