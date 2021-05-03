import { useHistory } from "react-router-dom";
import { useSessionStorage } from "../services/storageHooks";
import './Design.css';

/**
 * 
 * @returns the start page of "gjorno"
 */
const Start = () => {

    const [jwt, setJwt] = useSessionStorage("jwt", null)
    const history = useHistory()
  
    return (
          <div className="rectangle start">
          <div className="login"><br></br>
            <h2>Velkommen til GjørNo´</h2>
            Her kan du registrere en egen profil, både som bruker og organisasjon. 
            Som bruker kan du legge ut aktiviteter offentlig, se aktiviterer fra andre og gjennomføre disse, 
            Som organisasjon kan man opprette organisert aktiviterer som andre brukere kan melde seg på.
            Håper du finner inspirasjon til ulike aktiviteter.
        {jwt ? <div>Du er logget inn</div>:
        <>
          <div className= "homeButton">
            <br></br>
            <button className="registrerButton" onClick={() => history.push("/register")}>Registrer</button>
            <button className="loginButton" onClick={() => history.push("/login")}>Logg inn</button>
          </div>
        </>
        }
        </div>
        </div>
    )
  
  }
  
  export default Start;