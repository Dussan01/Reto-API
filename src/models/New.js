import { Schema, model } from "mongoose";

const newsSchema = new Schema({
    titulo: {
        type: String,
    },
    contenido: {
        type: String,
    },
    user: [{
        ref: "User",
        type: Schema.Types.ObjectId
    }],

}, {
    timestamps: true,
    versionKey: false,
});


export default model('news', newsSchema);