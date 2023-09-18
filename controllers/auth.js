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
        req.session.userId = user.userId
        res.status(200).json({ success: true })
        return
    } else {
        res.status(401).json({ success: false })
        return
    }
}

const logout = (req,res) => {
    req.session.destroy()
    res.status(200).json({ success: true })
    return
}

const register = async(req,res) => {
    const { username,email,password } = req.body
    if(username && email && password){
        let user = await User.findOne({where: {username: username}})
        if(user){
            res.status(401).json({ error: 'User already exists!' })
            return
        } else {
            user = await User.create({ username,email,password })
            req.session.user = user.username
            res.status(200).json({ success: true })
            return
        }
    } else {
        res.status(401).json({ error: 'Information missing!' })
    }
}

const authStatus = (req,res) => {
    if(req.session.user){
        res.status(200).json({ user: req.session.user, loggedIn: true })
        return
    } else {
        res.status(200).json({ loggedIn: false })
        return
    }
}

export {
    loginRequired,
    logoutRequired,
    userAuth,
    logout,
    register,
    authStatus
}