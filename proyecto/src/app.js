import express from 'express';
import { ProductManager } from './ProductManager.js'; 

const app = express();
const port = 8080; 


const productManager = new ProductManager("./productos.json"); 



// Ruta para la pagina principal
    app.get('/', (req, res) => {
        res.send('¡Hola, Bienvenidos a mi Pagina!');
    });
// Ruta para obtener los productos 
app.get('/products', async (req, res) => {
    try {
        await productManager.loadProductsFromFile();
        const productos = await productManager.getProducts();
        const { limit } = req.query;
// Limite opcional para mostrar cierta cantidad de productos 
        if (limit) {
        const limitedProductos = productos.slice(0, parseInt(limit));
        res.json(limitedProductos);
        } else {
        res.json(productos);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
    });

    // Ruta para obtener un producto por su ID (pid)
    app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.loadProductsFromFile();
        const producto = await productManager.getProductById(parseInt(pid));
        
        if (!producto) {
        res.status(404).json({ error: 'Producto no encontrado' });
        } else {
        res.json(producto);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
    });

    app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
    });
