import { loginAsUser, getUserProfileFromJwt } from "../services/userService"
import { postOrganizedActivity } from "../services/organizedActivityService"
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useSessionStorage } from "../services/storageHooks";
import './Design.css';

/**
 * Component which is for creating an organized activity
 * @returns page for creating an organized activity 
 */
const CreateOrganizedActivity = () => {

    /**
     * Hooks for the component
     */
    const [name, setName] = useState("")
    const [deltakere, setDeltakere] = useState(0)
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()
    const [jwt, setJwt] = useSessionStorage("jwt", null)
    const [activity, setActivity] = useSessionStorage('activity', null)

    /**
     * Uses backend service for posting organized activity
     * @param {*} event - event which is fired
     */
    const createOrganized = async (event) => {
        event.preventDefault()
        try {
            const response = await postOrganizedActivity(jwt, name, description, date, deltakere)
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
                <h1>Opprett organisert aktivitet</h1>
                {jwt ?
                    <form onSubmit={event => createOrganized(event)}>
                        <div>
                            <input
                                style={{ width: "15vw" }}
                                placeholder="Tittel"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                id="datoID"
                                name="dato"
                                value={date}
                                onChange={event => setDate(event.target.value)}
                            />
                        </div>
                        <div>
                            <label for="quantity">Antall deltakere</label>
                            <input
                                type="number"
                                id="quantityID"
                                name="quantity"
                                value={deltakere}
                                min="1"
                                max="20"
                                onInput={event => setDeltakere(event.target.value)}
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Beskrivelse"
                                style={{ width: "15vw" }}
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                        </div>
                        {
                            name === "" || description == ""
                                ?
                                <>
                                    <button type="submit" disabled>Lagre</button>
                                    <p style={{ color: "red", fontSize: "16px" }}> * Vennligst fyll ut begge feltene </p>
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

export default CreateOrganizedActivity