import { ProductService } from '../service/products.service.js';
import errorHandlers from '../middlewares/errorHandler.js';

const productService = new ProductService();

export async function addProduct(req, res) {
    const { category, object, title, description, owner, ownerEmail, code, stock, status, price } = req.body;
    try {
        const newProduct = await productService.addProduct({
            category,
            object,
            title,
            description,
            owner,
            ownerEmail,
            code,
            stock,
            status,
            price,
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        errorHandlers.error(res, 500, 'Internal Server Error');
    }
}

export async function getAllProducts(req, res) {
    try {
        const { limit, skip, sort, query } = req.query; 
        const products = await productService.getAllProducts({ limit, skip, sort, query });
        res.json(products);
    } catch (error) {
        console.log(error);
        errorHandlers.error(res, 500, 'Internal Server Error');
    }
}

export async function getProductById(req, res) {
    const pid = req.params.pid;
    try {
        const product = await productService.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send(`Producto con ID ${pid} no encontrado.`);
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        errorHandlers.error(res, 500, 'Internal Server Error');
    }
}

export async function updateProduct(req, res, next) {
    const pid = req.params.pid;
    const updatedProductData = req.body; 
    try {
        const updatedProduct = await productService.updateProduct(pid, updatedProductData);
        res.json(updatedProduct);
    } catch (error) {
        errorHandlers.error(res, 500, 'Internal Server Error');
    }
}

export async function deleteProduct(req, res) {
    const productId = req.params.pid;
    const userRole = req.user.rol;
    const userEmail = req.user.email;

    try {
        await productService.deleteProduct(productId, userRole, userEmail);
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        errorHandlers.error(res, 500, 'Internal Server Error');
    }
}

