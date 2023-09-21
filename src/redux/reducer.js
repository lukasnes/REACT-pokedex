import axios from "axios";
let {data} = await axios.get('/dex/auth/status')
const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
const bulbasaur = await axios.get('https://pokeapi.co/api/v2/pokemon/bulbasaur')
bulbasaur.data.pokemon = bulbasaur.data.name
delete bulbasaur.data.name
const initialState = {
    loggedIn: data.loggedIn,
    modal: 'none',
    teamId: null,
    pokemon: res.data.results,
    bulbasaur: bulbasaur.data
}

export default function reducer(state = initialState,action){
    switch(action.type) {
        case 'login':
            return {...state, loggedIn: true};
        case 'logout':
            return {...state, loggedIn: false};
        case 'modal-on':
            return {...state, modal: 'block'};
        case 'modal-off':
            return {...state, modal: 'none'};
        case 'team-id':
            return {...state, teamId: action.payload};
        case 'no-team-id':
            return {...state, teamId: null}
        default:
            return state;
    }
}