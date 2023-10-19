import express from 'express';
import { engine } from 'express-handlebars';
import session from "express-session";
import MongoStore from "connect-mongo";
import { __dirname } from "./utils.js";
import path from "path";
import { Server } from 'socket.io'; 
import { viewsRouter } from './routes/views.routes.js';
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { connectDB } from './config/dbConnection.js';
import cookieParser from "cookie-parser"
import { sessionsRouter } from "./routes/sessions.routes.js";


const app = express();
const port = process.env.PORT || 8080;


//servidor de express con el protocolo http
const httpServer = app.listen(port, () => console.log(`Servidor Express escuchando en el puerto ${port}`));

//configuracion del motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

// Midelware para los archivos js y css
app.use(express.static(path.join(__dirname, "/public")));

// Midelware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// Conexion base de datos 
connectDB();

//Rutas para las Vistas
app.use(viewsRouter);

// Rutas de productos y carritos
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use("/api/sessions", sessionsRouter);

// Configurar WebSocket
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('Cliente Conectado:', socket.id);
});

//configuración de session
app.use(session({
    store: MongoStore.create({
        ttl: 3000,
        mongoUrl: "mongodb+srv://shiammdp21:742404@ecomerce.ovxhziv.mongodb.net/ecomerceDB?retryWrites=true&w=majority"
    }),
    secret: "secretSessionCoder",
    resave: true,
    saveUninitialized: true
}));
console.log('Sesiones configuradas correctamente');