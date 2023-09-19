import axios from "axios";
let {data} = await axios.get('/dex/auth/status')
const initialState = {
    loggedIn: data.loggedIn,
    modal: 'none'
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
        default:
            return state;
    }
}