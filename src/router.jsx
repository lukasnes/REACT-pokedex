import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import axios from 'axios';
import Root from './Root.jsx';
import Auth from './Pages/Auth/Auth.jsx'
import Teams from './Pages/Teams/Teams.jsx';
import DexPage from './Pages/DexPage/DexPage.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={<Root />}
      > 
        <Route 
          index 
          element={<DexPage />}
        />
        <Route 
            path='auth'
            element={<Auth />}
        />
        <Route 
          path='teams'
          element={<Teams />}
        />
      </Route>
    )
  )

export default router