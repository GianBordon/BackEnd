class ProductManager{
    constructor(){
        this.products = [];
    };

    getProducts(){
        console.log(this.products);
    };

    addProduct(title,description,price,thumbnail,code,stock){ 
        let newId;
        if(this.products.length==0){
            newId=1
        }else {
            newId=this.products[this.products.length-1].id+1
        } 
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Todos los campos deben ser completados")
        } else if(this.products.find(elm=>elm.code===newProduct.code)){
            console.log("No se permiten repetir productos con el mismo code")
        }else {
            const newProduct = {
            id: newId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct);
        console.log("El producto fue agregado correctamente");
        }
    }

    getProductsById() {
        const productId = this.products.find((elm)=>elm.id === newProduct.id);
        if(!productId){
            console.log("El producto no existe")
        }else {
            console.log("productId", productId)
        }
    }
}
const manager = new ProductManager();
// console.log(manager);
// manager.getProducts();
manager.addProduct("Pantalon","pantalon gris", 200, "Sin imagen", "PGU", 25);
manager.addProduct("Remera","remera azul", 200, "Sin imagen", "RAH", 25);
manager.getProducts();
manager.getProductsById(1);