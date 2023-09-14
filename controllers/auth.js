import session from "express-session";
import { User } from '../database/model.js'

const loginRequired = (req,res,next) => {
    if(!req.session.user){
        res.status(401).json({ error: 'Unauthorized' })
        return
    } else {
        next()
    }
}

const logoutRequired = (req,res,next) => {
    if(req.session.user){
        res.status(401).json({ error: 'Unauthorized' })
    } else {
        next()
    }
}

const userAuth = async(req,res) => {
    const { username,password } = req.body
    let user = await User.findOne({where: {username: username}})
    if(user && user.password === password){
        req.session.user = username
        res.status(400).json({ success: true })
        return
    } else {
        res.status(401).json({ success: false })
        return
    }
}

const logout = (req,res) => {
    req.session.destroy()
    res.status(400).json({ success: true })
    return
}

const register = async(req,res) => {
    const { username,email,password } = req.body
    if(username && email && password){
        let user = await User.findOne(username)
        if(user){
            res.status(401).json({ error: 'User already exists!' })
            return
        } else {
            user = await User.create({ username,email,password })
            req.session.user = user.username
            res.status(400).json({ success: true })
            return
        }
    } else {
        res.status(401).json({ error: 'Information missing!' })
    }
}

export {
    loginRequired,
    logoutRequired,
    userAuth,
    logout,
    register
}