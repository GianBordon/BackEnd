import { usersModel } from "./models/users.model.js";

export class UsersManagerMongo {
    constructor() {
        this.model = usersModel;
    } 

    // Método para crear un usuario
    async createUser(userData) {
        try {
            const result = await this.model.create(userData);
            return result;
        } catch (error) {
            console.log("createUser: ", error.message);
            throw new Error("Se produjo un error al crear el usuario");
        }
    }

    // Método para obtener un usuario por su email
    async getUserByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            return user;
        } catch (error) {
            console.log('getUserByEmail: ', error.message);
            throw new Error('Se produjo un error al obtener el usuario por email');
        }
    }
};