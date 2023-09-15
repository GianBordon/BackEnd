import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router();

// Ruta para el Home
router.get("/", async (req, res) => {
    try {
        const products = await productsService.getProducts();
        res.render("home", { style: "home.css", products }); 
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts',{style: "realTimeProducts.css"});
});

export {router as viewsRouter};