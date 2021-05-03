import React from 'react'
import axios from 'axios'
import { useSessionStorage } from "../services/storageHooks"
import {ApolloError, gql} from '@apollo/client'

const registerURL = "http://localhost:1337/auth/local/register"
const loginURL = "http://localhost:1337/auth/local"
const graphURL = "http://localhost:1337/graphql"
const usersURL = "http://localhost:1337/users"

/**
 * 
 * @param {user} user graphql query for registration of new user
 * @returns {response} 200 if ok, 400 bad request on wrongful validation, or if username exists
 */
const REGISTER_QUERY = (user) => 
`mutation {
    register(input: {email: "${user.email}", username: "${user.username}", password: "${user.password}"}) {
      jwt
    }
}`
  

const createUser = async (user) => {
    /* const response = await axios.post(registerURL, {
        username: user.username,
        email: user.email,
        password: user.password
    })
    return response.data */

    const response = await axios.post(graphURL, {query: REGISTER_QUERY(user)}, {
        headers: {'Content-type': 'application/json'}
    })
    return response.data
}

const loginAsUser = async (user) => {
    const response = await axios.post(loginURL, {
        identifier: user.email,
        password: user.password
    })
    return response.data
}

const getUserProfileFromJwt = async (jwt) => {
    const response = await axios.get(`${usersURL}/me`, {
        headers: {
            Authorization:
                `Bearer ${jwt}`
        }, 
    })
    return response.data
}

/**
 * Sets a relation between the user and the organized-activity.
 */
const signUp = async (user, jwt, organizedActivity) => {
    const newOrganizedActivities = user.organized_activities

    console.log(newOrganizedActivities)
    newOrganizedActivities.push(organizedActivity)
    const data = {"organized_activities": newOrganizedActivities}
    const config = {headers:{Authorization:`Bearer ${jwt}`}}
    const response = await axios.put(`${usersURL}/${user.id}`, data, config)
}

export { createUser, loginAsUser, getUserProfileFromJwt, signUp }
