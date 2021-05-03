import axios from "axios"
import { getUserProfileFromJwt } from "./userService";

const baseUrl = "http://localhost:1337/aktivitets"
const graphURL = "http://localhost:1337/graphql"


const getAllActivitiesQuery = `query {
    aktivitets {
      id
      name
      description
      creator{
        id
        username
        organization {
          id
          name
        }
      }
    }    
}`


const getAllActivities = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getAllActivitiesGraphql = async () => {
    const response = await axios.post(graphURL, { query: getAllActivitiesQuery}, {
        headers: {'Content-type': 'application/json'}
    })
    return response.data.data.aktivitets
}

const createActivity = async (jwt, name, description) => {
    const userProfile = await getUserProfileFromJwt(jwt)
    const response = await axios.post(baseUrl,
        {
            "name": name,
            "description": description,
            "creator": userProfile._id
        }, {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }
    )
    return response.data
}

/**
 * Service to add an activity to the log. This works with relations in general. 
 * NOTE: Strapi fixes the user-side of this relation put automatically. No need
 * to write a function in the user-Service.
 * Also worth noting: When this function is called with an activity and a user which
 * are already saved, it will not put a duplicate relation, and will instead do nothing.
 * @param {*} jwt JWT of the user
 * @param {*} activityID The ID of the activity to add to the log
 * @returns response data
 */
const putToActivityLog = async (jwt, activityID, activity) => {
    const userProfile = await getUserProfileFromJwt(jwt)
    let newActivity = activity
    newActivity.saved_by.push(userProfile.id)
    const response = await axios.put(baseUrl + "/" + activityID,
        {
            /* "saved_by": [userProfile._id] */
            "saved_by": [...newActivity.saved_by]
        }, {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }
    )
    console.log("Response from activitiesService: " + JSON.stringify(response))
    return response.data
}



export { getAllActivities, getAllActivitiesGraphql, createActivity, putToActivityLog }