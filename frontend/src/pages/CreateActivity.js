import { loginAsUser, getUserProfileFromJwt } from "../services/userService"
import { createActivity as postActivity } from "../services/activitiesService"
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSessionStorage } from "../services/storageHooks";
import './Design.css';

const CreateActivity = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()
    const [jwt, setJwt] = useSessionStorage("jwt", null)
    const [activity, setActivity] = useSessionStorage('activity', null)

    const createActivity = async (event) => {
        event.preventDefault()
        try {
            const response = await postActivity(jwt, name, description)
            setActivity(response.data)
        }
        catch (error) {
        }
        history.push('/home')
    }




    return (
        <div>
            <div className="header">
                <div className="logo"></div>
                    <a href="/myprofile">Min profil</a>
                    <a href="/home">Alle aktiviteter</a>
            </div>
            <div className="rectangle create-activity">
                <h1>Ny aktivitet</h1>
                {jwt ?
                    <form onSubmit={event => createActivity(event)}>
                        <input
                            style={{width: "15vw"}}
                            placeholder="Tittel"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <textarea 
                            placeholder="Beskrivelse"
                            style={{width: "15vw"}}
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                        <br/>
                        <br/>
                        {
                            name === "" || description == ""
                            ?
                            <>
                                <button type="submit" disabled>Lagre</button>
                                <p style={{color: "red", fontSize: "16px"}}> * Vennligst fyll ut begge feltene </p>
                            </>
                            :
                            <button type="submit">Lagre</button>
                        }
                    </form>
                    :
                    <>
                        <div>For å oprette en aktivitet, må du være logget inn</div>
                        <button onClick={() => history.push("/login")}>Logg inn her</button>
                    </>
                }
            </div>
        </div>
    )

}

export default CreateActivity;