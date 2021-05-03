import { loginAsUser, getUserProfileFromJwt } from "../services/userService"
import { createOrganization as postOrganization } from "../services/organizationService"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSessionStorage } from "../services/storageHooks";
import './Design.css';
/**
 * @returns Organization page
 */
const CreateOrganization = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()
    const [jwt, setJwt] = useSessionStorage("jwt", null)
    const [user, setUser] = useSessionStorage("user", null)
    const [role, setRole] = useState("")

    /**
     * Tries to create an organization, throws error otherwise.
     * @param {*} event 
     */
    const createOrganization = async (event) => {
        event.preventDefault()
        let responseData = null
        try {
            const response = await postOrganization(jwt, name, description)
            responseData = response
        }
        catch (error) {
        }

        if (responseData) {
            let newUser = user
            newUser.organization = responseData
            setUser(newUser)
        }

        history.push('/home')
    }

    /**
     * Gets the role of this user with the given jwt.
     * @param {The token used for identifying the user} userJwt 
     */
    const getRole = async (userJwt) => {
        const userProfile = await getUserProfileFromJwt(userJwt)
        setRole(userProfile?.role?.name)
    }

    /**
     * Updates the role everytime jwt is changed.
     */
    useEffect(() => {
        getRole(jwt)
    }, [jwt])



    return (
        <div>
            <div className="header">
                <div className="logo"></div>
                <a href="/createactivity">Opprett aktivitet</a>
                <a href="/home">Alle aktiviteter</a>
                <a href="/myprofile">Min profil</a>
            </div>
            <div className="rectangle create-activity">
                <h1>Ny Organisasjon</h1>
                {jwt && role === "Organization-owner" ?
                    <form onSubmit={event => createOrganization(event)}>
                        <input
                            style={{ width: "15vw" }}
                            placeholder="Tittel"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <textarea
                            placeholder="Beskrivelse"
                            style={{ width: "15vw" }}
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
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
                    <div>
                        <div>Du er ikke en organisasjonseier. For å bli en organisasjonseier, må du få bekretelse fra Elin Schanke Funnemark.</div>
                        <a href={"mailto:elinsf@stud.ntnu.no"}>Send søknad til elinsf@stud.ntnu.no</a>
                    </div>
                }
                {!jwt ?
                    <>
                        <div>For å oprette en organisasjon, må du være logget inn</div>
                        <button onClick={() => history.push("/login")}>Logg inn her</button>
                    </>
                    :
                    null
                }
            </div>
        </div>
    )

}

export default CreateOrganization;