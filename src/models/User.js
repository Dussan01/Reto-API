import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    nombres: {
        type: String,
    },
    apellidos: {
        type: String,
    },
    telefono: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    seccion: {
        type: Boolean
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],

}, {
    timestamps: true,
    versionKey: false,
});


userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async(password, recivedPassord) => {
    return await bcrypt.compare(password, recivedPassord);
};

export default model('User', userSchema);