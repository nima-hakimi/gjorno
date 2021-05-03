import axios from "axios"
import { getUserProfileFromJwt } from "./userService";


const baseUrl = "http://localhost:1337/organized-activities"


/**
 * @param {*} name - name of organized activity
 * @param {*} description - description of organized activity
 * @param {*} date - date the event is planned for
 * @param {*} participants - maximum number of participants for that activity
 * @returns {*} Object which has been posted - or a HTTP status code indicatiing 403 forbidden or 500 internal server error
 */
const postOrganizedActivity = async (jwt, name, description, date, participants) => {
    console.log(participants)
    const response = await axios.post(baseUrl,
        {
            "Name": name,
            "Description": description,
            "Date": date,
            "users": [],
            "Antall_deltakere": participants
        }, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        }
    )
    return response.data
}

/**
 * @returns All organized activities
 */
const getAllOrganizedActivities = async (jwt) => {
    const response = await axios.get(baseUrl, 
        {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
    return response.data
}

/**
 * @returns One organized activitiy
 */
const getOneOrganizedActivity = async (id, jwt) => {
    const response = await axios.get(`${baseUrl}/${id}`,
        {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
    return response.data
}

export { postOrganizedActivity, getAllOrganizedActivities, getOneOrganizedActivity }