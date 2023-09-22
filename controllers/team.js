import { User,Team,TeamPokemon } from '../database/model.js'

const getTeam = async(req,res) => {
    let { id } = req.params
    let team = await TeamPokemon.findAll({ where: {teamId: +id} })
    // console.log(team)
    res.status(200).json(team)
}

export { getTeam }