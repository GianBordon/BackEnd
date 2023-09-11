import { Router } from 'express';
import { cartsService } from '../persistence/index.js';

const router = Router();

// Middleware de validación de ID de carrito
function validateCartId(req, res, next) {
    const cartId = parseInt(req.params.cid);
    if (typeof cartId !== 'string' && isNaN(cartId)) {
        return res.status(400).json({ error: 'ID de carrito no válido' });
    }
    next();
}

// Middleware de validación de ID de producto
function validateProductId(req, res, next) {
    const productId = parseInt(req.params.pid);
    if (typeof productId !== 'string' && isNaN(productId)) {
        return res.status(400).json({ error: 'ID de producto no válido' });
    }
    next();
}

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
router.get('/:cid', validateCartId, async (req, res) => {
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
router.post('/:cid/product/:pid', validateCartId, validateProductId, async (req, res) => {
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

