import fs from "fs";

export class CartsManagerFiles {
    constructor(path) {
        this.pathFile = path;
    }

    fileExists() {
        return fs.existsSync(this.pathFile);
    }

    async getCarts() {
        try {
            if (this.fileExists()) {
                const contenidoString = await fs.promises.readFile(this.pathFile, "utf-8");
                const carts = JSON.parse(contenidoString);
                return carts;
            } else {
                throw new Error("No se pudieron obtener los carritos");
            }
        } catch (error) {
            throw error;
        }
    }

    async createCart() {
        try {
            if (this.fileExists()) {
                const contenidoString = await fs.promises.readFile(this.pathFile, "utf-8");
                const carts = JSON.parse(contenidoString);
                const newCart = {
                    id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
                    products: [],
                };
                carts.push(newCart);
                await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, '\t'));
                return newCart;
            } else {
                throw new Error("No se pudieron obtener los carritos");
            }
        } catch (error) {
            throw error;
        }
    }

    async addProduct(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find((c) => c.id === cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            cart.products.push(productId);

            await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, '\t'));
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const carts = await this.getCarts();
    
            const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    
            if (cartIndex !== -1) {
                const cart = carts[cartIndex];
                const productIndex = cart.products.findIndex((product) => product.product === productId);
    
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity += quantity;
                } else {
                    cart.products.push({ product: productId, quantity });
                }
            } else {
                const newCart = {
                    products: [{ product: productId, quantity }],
                };
                carts.push(newCart);
            }
    
            await this.saveCarts(carts);
    
            return carts.find((cart) => cart.id === cartId);
        } catch (error) {
            throw error;
        }
    }
    
}
