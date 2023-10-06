import { MessageModel } from "./models/chat.model.js"

export class ChatManagerMongo {
    constructor() {
        this.model = MessageModel;
    }

    async getMessages() {
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("getMessages Error:", error.message);
            throw new Error("No se pudo obtener el listado de mensajes");
        }
    }
    async addMessage(user, message) {
        try {    
            const result = await this.model.create({ user, message });
            return result;
        } catch (error) {
            console.log("addMessage", error.message);
            throw new Error("No se pudo agregar el mensaje");
        }
    }
    
}
