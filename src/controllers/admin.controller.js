import New from "../models/New";
import User from "../models/User"
import Role from "../models/Role"

export const getAllUsers = async(req, res) => {
    const result = await User.find();
    res.status(200).json(result)
}

export const createUser = async(req, res) => {
    const { email, nombres, apellidos, password, roles, telefono } = req.body;
    const newUser = new User({
        email,
        nombres,
        apellidos,
        telefono,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({ name: "usuario" })
        newUser.roles = [role._id]
    }
    const savedUser = await newUser.save()
    res.status(200).json(savedUser)
}

export const getAllNew = async(req, res) => {
    try {
        const result = await New.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("Ups, Algo salio mal")
    }
}
export const respuestaUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    res.json(email + password)
}



export const deleteUserById = async(req, res) => {
    const { userId } = req.params
    await User.findByIdAndDelete(userId)
    res.status(204).json()

}