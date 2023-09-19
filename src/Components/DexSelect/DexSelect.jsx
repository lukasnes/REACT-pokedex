import './DexSelect.css'
import { capitalize } from '../../utils/utils'

const DexSelect = ({setMon,pokemon}) => {
    return (
        <select 
            name="poke-select" 
            id="poke-select" 
            onChange={setMon}
        >
            {pokemon.map((mon,index) => {
                return (
                    <option key={index} value={mon.name}>{capitalize(mon.name)}</option>
                )
            })}
        </select>
    )
}

export default DexSelect