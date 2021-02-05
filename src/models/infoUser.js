import { Schema, model } from "mongoose";

const infoUserSchema = new Schema({
    nombre: {
        type: String,
    },
    contacto: {
        type: String,
    },
    descripcion: {
        type: String,
    },

}, {
    timestamps: true,
    versionKey: false,
});


export default model('InfoUser', infoUserSchema);