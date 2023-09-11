import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router();

    // Middleware para limitar la respuesta a cierta cantidad de productos
    function limitProducts(req, res, next) {
    const { limit } = req.query;

    if (limit) {
        const limitNum = parseInt(limit);
        if (!isNaN(limitNum)) {
        req.limit = limitNum;
        }
    }

    next();
    }

    // Middleware de validación de datos para crear un producto
    export const validateProductData = (req, res, next) => {
        const {
            title,
            description,
            code,
            price,
            category,
            thumbnails,
        } = req.body;

        if (!title || !description || !code || !price || !category ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (isNaN(price)) {
            return res.status(400).json({ error: 'El campo "price" debe ser un número' });
        }

        req.body.thumbnails = thumbnails || [];

        next();
    };


    // Ruta raíz GET para listar todos los productos (con limitación opcional)
    router.get("/", limitProducts, async (req, res) => {
    try {
        const products = await productsService.getProducts();
        const limitedProducts = req.limit
        ? products.slice(0, req.limit)
        : products;
        res.json({ status: "success", data: limitedProducts });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
    });

    // Ruta POST para agregar un nuevo producto
    router.post("/", validateProductData, async (req, res) => {
    try {
        const productInfo = req.body;
        await productsService.createProduct(productInfo);
        res.status(201).json({ status: "success", message: "Producto agregado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
    });

    // Ruta GET para obtener un producto por ID
    router.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductById(productId);

        if (!product) {
        res.status(404).json({ status: "error", message: "Producto no encontrado" });
        } else {
        res.json({ status: "success", data: product });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
    });

// Ruta PUT para actualizar un producto por su ID
router.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedData = req.body;

        // Verificar si se intenta actualizar el ID
        if ("id" in updatedData) {
            return res.status(400).json({ status: "error", message: "No se puede actualizar el ID del producto" });
        }
        
        // Verificar si el producto existe antes de intentar actualizarlo
        const existingProduct = await productsService.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        const updatedProduct = {
            ...existingProduct, 
            ...updatedData,     
            id: productId      
        };

        await productsService.updateProduct(updatedProduct);

        res.json({ status: "success", message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

    // Ruta DELETE para eliminar un producto por su ID
    router.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productsService.deleteProduct(productId);
        res.json({ status: "success", message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
    });

export { router as productsRouter };


