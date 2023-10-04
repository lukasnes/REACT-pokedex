import axios from "axios";
let {data} = await axios.get('/dex/auth/status')
const bulbasaur = await axios.get('https://pokeapi.co/api/v2/pokemon/bulbasaur')
const initialState = {
    loggedIn: data.loggedIn,
    modal: 'none',
    teamId: null,
    currentMon: bulbasaur.data
}

export default function reducer(state = initialState,action){
    switch(action.type) {
        case 'login':
            return {...state, loggedIn: true};
        case 'logout':
            return {...state, loggedIn: false};
        case 'modal-on':
            return {...state, modal: 'flex'};
        case 'modal-off':
            return {...state, modal: 'none'};
        case 'team-id':
            return {...state, teamId: action.payload};
        case 'no-team-id':
            return {...state, teamId: null};
        case 'set-mon':
            return {...state, currentMon: action.payload}
        default:
            return state;
    }
}