import React from 'react'
import './activities.css'
import OrganizedActivity from './OrganizedActivity'

/*
This component fetches all activities from the database, 
and passes the data correctly to render an "Activity.js"box 
for every activity.
*/

const OrganizedActivities = ({activities}) => {
    // Trenger å bruke hooks for å lagre tilstanden/variabler på tvers av flere re-renders. Denne hooken er en array med alle aktiviteter

    //Wrapping everything up in a container and returning. 
    return (
        <div className="container">  
            {
                activities.map((activity, i) => 
                    <OrganizedActivity key={i+1} activity={activity}/>
                )
            } 
        </div>
    )

}


export default OrganizedActivities