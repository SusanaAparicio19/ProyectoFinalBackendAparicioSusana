import { cartService } from "../src/service/carts.service.js";
import { strict as assert } from 'assert';
import { v4 as uuidv4 } from 'uuid';

// Mock de usuario
// cambiar el numero de prueba para que no de error
const mockUser = {
  "_id": uuidv4(), 
  "username": "Prueba2",
  "password": "$2b$10GSXEKhkxId31kX9TbiogruFqX13BlUyM5llYme9Hr.4yg02OAZM1S",
  "email": "Prueba2@mail.com",
  "displayName": "Prueba2",
  "rol": "user"
};

// Mock de los productos
const mockProducts = [
  {
    "_id": "c7b17fc8-91e1-4eb3-ab19-e69ce2b16ba1",
    "category": "Linea Susan",
    "object": "Maceta",
    "title": "Face",
    "description": "Maceta Con Rostros Pintados A Mano",
    "owner": "admin",
    "code": "LS001",
    "stock": 46,
    "status": "available",
    "price": 1000,
    "createdAt": "2024-03-29T18:02:48.374Z",
    "updatedAt": "2024-03-29T18:02:48.374Z"
  },
  {
    "_id": "791dfdc5-94c0-48c8-ac1c-c1d6b76bde5c",
    "category": "Linea Susan",
    "object": "Maceta",
    "title": "Lady",
    "description": "Macetas hecha con forma de cuerpo",
    "owner": "admin",
    "code": "LS002",
    "stock": 52,
    "status": "available",
    "price": 1500,
    "createdAt": "2024-03-29T18:04:04.781Z",
    "updatedAt": "2024-03-29T18:04:04.781Z"
  }
];

describe('Pruebas al modulo de Carts Service', function() {
    it('Debe crear, buscar y eliminar un carrito', async function() {
        // Creo un nuevo carrito con algunos productos
        const products = mockProducts.map(product => ({ product: product._id, quantity: 1 }));
        const cart = await cartService.createCart({ user: mockUser.username, products });
        assert.ok(cart._id);
        
        // Busco el carrito por su ID
        const retrievedCart = await cartService.findCartById(cart._id);
        assert.strictEqual(retrievedCart._id.toString(), cart._id.toString());
        
        // Elimino el carrito por su ID
        await cartService.deleteCartById(cart._id);
                
        // Intento obtener el carrito eliminado nuevamente (ESPERANDO QUE FALLE)
        try {
            await cartService.findCartById(cart._id);
            console.error(`Error: El carrito con ID ${cart._id} todavía existe después de la eliminación.`);
            throw new Error('El carrito no se eliminó correctamente');
        } catch (error) {
            console.log('Carrito eliminado correctamente');
        }
    });
});

