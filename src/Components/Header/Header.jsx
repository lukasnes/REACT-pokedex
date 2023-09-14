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
            <nav>
                <NavLink to='/'>Home</NavLink>

                { loggedIn ? <NavLink onClick={handleLogout}>Logout</NavLink> : <NavLink to='/auth'>Login</NavLink>}
            </nav>
        </header>
    )
}