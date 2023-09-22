import { Team,TeamPokemon,User } from '../database/model.js'

const addNewTeam = async(req,res) => {
    let { teamName } = req.body
    let user = await User.findByPk(req.session.userId)
    await user.createTeam({ teamName })
    let teams = await Team.findAll({
        where: {userId: req.session.userId},
        include: {
            model: TeamPokemon,
            attributes: ['pokemon','spriteUrl']
        }
    })
    res.status(200).json(teams)
}
const getTeams = async(req,res) => {
    let teams = await Team.findAll({
        where: {userId: req.session.userId},
        include: {
            model: TeamPokemon,
            attributes: ['pokemon','spriteUrl']
        }
    })
    res.status(200).json(teams)
}
const editTeam = async(req,res) => {
    let {id} = req.params
    let {teamName} = req.body
    let team = await Team.findByPk(+id)
    team.teamName = teamName
    team.save()
    res.status(200).json(team)
}

export { addNewTeam,getTeams,editTeam }