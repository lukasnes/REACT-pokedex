import './Pokedex.css'
import { capitalize } from '../../utils/utils'
import { useSelector,useDispatch } from 'react-redux'
import AddToTeam from '../AddToTeam/AddToTeam'

const Pokedex = () => {
    const dispatch = useDispatch()
    let currentMon = useSelector(state => state.currentMon)
    let { id,name,types,sprites:{other},stats } = currentMon
    let imgUrl = other['official-artwork']['front_default']
    let statsDisplay = stats.map(info => {
        // console.log(stat)
        let {base_stat, stat} = info
        return (
            <div id="stat-container" key={stat.name}>
                <label className={`${stat.name}-stat`} htmlFor={`${stat.name}-stat`}>{capitalize(stat.name)}: </label>
                <p className={`${stat.name}-stat`}>{base_stat}</p>
            </div>
        )
    })
    const openModal = (evt) => {
        dispatch({type: 'modal-on'})
    }

    return (
        <div id="poke-container" key={id}>
            <header id="poke-header">
                <p id="dex-order">{id}</p>
                <h1 id="poke-name" className={types[0].type.name}>{capitalize(name)}</h1>
                <ul id="types-list">
                    Types:
                    {types.map(({type},index) => {
                        return (
                            <li key={index} className={type.name}>
                        {capitalize(type.name)}
                    </li>)
                    })}
                </ul>
            </header>
            <section id="poke-info">
                <div id="stats-display">
                    {statsDisplay}
                </div>
                <img id="poke-img" src={imgUrl} />
                {<button 
                    id='poke-search-btn'
                    onClick={openModal}
                >
                    Search for a Pokemon!
                </button>}
            </section>
        </div>
    )
}

export default Pokedex