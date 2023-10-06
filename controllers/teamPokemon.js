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
    let newTeam = req.body
    await TeamPokemon.destroy({where: {teamId: +id}})
    let team = await Team.findByPk(+id)
    for(let i = 0; i < newTeam.length; i++){
        let { name,spriteUrl,imgUrl,gen } = newTeam[i]
        await team.createTeamPokemon({name, spriteUrl, imgUrl, gen})
    }
    res.status(200).json({ success: true })
    return
}

export {getTeamPokemon,getIsOnTeam,addToTeam,}