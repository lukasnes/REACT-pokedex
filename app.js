import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import session from 'express-session'
import dotenv from 'dotenv'
import { User,Team,TeamPokemon } from './database/model.js'
import { 
    loginRequired,
    logoutRequired,
    userAuth,
    logout,
    register 
} from './controllers/auth.js'
dotenv.config()

const app = express()
const { PORT,SESSION } = process.env

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())
app.use(session({ secret: SESSION, saveUninitialized: true, resave: false }));

ViteExpress.config( { printViteDevServerHost: true } )

app.post('/dex/auth',logoutRequired,userAuth)
app.get('/dex/logout',loginRequired,logout)
app.post('/dex/register',logoutRequired, )

ViteExpress.listen(app,PORT,() => console.log(`Server running on http://localhost:${PORT}`))