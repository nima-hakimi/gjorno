import axios from "axios"
import { getUserProfileFromJwt } from "./userService";

const baseUrl = "http://localhost:1337/organizations"

/**
 * Posts a new organization to strapi and sets the owner
 * 
 * @param {Token used for identifying the user} jwt 
 * @param {The new organization's name} name 
 * @param {The new organization's description} description 
 * @returns New organization's data
 */
const createOrganization = async (jwt, name, description) => {
    const userProfile = await getUserProfileFromJwt(jwt)
    const response = await axios.post(baseUrl,
        {
            "name": name,
            "description": description,
            "owner": userProfile._id
        }, {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    }
    )
    return response.data
}

export { createOrganization }