import { ProductsManagerFiles } from "./file/productsManagerFiles.js";
import { CartsManagerFiles } from "./file/cartsMemoryFiles.js";
import { __dirname } from "../utils.js";
import path from "path";

export const productsService = new ProductsManagerFiles(path.join(__dirname,"/files/productos.json"));
export const cartsService = new CartsManagerFiles(path.join(__dirname,"/files/carts.json"));
