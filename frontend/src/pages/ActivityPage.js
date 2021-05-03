import { useHistory } from "react-router-dom";
import { useSessionStorage } from "../services/storageHooks";
import './Design.css';
import { putToActivityLog } from "../services/activitiesService";
import { getUserProfileFromJwt } from "../services/userService";

const ActivityPage = () => {

    const [jwt, setJwt] = useSessionStorage("jwt", null)
    const [user, setUser] = useSessionStorage('user', {})
    const [activity, setActivity] = useSessionStorage("activity", {})
    const history = useHistory()

    /**
     * Puts the relation both at the user side, and the activity side.
     * It takes care of duplicate relation puts.
     * NOTE: This correctly updates the relation at both sides, but the user saved in 
     * the sessionStorage is NOT updated. I couldn't find what functions/services to call to refresh
     * this, so as of now it just manually adds the activity to the users logged-activities
     * if it's not added already.
     * @param {*} activityToPost The object of the activity you want to add to the log
     * @param {*} jwtToPost The JWT of the user who will add the 
     */
    const addToLog = (activityToPost, jwtToPost) => {
        const activityID = activityToPost.id
        try {
            const response1 = putToActivityLog(jwtToPost, activityID, activityToPost)
        }
        catch (error) {
        }
        const updatedUser = user
        const fixedActivityObject = activityToPost

        let alreadyLogged = false;
        updatedUser.logged_activities.forEach(element => {
            if (element.id == activityToPost.id) {
                alreadyLogged = true;
            }
        });
        if (!alreadyLogged) {
            fixedActivityObject.creator = fixedActivityObject.creator._id
            updatedUser.logged_activities.push(fixedActivityObject) //ActivityToPost er undefined...
            setUser(updatedUser)
        }
    }

    return (
        <>
            <div className="header">
                <div className="logo"></div>
            </div>
            <div className="rectangle">
                <h2>{activity.name}</h2>
                <div>{activity.description}</div>
                <div>Laget av: {activity.creator.username}</div>
                <div>Publisert: {activity.published_at}</div>
                <div className="logActivityButton">
                    <button id="btn1" onClick={() => {
                        addToLog(activity, jwt);
                        const btn1 = document.getElementById("btn1")
                        btn1.textContent = "Lagt til!"
                        btn1.disabled = true
                        btn1.hidden = true
                        document.getElementById("lab1").textContent = "Aktivteten er lagt til i loggen!"
                    }
                    }>Legg til i aktivitetsloggen!</button>
                    <br />
                    <label id="lab1" />
                </div>
                <div className="homeButton">
                    <button onClick={() => history.push("/Home")}>Tilbake</button>
                </div>
            </div>
        </>
    )
}

export default ActivityPage;