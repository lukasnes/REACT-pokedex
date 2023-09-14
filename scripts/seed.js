import { db,User,Team,TeamPokemon } from "../database/model.js";

await db.sync({force: true})

let pokemon = ['bulbasaur','squirtle','charmander']

for(let i = 0; i < 3; i++){
    let user = await User.create({ username: `test${i}`, email: `test${i}@email.com`, password: 'test' })
    let team = await user.createTeam({ teamName: 'Team 1' })
    await team.createTeamPokemon({ pokemon: pokemon[i] })
}

await db.close()