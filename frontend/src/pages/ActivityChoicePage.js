import { useHistory } from "react-router-dom";
import './Design.css';

/**
 * A redirect page for organizations, where you choose if you 
 * want to create an activity suggestion or organized activity.
 * You will only be sent here if you are logged in as organization
 * @returns page for choosing register-page
 */
const ActivityChoicePage = () => {

    const history = useHistory()

    return (
        <div>
            <div className="header">
                <div className="logo"></div>
                <a href="/home">Alle aktiviteter</a>
                <a href="/myprofile">Min profil</a>
            </div>
            <div className="rectangle choose-activity">
                <h2>Hvilken type aktivitet vil du opprette?</h2>
                <br />
                <div className="homeButton">
                    <button onClick={() => history.push("/CreateOrganizedActivity")}>Organisert aktivitet</button>
                    <button onClick={() => history.push("/CreateActivity")}>Aktivitetsforslag</button>
                </div>
            </div>
        </div>
    )
}

export default ActivityChoicePage