const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10


// Registre (GET)
router.get("/registro", (req, res) => res.render("auth/signup"))


// Registre (POST)
router.post("/registro", (req, res, next) => {

    const { username, password } = req.body

    if (username === "" || password === "") {
        res.render("auth/signup", { errorMsg: "Rellena todos los campos" })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "El usuario ya existe" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(() => res.render("auth/signup", { errorMsg: "Hubo un error" }))
        })
        .catch(error => next(error))
})


// Log In (GET)
router.get("/inicio-sesion", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))


// Log In (POST)
router.post("/inicio-sesion", passport.authenticate("local", {
    successRedirect: "/perfil",
    failureRedirect: "/inicio-sesion",
    failureFlash: true,
    passReqToCallback: true
}))


// Log Out
router.get('/cerrar-sesion', (req, res) => {
    req.logout()
    res.redirect("/inicio-sesion")
})


module.exports = router