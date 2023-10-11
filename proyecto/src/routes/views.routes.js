import { Router } from "express";
import { productsService } from "../dao/index.js"
import { cartsService } from "../dao/index.js";

const router = Router();


// Ruta para mostrar la lista de productos
router.get('/', async (req, res) => {
    try {
        const products = await productsService.getProducts();
        const style = "home.css";
        res.render("home", { products, style });
    } catch (error) {
        console.error("Error al recuperar los productos:", error);
        res.status(500).send("Error al recuperar los productos.");
    }
});

// Ruta para mostrar la lista de productos
router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = '', query = {} } = req.query;

        // Validar y convertir los valores de limit y page a números enteros
        const limitInt = parseInt(limit);
        const pageInt = parseInt(page);

        const result = await productsService.getProductsPaginate({
            page: pageInt,
            limit: limitInt,
            sort: sort,
            query: query,
        });

        const dataProducts = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
        };

        res.render("products", dataProducts);
    } catch (error) {
        console.error("Error al recuperar los productos:", error);
        res.status(500).send("Error al recuperar los productos.");
    }
});


    // Ruta para ver detalles de un producto
    router.get('/products/:productId', async (req, res) => {
        try {
        const productId = req.params.productId; 
        const product = await productsService.getProductById(productId);
        const style = "productsDetail.css"
        res.render('productsDetail', { product, style }); 
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        res.status(500).json({ status: 'error', message: 'Error al obtener los detalles del producto.' });
    }
    });

    // Ruta para visualizar un carrito específico
    router.get('/carrito/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        const style = "carrito.css"
        res.render('carrito', { cart, style });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send('Error al obtener el carrito.');
    }
});

export {router as viewsRouter}