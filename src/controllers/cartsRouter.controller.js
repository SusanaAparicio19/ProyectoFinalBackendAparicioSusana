import { cartService } from "../service/carts.service.js";

export const createCart = async (req, res) => {
  try {
        const cartData = req.body; 
        const createdCart = await cartService.createCart(cartData);
        res.status(201).json(createdCart);
      } catch (error) {
        res.status(401).json({ message: error.message });
      }
    };

export const findAllCarts = async (req, res) => {
  try {
        const carts = await cartService.findAllCarts();
        res.json(carts);
        return (carts)
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
    };

export const findCartById = async (req, res) => {
  try {
        const cartById = await cartService.findCartById(req.params.cid);
        res.json(cartById);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };


export const deleteCartById = async (req, res) => {
  try {
    const deleteCart = await cartService.deleteCartById(req.params.cid);
    res.status(201).json({ message: 'Carrito Eliminado', info: deleteCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addProductToCart = async (req, res) => {
  try {
    const product = await cartService.addProductToCart(req.params.cid, req.params.pid);
    res.status(201).json({ message: 'Producto Agregado', info: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductQuantityInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { newQuantity } = req.body;

    console.log('Datos de entrada:', { cid, pid, newQuantity });
    
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ message: 'La nueva cantidad debe ser un número válido y no negativo' });
    }
    
    const updatedProduct = await cartService.updateProductQuantityInCart(cid, pid, quantity);
    res.status(201).json({ message: 'Producto Actualizado en el Carrito', info: updatedProduct });
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
}

export const deleteProductFromCart = async (req, res) => {
  try {
    const deleteProdFromCart = await cartService.deleteProductFromCart(req.params.cid, req.params.pid);
    res.status(201).json({ message: 'Producto Eliminado del carrito', info: deleteProdFromCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const result = await cartService.purchaseCart(cartId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
