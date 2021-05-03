import axios from "axios"
import React from 'react'
import {useEffect} from "react"
import {useState} from "react"
import { getAllActivities } from "../services/activitiesService"
import Activity from "./Activity"
import './activities.css'

/**
 * This component fetches all activities from the database, 
 * and passes the data correctly to render an "Activity.js"box 
 * for every activity.
 * @param {All activities} param0 
 * @returns renders all activities
 */

const Activities = ({activities}) => {

    return(
        <div className="container">  
            {
                activities.map((activity, i) => 
                    <Activity key={i+1} activity={activity}/>
                )
            } 
        </div>
    )

}


export default Activities