import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import session from 'express-session'
import dotenv from 'dotenv'
import { 
    getTeamPokemon,
    getIsOnTeam,
    addToTeam, 
    removeFromTeam
} from './controllers/teamPokemon.js'
import {
    addNewTeam,
    getTeams,
    editTeam
} from './controllers/teams.js'
import {
    getTeam
} from './controllers/team.js'
import { 
    loginRequired,
    logoutRequired,
    userAuth,
    logout,
    register,
    authStatus 
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

// AUTH & REGISTRY
app.get('/dex/logout',loginRequired,logout)
app.get('/dex/auth/status',authStatus)
app.post('/dex/auth',logoutRequired,userAuth)
app.post('/dex/register',logoutRequired,register)

// TEAM POKEMON
app.get('/dex/team-pokemon',loginRequired,getTeamPokemon)
app.get('/dex/team-pokemon/:id',loginRequired,getIsOnTeam)
app.post('/dex/add-to-team/:id',loginRequired,addToTeam)
app.post('/dex/remove-from-team/:id',loginRequired,removeFromTeam)

// TEAMS
app.get('/teams/all-teams',loginRequired,getTeams)
app.post('/teams/add-new',loginRequired,addNewTeam)
app.post('/teams/edit-team/:id',loginRequired,editTeam)

// TEAM
app.get('/team/:id',loginRequired,getTeam)

ViteExpress.listen(app,PORT,() => console.log(`Server running on http://localhost:${PORT}`))