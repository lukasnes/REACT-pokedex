import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import axios from 'axios';
import Root from './Root.jsx';
import Pokedex from './Pages/Pokedex/Pokedex.jsx';
import Auth from './Pages/Auth/Auth.jsx'
import Teams from './Pages/Teams/Teams.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={<Root />}
      > 
        <Route 
          index 
          element={<Pokedex />}
          loader={async() => {
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
            const bulbasaur = await axios.get('https://pokeapi.co/api/v2/pokemon/bulbasaur')
            bulbasaur.data.pokemon = bulbasaur.data.name
            delete bulbasaur.data.name
            return { pokemon: res.data.results,bulbasaur: bulbasaur.data }
          }}
        />
        <Route 
            path='auth'
            element={<Auth />}
        />
        <Route 
          path='teams'
          element={<Teams />}
          loader={async() => {
            let {data} = await axios.get('/teams/all-teams')
            console.log(data)
            return {teamsData: data}
          }}
        />
      </Route>
    )
  )

export default router