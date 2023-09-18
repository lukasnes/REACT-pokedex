import axios from 'axios'
import './Header.css'
import { NavLink,useNavigate } from 'react-router-dom'

export default function Header({ loggedIn }){
    const navigate = useNavigate()
    const handleLogout = async(evt) => {
        const {data} = await axios.get('/dex/logout')
        if(data.success){
            navigate('/auth')
        }
    }
    return (
        <header id="site-header">
            <img src="../../../public/img/logos/pokeball.png"/>
            <img id="logo" src="../../../public/img/logos/poke_logo.png"/>
            <nav id="header-nav">
                <NavLink to='/' className="nav-link">Home</NavLink>

                { loggedIn ?
                <>
                    <NavLink to="/teams" className="nav-link">Teams</NavLink> 
                    <NavLink onClick={handleLogout} className="nav-link">Logout</NavLink> 
                </>
                : 
                <NavLink to='/auth' className="nav-link">Login</NavLink>}
            </nav>
        </header>
    )
}