import { ProductsManagerFiles } from "./files/productsManagerFiles.js";
import { CartsManagerFiles } from "./files/cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";

export const ProductsService = new ProductsManagerFiles(path.join(__dirname,"/files/products.json"));
export const CartsService = new CartsManagerFiles(path.join(__dirname,"/files/carts.json"));

