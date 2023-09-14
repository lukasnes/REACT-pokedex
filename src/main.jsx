import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import axios from 'axios'
import './index.css'
import Pokedex from './Components/Pokedex/Pokedex.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
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
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
