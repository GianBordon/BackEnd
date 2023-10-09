import { productsModel } from "./models/products.model.js";

export class ProductsManagerMongo {
    constructor() {
        this.model = productsModel;
    }

    async createProduct(productData) {
        try {
            const newProduct = await this.model.create(productData);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const products = await this.model.find();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await this.model.findById(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProductById(productId, updatedData) {
        try {
            const updatedProduct = await this.model.findByIdAndUpdate(productId, updatedData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductById(productId) {
        try {
            const deletedProduct = await this.model.findByIdAndDelete(productId);
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }
}
