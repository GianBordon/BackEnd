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

    // Middleware de validación de datos para el endpoint POST
    function validateProductData(req, res, next) {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category ) {
        return res
        .status(400)
        .json({ status: "error", message: "Todos los campos son obligatorios" });
    }

    if (isNaN(price) || isNaN(stock)) {
        return res
        .status(400)
        .json({ status: "error", message: "price y stock deben ser números" });
    }

    // Agregar valor por defecto para 'status'
    req.body.status = true;

    // Verificar si 'thumbnails' es proporcionado, si no, asignar un array vacío
    // req.body.thumbnails = thumbnails || [];
    // if (!thumbnails || !Array.isArray(thumbnails)) {
    //     return res.status(400).json({ error: 'Thumbnails debe ser un arreglo' });
    // }
    next();
    }

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

        // Verificar si el producto existe antes de intentar actualizarlo
        const existingProduct = await productsService.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        // Actualizar el producto
        await productsService.updateProduct(productId, updatedData);
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


