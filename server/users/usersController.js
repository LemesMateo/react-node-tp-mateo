const { getAllUsers, getUserById, addNewUser, deleteUserById, editUserById, loginUser } = require("./usersModel")
const notNumber = require("../utils/notNumber")
const { encrypt, compare } = require("../utils/handlePassword")
const { matchedData } = require("express-validator")
const public_url = 'http://localhost:5000/'
const { tokenSign, tokenVerify } = require("../utils/handleJWT")

//get all users
const listAll = async(req, res, next) => {
    const dbResponse = await getAllUsers();
    if (dbResponse instanceof Error) return next(dbResponse)

    /* filtrar dbResponse (un arreglo con objetos enviado por la consulta a la base de datos) para obtener un nuevo
    arreglo que contenga todos los pares clave/valor a excepción de la contraseña. Entregar el nuevo objeto de tipo array
    en la respuesta al front*/
    const responseUser = dbResponse.map((user) => {
            const filteredUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                password: user.password
            }
            return filteredUser
        })
        // const responseUser = dbResponse.map(({ name, email, image }) => ({ name, email, image }))// lo mismo, más corto
    dbResponse.length ? res.status(200).json(responseUser) : next()
}

//get user by id
const listOne = async(req, res, next) => {
    if (notNumber(req.params.id, next)) return
    const dbResponse = await getUserById(+req.params.id);
    if (dbResponse instanceof Error) return next(dbResponse)
    if (!dbResponse.length) return next()
    const { id, name, email, image, password } = dbResponse[0]
    const responseUser = {
        id,
        name,
        email,
        image,
        password
    }
    res.status(200).json(responseUser)
}


//register
const register = async(req, res, next) => {
    try{
        const cleanBody = matchedData(req)
        //const image = `${public_url}/${req.file.filename}`
        const password = await encrypt(req.body.password)
        const dbResponse = await addNewUser({...cleanBody, password })
        if (dbResponse instanceof Error) return next(dbResponse);
        
        res.status(201).json({ message: "User Created!" })
        
    } catch(e)
    {
        res.status(500).json({ message: e.message })
    }
}


//login
const login = async(req, res, next) => {
    const dbResponse = await loginUser(req.body.email);
    if (!dbResponse.length) return next();
    console.log("Password:", req.body.password, dbResponse[0].password)
    if (await compare(req.body.password, dbResponse[0].password)) {
        const user = {
            id: dbResponse[0].id,
            name: dbResponse[0].name,
            email: dbResponse[0].email
        }
        const token = await tokenSign(user, "3h")
        res.status(200).json({ message: "User logged in!", JWT: token })
    } else {
        let error = new Error("Unauthorized")
        error.status = 401
        next(error)
    }
}

/*Creamos el tranporte de nodemailer para el servicio de mailtrap*/
const nodemailer = require("nodemailer")
const res = require("express/lib/response")
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.mail_user,
        pass: process.env.mail_pass
    }
});
//FORGOT PASSWORD
const forgot = async(req, res, next) => {
    const dbResponse = await loginUser(req.body.email)
    if (!dbResponse.length) return next();
    const user = {
        id: dbResponse[0].id,
        name: dbResponse[0].name,
        email: dbResponse[0].email
    }
    const token = await tokenSign(user, '15m')
    const link = `${public_url}/users/reset/${token}`

    let mailDetails = {
        from: "tech.support@splinter",
        to: user.email,
        subject: "Pasword Recovery with magic link",
        html: `<h2>Password Recovery Service</h2>
        <p>To reset your password, please click the link and follow the instructions</p>
        <a href="${link}">click to recover your password</a>
        `
    }
    transport.sendMail(mailDetails, (error, data) => {
        if (error) {
            error.message = "Internal Server Error"
            res.next(error)
        } else res.status(200).json({ message: `Hi ${user.name}, we've sent an email with instructions to ${user.email}... Hurry up!` })
    })

}

//FORM -> reset password
const reset = async(req, res, next) => {
    const { token } = req.params
    const tokenStatus = await tokenVerify(token)
    if (tokenStatus instanceof Error) {
        res.send(tokenStatus)
    } else res.render("reset", { tokenStatus, token })
}

const saveNewPass = () => {}

//edit user by id
const editOne = async(req, res, next) => {
    if (notNumber(req.params.id, next)) return
    const image = `${public_url}/${req.file.filename}`
    const dbResponse = await editUserById(+req.params.id, {...req.body, image })
    if (dbResponse instanceof Error) return next(dbResponse)
    dbResponse.affectedRows ? res.status(200).json({ message: "User modified!" }) : next()
}

//delete user by id
const deleteOne = async(req, res, next) => {
    if (notNumber(req.params.id, next)) return
    const dbResponse = await deleteUserById(+req.params.id)
    if (dbResponse instanceof Error) return next(dbResponse);
    !dbResponse.affectedRows ? next() : res.status(204).end();
}


module.exports = { listAll, listOne, register, deleteOne, editOne, login, forgot, reset, saveNewPass }