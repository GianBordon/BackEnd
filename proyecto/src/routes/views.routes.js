import { Router } from "express";
import { productsService } from "../dao/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    const products = await productsService.getProducts();
    const style = "home.css";
    res.render("home",{products:products, style});
});

router.get("/chat", (req,res)=>{
    const style = "chat.css";
    res.render("chat", {style});
});

export {router as viewsRouter}