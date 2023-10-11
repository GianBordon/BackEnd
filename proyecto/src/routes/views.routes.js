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
        const { limit = 10, page = 1,sort = 'asc', category, stock} = req.query;
        const query = {};
        const sortOptions = {};

        if (category) {
            query.category = category;
        }
        if (stock) {
            query.stock = stock;
        }

        if (sort === 'asc') {
            sortOptions.price = 1; // Orden ascendente por precio
        } else if (sort === 'desc') {
            sortOptions.price = -1; // Orden descendente por precio
        } else {
            // Si el valor de `sort` no es válido, puedes establecer un valor predeterminado.
            sortOptions.price = 1;
        }

        const options = { limit,page,sort: sortOptions,lean: true};
        const result = await productsService.getProductsPaginate(query,options);
        const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
        const dataProducts = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
            nextLink: result.hasNextPage ? baseUrl.includes("page") ?
            baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null
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