import React from "react"
import {useState} from 'react'
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
const OrganizedActivity = ({activity}) => {  //props is a given activity with all info from the database

    const [organizedActivity, setOrganizedActivity] = useState(null)

    const history = useHistory()

    function fixDateString (published_at) {
        var reversedDate = String(published_at).slice(0, 10)
        return reversedDate.split("-").reverse().join(".")
    }

    return (
        <button onClick={() => {
            setOrganizedActivity(activity)
            console.log(activity)
            history.push(`/organized-activities/${activity.id}`)  
        }}>   {/* The redirect to the page with more details and the "add to profile" should be added to this onClick function.*/}
            <div className="activityBox"> 
                
                {/* We won't support pictures until further notice.
                <div className = "element">
                    {<img src={imageUrl}/>} 
                </div>
                */}

                <div className = "element">
                    <h3>{activity.Name}</h3>  {/* Name of the activity */}
                </div>

                <div className = "date">
                    <p> {fixDateString(activity.published_at)}</p>  {/* Cleaning up the format before displaying*/}
                </div>  

                <div className = "likes">
                    <p>Påmeldt: {activity.users.length} / {activity.Antall_deltakere}</p>
                </div>

                <div className = "creator">
                    <p> {activity.organization !== undefined ? activity.organization.name : ""} </p>   {/* We may in the future implement a small icon of the users profile-pic.*/ }
                </div> 
                <div className = "interfaceArrow" />  {/* This is the arrow image signaling that the box is clickable. the source image is put in the css.*/}
                
            </div>
        </button>
    );
}

export default OrganizedActivity