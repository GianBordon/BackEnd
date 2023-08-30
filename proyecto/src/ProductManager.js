    import { promises as fs } from 'fs';

    class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async loadProductsFromFile() {
        try {
        const contenido = await fs.readFile(this.path, "utf8");
        this.products = JSON.parse(contenido);
        } catch (error) {
        console.error("Error al cargar productos desde el archivo:", error);
        this.products = [];
        }
    }

    async saveProductsToFile() {
        const contenido = JSON.stringify(this.products, null, 2);
        try {
        await fs.writeFile(this.path, contenido, "utf8");
        } catch (error) {
        console.error("Error al guardar productos en el archivo:", error);
        }
    }

    async addProduct(productData) {
        await this.loadProductsFromFile();

        const codeExists = this.products.some((product) => product.code === productData.code);

        if (codeExists) {
        console.log("No se permiten repetir productos con el mismo código");
        return;
        }

        const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;

        const newProduct = {
        id,
        ...productData,
        };

        this.products.push(newProduct);

        await this.saveProductsToFile();
        console.log("El producto fue agregado correctamente");
    }

    async getProducts() {
        await this.loadProductsFromFile();
        return this.products;
    }

    async getProductById(id) {
        await this.loadProductsFromFile();
        const product = this.products.find((product) => product.id === id);
        if (!product) {
        console.log("Not Found");
        return undefined;
        }
        return product;
    }

    async updateProductById(productId, updatedData) {
        await this.loadProductsFromFile();
        const productIndex = this.products.findIndex((product) => product.id === productId);

        if (productIndex === -1) {
        console.log("Producto no encontrado");
        return;
        }

        this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedData,
        };

        await this.saveProductsToFile();
        console.log("El producto fue actualizado correctamente");
    }

    async deleteProductById(productId) {
        await this.loadProductsFromFile();
        const productIndex = this.products.findIndex((product) => product.id === productId);

        if (productIndex === -1) {
        console.log("Producto no encontrado");
        return;
        }

        this.products.splice(productIndex, 1);


        await this.saveProductsToFile();
        console.log("El producto fue eliminado correctamente");
    }
    }

    export {ProductManager};

    //Crear una instancia de ProductManager con la ruta al archivo products.json
    const manager = new ProductManager("./productos.json");

    async function testProductManager() {
    // Cargar productos desde el archivo antes de realizar cualquier operación
    await manager.loadProductsFromFile();

    // Agrego 10 productos
    await manager.addProduct({
        title: 'Remera azul',
        description: 'Remera Azul',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'RAH',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Remera Violeta',
        description: 'Remera Violeta',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'RVH',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Remera roja',
        description: 'Remera roja',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'RRH',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Pantalon Jean',
        description: 'Pantalon de Jean',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'PEJ',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Pantalon Cargo',
        description: 'Pantalon estilo Cargo',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'PEC',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Pantalon Corderoi',
        description: 'Pantalon de Corderoi',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'PEO',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Remera Fucsia',
        description: 'Remera Fucsia',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'RAF',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Bermuda Cargo',
        description: 'Bermuda estilo cargo',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'BEC',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Musculosa Gris',
        description: 'Musculosa Gris',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'MGH',
        stock: 15,
    });

    await manager.addProduct({
        title: 'Musculosa Naranja',
        description: 'Musculosa Naranja',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'MNH',
        stock: 15,
    });

    // Obtener todos los productos después de agregarlos
    const allProductsAfterAdd = await manager.getProducts();
    console.log('Productos después de agregarlos:');
    console.table(allProductsAfterAdd);

    // // Buscar un producto por ID 
    // const productIdToFind = 2;
    // const foundProductById = await manager.getProductById(productIdToFind);
    // console.log(`Producto con ID ${productIdToFind}:`, foundProductById);

    // // Eliminar un producto por ID 
    // const productIdToDelete = 3;
    // await manager.deleteProductById(productIdToDelete);
    // console.log(`Producto con ID ${productIdToDelete} eliminado.`);

    // // Modificar un producto por ID 
    // const productIdToUpdate = 4;
    // await manager.updateProductById(productIdToUpdate, {
    //     price: 250, // Modificar el precio
    // });
    // console.log(`Producto con ID ${productIdToUpdate} actualizado.`);

    // // Obtener todos los productos después de las operaciones
    // const updatedProducts = await manager.getProducts();
    // console.log('Productos después de las operaciones:');
    // console.table(updatedProducts);
    }

    // Llamar a la función de prueba
    testProductManager();


    async function removeAllProducts() {
        // Cargar los productos desde el archivo
        await manager.loadProductsFromFile();
    
        // Verificar si hay productos para eliminar
        if (manager.products.length === 0) {
            console.log("No hay productos para eliminar.");
            return;
        }
        
        // Eliminar todos los productos
        manager.products.splice(0, manager.products.length);
        
        // Guardar la lista vacía en el archivo
        await manager.saveProductsToFile();
        
        console.log("Todos los productos han sido eliminados.");
        }

        // Llamar a la función para eliminar todos los productos
        // removeAllProducts();
    


