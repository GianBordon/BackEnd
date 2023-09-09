import express from 'express';
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';

const app = express();
const port = 8080;

app.use(express.json());

// Ruta para la página principal
app.get('/', (req, res) => {
    res.send('¡Hola, Bienvenidos a mi Página!');
});

// Usamos el router de productos
app.use('/api/products', productsRouter);

// Usamos el router de carritos
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});