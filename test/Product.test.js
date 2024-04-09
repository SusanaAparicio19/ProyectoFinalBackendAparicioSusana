import mongoose from "mongoose";
import { productService } from "../src/service/products.service.js";
import { strict as assert } from 'assert';

mongoose.connect('mongodb+srv://msusanainfo:Susana1831@46soles.tn88qqs.mongodb.net/ecommerse');

describe('Pruebas al modulo de productos service', function() {
    before(async function() {
        console.log('Pruebas Productos');
    });

    beforeEach(async function() {
         // Prefiero no borrar la base de datos antes de cada prueba
         // mongoose.connection.collections.products.drop();
    });

    after('[after]', function() {
        console.log('Despues de todas las pruebas');
    });
    
    afterEach('[afterEach]',function(){
        console.log('Despues de cada prueba');
    });

    it('Debe crear, actualizar y borrar un producto', async function() {
        // Creo un nuevo producto
        let result = await productService.addProduct({
            category: "Linea X",
            object: "Candelabro",
            title: "Luces",
            description: "Nada en especial",
            owner: "premium",
            ownerEmail: "Gina@mail.com", 
            code: "XX001",
            stock: 10,
            status: "available",
            price: 11111
        });
        assert.ok(result._id);
        assert.strictEqual(result.object, 'Candelabro');

        // Actualizo el producto creado
        const updateData = {
            stock: 20
        };
        await productService.updateProduct(result._id, updateData);

        // Obtengo el producto actualizado y verifico los cambios
        const updatedProduct = await productService.getProductById(result._id);
        assert.strictEqual(updatedProduct.object, 'Candelabro');
        assert.strictEqual(updatedProduct.stock, 20);

        // Verifico si el producto con ese ID existe antes de eliminarlo
        const existingProduct = await productService.getProductById(result._id);
        if (existingProduct) {
            // Elimino el producto como administrador
            await productService.deleteProduct(result._id, 'admin', 'admin@example.com');

            // Intento obtener el producto eliminado nuevamente (ESPERANDO QUE FALLE)
            try {
                const deletedProduct = await productService.getProductById(result._id);
                console.error(`Error: El producto con ID ${result._id} todavía existe después de la eliminación.`);
                throw new Error('El producto no se eliminó correctamente');
            } catch (error) {
                console.log('Producto eliminado correctamente');
            }
        } else {
            console.log('El producto no existe después de la actualización');
        }
    });

});


