import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo{
    constructor(){
        this.model = cartsModel
    }

    // Metodo para obtener los carritos
    async getCarts(){
        try {
            const result = await this.model.find();
            return result
        } catch (error) {
            console.log("getCarts",error.message);
            throw new Error("No se pudieron obtener los carritos");
        }
    }

    // Metodo para crear un carrito 
    async createCart(){
        try {
            const result = await this.model.find();
            return result
        } catch (error) {
            console.log("createCart",error.message);
            throw new Error("No se pudo crear el carrito");
        }
    }

    // Metodo para obtener todos los carritos existentes
    async getAllCarts(){

    }

    // Metodo para agregar un producto a un carrito 
    async addProduct(cartId, productId){

    }

    // Metodo para agregar la cantidad y que se sume por la cantidad que le estoy pidiendo 
    async addProductToCart(cartId, productId, quantity = 1){

    }

    // Metodo para obtener carritos por su ID
    async getCartById(cartId){
        
    }
}