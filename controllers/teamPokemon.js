import { Team,TeamPokemon } from '../database/model.js'

const getTeamPokemon = async(req,res) => {
    let teams = await Team.findAll({
        where: { userId: req.session.userId }
    })

    res.status(200).json(teams)
}
const getIsOnTeam = async(req,res) => {
    let {id} = req.params
    console.log(id)
    let teamPokemon = await TeamPokemon.findAll({where: {teamId: parseInt(id)}})
    res.status(200).json(teamPokemon)
}
const addToTeam = async(req,res) => {
    let {id} = req.params
    let pokemon = req.body
    delete pokemon.id
    delete pokemon.types
    delete pokemon.status
    let team = await TeamPokemon.findAll({where: {teamId: +id}})
    console.log(pokemon)
    if(team.length >= 6){
        res.status(401).json({ error: "Too many Pokemon" })
        return
    }
    team = await Team.findByPk(+id)
    await team.createTeamPokemon(pokemon)
    res.status(200).json({ success: true })
    return
}
const removeFromTeam = async(req,res) => {
    let {id} = req.params
    let { pokemon } = req.body
    let monToDelete = await TeamPokemon.findOne({where: {
        teamId: +id,
        pokemon: pokemon
    }})
    console.log(monToDelete)
    await monToDelete.destroy()
    res.status(200).json({ success: true })
}

export {getTeamPokemon,getIsOnTeam,addToTeam,removeFromTeam}