import User from "../models/User"
import Role from "../models/Role"
import infoUser from "../models/infoUser"
import New from "../models/New"
import { mongo } from "mongoose"

export const getUser = async(req, res) => {
    const result = await User.find({ "email": req.body.email })
    res.status(200).json(result)
}

export const getInfoUser = async(req, res) => {
    const result = await infoUser.find()
    res.status(200).json(result)
}

export const getUserById = async(req, res) => {
    const result = await User.findById(req.params.idUser)
    res.status(200).json(result)
}

export const getNews = async(req, res) => {
    const result = await New.find({ "user": mongo.ObjectId(req.params.idUser) })
    res.status(200).json(result)
}

export const getRole = async(req, res) => {
    const result = await Role.find({ "_id": req.params.idRole })
    res.status(200).json(result)
}

export const postInfoUser = async(req, res) => {

    try {
        const { nombre, contacto, descripcion } = req.body
        const result = new infoUser({
            nombre,
            contacto,
            descripcion
        })
        result.save()

        res.status(200).json(result)
    } catch (error) {

        res.status(400).json("Ups. lo siento")
    }

}

export const updateUser = async(req, res) => {

    try {
        const result = await User.findByIdAndUpdate(req.params.idUser, req.body, {
            new: true
        })


        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("Ups, algo salio mal")
    }
}

export const createNews = async(req, res) => {
    const { titulo, contenido } = req.body
    const createNew = new New({
        titulo,
        contenido,
    })
    if (req.params.idUser) {
        const foundUser = await User.find({ _id: { $in: mongo.ObjectId(req.params.idUser) } })
        createNew.user = foundUser.map(user => user._id)
    } else {
        res.json("Algo salio mal")
    }
    createNew.save()
    res.status(200).json(createNew)
}
export const editNews = async(req, res) => {
    const result = await New.find({ _id: mongo.ObjectId(req.params.idUser), _id: mongo.ObjectId(req.params.idNew) })
    if (result) {
        const result = await New.findByIdAndUpdate(req.params.idNew, req.body, {
            new: true
        })

        res.json(result)
    } else {
        res.json("Noticia no existe")
    }
}


export const deleteNews = async(req, res) => {

    await New.findByIdAndDelete(req.params.idNews)
    res.status(200).json("Eliminado")
}