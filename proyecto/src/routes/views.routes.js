import { Router } from "express";
import { ProductsManagerMongo } from "../dao/mongo/productsManagerMongo.js";

const router = Router();


const productsManagerMongo = new ProductsManagerMongo();

router.get("/", async (req, res) => {
    try {
        const products = await productsManagerMongo.getAllProducts();
        const style = "home.css";
        res.render("home", { products, style });
    } catch (error) {
        console.error("Error al recuperar los productos:", error);
        res.status(500).send("Error al recuperar los productos.");
    }
});

router.get("/chat", (req,res)=>{
    const style = "chat.css";
    res.render("chat", {style});
});

export {router as viewsRouter}