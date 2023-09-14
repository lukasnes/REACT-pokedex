import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import axios from 'axios';
import Root from './Root.jsx';
import Pokedex from './Pages/Pokedex/Pokedex.jsx';
import Auth from './Pages/Auth/Auth.jsx'

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
            // console.log(res.data.results)
            return { pokemon: res.data.results,bulbasaur: bulbasaur.data }
          }}
        />
        <Route 
            path='auth'
            element={<Auth />}
        />
      </Route>
    )
  )

export default router