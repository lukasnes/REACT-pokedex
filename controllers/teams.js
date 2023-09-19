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

export { addNewTeam,getTeams }