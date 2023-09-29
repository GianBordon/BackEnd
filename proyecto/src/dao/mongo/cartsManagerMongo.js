import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo{
    constructor(){

    }

    // Metodo para obtener los carritos
    async getCarts(){

    }

    // Metodo para crear un carrito 
    async createCart(){

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