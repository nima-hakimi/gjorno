import { useHistory, useParams } from "react-router-dom";
import { useSessionStorage } from "../services/storageHooks";
import { useEffect, useState } from "react";
import './Design.css';
import { getOneOrganizedActivity } from "../services/organizedActivityService";
import { SingleFieldSubscriptionsRule } from "graphql";
import { getUserProfileFromJwt, signUp } from "../services/userService";

const DisplayOrganizedActivity = () => {

    const history = useHistory()
    const { id } = useParams()
    const [jwt, setJwt] = useSessionStorage("jwt", null)
    const [user, setUser] = useSessionStorage("user", null)
    const [organizedActivity, setOrganizedActivity] = useState(null)

    const signUpAndFetchOrganizedAcitvity = async () => {
        await signUp(user, jwt, organizedActivity)
        await fetchAndSaveOrganizedActivity()
    }

    /**
     * Fetches and save organized activities
     */
    const fetchAndSaveOrganizedActivity = async () => {
        const fetchedOrganizedActivity = await getOneOrganizedActivity(id, jwt)
        setOrganizedActivity(fetchedOrganizedActivity)
    }

    /**
     * Calls fetchAndSaveOrganizedActivity()
     */
    useEffect(() => {
        fetchAndSaveOrganizedActivity()
    }, [])

    const getAvailableSpotCount = (organizedActivity) => {
        return organizedActivity.Antall_deltakere - organizedActivity.users.length
    }

    /**
     * 
     * @param {This organized activity} organizedActvity 
     * @returns true if the user is signed up for this activity, otherwise false
     */
    const isSignedUp = (organizedActvity) => {
        for (const registerdUser of organizedActivity.users) {
            if (registerdUser._id === user._id) {
                return true
            }
        }
        return false
    }


    /**
     * @param {The user that is logged in} user 
     * @param {This organized activity} organizedActivity 
     * @returns the right option based on the state the user is in
     */
    const getUserOptions = (user, organizedActivity) => {
        if (isSignedUp(organizedActivity)) {
            return <div>Du er påmeldt denne aktiviteten</div>
        } else if (user.role.name === "Organization-owner") {
            return <div>Som organisasjonseier kan du ikke melde deg på denne aktiviteten</div>
        } else if (getAvailableSpotCount(organizedActivity) <= 0) {
            return <div>Ingen ledige plasser igjen!</div>
        } else {
            return <button onClick={() => signUpAndFetchOrganizedAcitvity()}>Meld deg på</button>
        }
    }


    return (
        <div>
            <div className="header">
                <div className="logo"></div>
            </div>
            <div className="rectangle">
                {organizedActivity ?
                    <>
                        <h2>{organizedActivity.Name}</h2>
                        <div>{organizedActivity.Date}</div>
                        <div>{organizedActivity.Description}</div>
                        <div>Maks antall deltakere: {organizedActivity.Antall_deltakere}</div>
                        <div>Ledige plasser: {getAvailableSpotCount(organizedActivity)}</div>
                        <div>{organizedActivity.Users}</div>
                        {getUserOptions(user, organizedActivity)}
                    </>
                    :
                    <div>Laster inn...</div>
                }

                <div className="homeButton">
                    <button onClick={() => history.push("/Home")}>Tilbake</button>
                </div>
            </div>
        </div>
    )

}

export default DisplayOrganizedActivity;