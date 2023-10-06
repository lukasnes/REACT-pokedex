import { db,User,Team,TeamPokemon } from "../database/model.js";

await db.sync({force: true})

let pokemon = [
    {
        name:'bulbasaur',
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        gen: 1
    },
    {
        name:'squirtle',
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
        gen: 1
    },
    {
        name:'charmander',
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        gen: 1
    }
]

for(let i = 0; i < 3; i++){
    let user = await User.create({ username: `test${i}`, email: `test${i}@email.com`, password: 'test' })
    let team = await user.createTeam({ teamName: 'Team 1' })
    let teamTwo = await user.createTeam({ teamName: 'Team 2' })
    await team.createTeamPokemon(pokemon[i])
    await teamTwo.createTeamPokemon(pokemon[pokemon.length - 1 - i])
}

await db.close()