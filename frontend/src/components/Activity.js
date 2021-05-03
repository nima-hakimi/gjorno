import React from "react"
import { useSessionStorage } from "../services/storageHooks";
import "./activity.css"
import { useHistory } from "react-router-dom";


/**
 * This is a clickable component, containing a brief 
 * overview of a given activity. Its imput (activity) 
 * should be the object representing the activity which should 
 * be displayed.
 * 
 * Render it with the following code: 
 * <Activity {...activity} key={activity.id}/>
 * 
 * The component is clickable and the onClick should
 * take the user to the more detailed activity-page. 
 * @param {*} activity object containing the activity.
 * @returns Clickable box with brief information about the activity
 */
const Activity = ({ activity }) => {

    const [activityStorage, setActivityStorage] = useSessionStorage("activity", null)
    const history = useHistory()
    const [user, setUser] = useSessionStorage('user', {})

    function fixDateString(published_at) {
        var reversedDate = String(published_at).slice(0, 10)
        return reversedDate.split("-").reverse().join(".")
    }



    return (
        <button onClick={() => {
            setActivityStorage(activity)
            history.push("/activitypage")
        }}>
            <div className="activityBox">
                <div className="element">
                    <h3>{activity.name}</h3>
                </div>

                <div className="date">
                    <p> {fixDateString(activity.published_at)}</p>
                </div>

                <div className="likes">
                    <p>{activity.saved_by ? "Utført av " + activity.saved_by.length + " brukere" : null} </p>
                </div>

                <div className="creator">
                    {activity.creator.organization != null ?
                        <>
                            <div>{activity.creator.organization.name}</div>
                        </>
                        :
                        <>
                            <div> {activity.creator.username} </div>
                        </>
                    }
                </div>
                <div className="interfaceArrow" />
            </div>
        </button>
    );
}

export default Activity

