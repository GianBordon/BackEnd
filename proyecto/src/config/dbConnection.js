import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb+srv://shiammdp21:742404@ecomerce.ovxhziv.mongodb.net/ecomerceDB?retryWrites=true&w=majority");
        console.log("Base de datos conectada con exito")
    } catch (error) {
        console.log(`Hubo un error al conectar la base de datos ${error.message}`);
    }
};