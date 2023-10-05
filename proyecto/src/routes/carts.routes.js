import { Router } from 'express';
import { cartsService } from '../dao/index.js';

const router = Router();

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartsService.createCart();
        res.status(201).json({ message: 'Nuevo carrito creado', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});


// Ruta para obtener los productos de un carrito
router.get('/:cid',  async (req, res) => {
    const cartId = parseInt(req.params.cid);
    try {
        const cart = await cartsService.getCartById(cartId);
        res.json({ message: 'Productos del carrito', cart });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Ruta para obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await cartsService.getAllCarts();
        res.json({ message: 'Lista de carritos', carts });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los carritos' });
    }
});


// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);

    try {
        const updatedCart = await cartsService.addProductToCart(cartId, productId, quantity);
        res.json({ message: 'Producto agregado al carrito con éxito', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

export { router as cartsRouter };

