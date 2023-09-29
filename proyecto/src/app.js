import express from 'express';
import { engine } from 'express-handlebars';
import { __dirname } from "./utils.js";
import path from "path";
import { Server } from 'socket.io'; 
import { viewsRouter } from './routes/views.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { chatService } from './dao/index.js';
import { connectDB } from './config/dbConnection.js';

const app = express();
const port = process.env.PORT || 8080;

//servidor de express con el protocolo http
const httpServer = app.listen(port,()=> console.log(`Servidor Express escuchando en el puerto ${port}`));

//configuracion del motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// Midelware para los archivos js y css
app.use(express.static(path.join(__dirname,"/public")));

// Conexion bade de datos 
connectDB();

//Rutas para las Vistas
app.use(viewsRouter);

// Rutas de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Creo el servidor HTTP y WebSocket
const socketServer = new Server(httpServer);

// Configuración de WebSocket
socketServer.on('connection', async (socket) => {
    console.log("Cliente Conectado:", socket.id)
    const products = await chatService.getMessages();
    socket.emit("productsArray", products);

//recibir el producto del socket del cliente
socket.on("addProduct",async(productData)=>{
    const result = await chatService.addMessage(productData);
    const products = await chatService.getMessages();
    socket.emit("productsArray", products);
});

});