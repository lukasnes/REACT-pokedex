import './NewTeamButton.css'

const NewTeamButton = ( {onClick} ) => {
    return (
        <button
            id='new-team-button' 
            onClick={onClick}
        >Create a new team!</button>
    )
}

export default NewTeamButton