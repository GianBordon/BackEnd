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
            console.log("getMessages", error.message);
            throw new Error("No se pudo obtener el listado de mensajes");
        }
    };

    async addMessage(messageInfo) {
        try {
            const { user, message } = messageInfo; // Extraer user y message del objeto messageInfo

            // Verificar que user y message no estén vacíos
            if (!user || !message) {
                throw new Error("El mensaje debe contener las propiedades 'user' y 'message'");
            }

            const result = await this.model.create(messageInfo);
            return result;
        } catch (error) {
            console.log("addMessage", error.message);
            throw new Error("No se pudo agregar el mensaje");
        }
    };
}
