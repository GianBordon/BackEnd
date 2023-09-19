import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    const products = await productsService.getProducts();
    const style = "home.css";
    res.render("home",{products:products, style});
});

router.get("/realtimeproducts", (req,res)=>{
    const style = "realTimeProducts.css";
    res.render("realTimeProducts", {style});
});

export {router as viewsRouter}