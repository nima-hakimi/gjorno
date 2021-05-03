import {useState, useEffect} from 'react'
import Activities from '../components/Activities'
import OrganizedActivities from '../components/OrganizedActivities'
import {getAllActivities} from '../services/activitiesService'
import { useSessionStorage } from '../services/storageHooks'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useHistory } from "react-router-dom";
import './MyProfileTabsStyle.css'
import { getAllOrganizedActivities } from '../services/organizedActivityService';

/**
 * A profile page with info about the user and their activities
 * and sign-ups. Renderes a header, and then some profile info and a 
 * 3-tabs system for displaying the users activity suggestions, the 
 * organized activities they signed up for, and their activity log.
 * @returns A profile page belonging to the logged-in user.
 */
const MyProfile = () => {

    const [myActivities, setMyActivities] = useState([])
    const [loggedActivities, setLoggedActivities] = useState([])
    const [signedUpActivities, setSignedUpActivities] = useState([])
    const [organizedActivities, setOrganizedActivities] = useState([])
    const [jwt, setJwt] = useSessionStorage("jwt", null)
    const [user, setUser] = useSessionStorage('user', {})
    const history = useHistory()
    
    /**
     * Filter the activites where userID equals the activitys creator id, and
     * sets the activities on the profile using the activity boxes.
     */
    const filterMyActivities = (activities) => {
        const ID = user.id
        const temp = []
        activities.forEach(activity => {
            try {
                ID === activity.creator.id ? temp.push(activity) : console.log("")
            } catch (error) {
            }
        })

        setMyActivities(temp)
    }

    const filterOrganizedActivites = (organized) => {
        const temp_signed = []
        const ID = user.id
        organized.forEach(activity => {
            try {
                activity.users.forEach(user => ID === user.id ? temp_signed.push(activity) : console.log("Sauce"))
            } catch (error) {
                console.log("Uff")
            }
        })
        setSignedUpActivities(temp_signed)
    }

    /**
     * This runs when the component/page first renders. It tries to fetch the 
     * activities the user has made by running filterMyAcivities. And then it
     * saves the users logged activities in a storagehook. 
     */
    useEffect(async () => {
        try {
            const db_activities = await getAllActivities()
            const organized_activities = await getAllOrganizedActivities(jwt)
            filterMyActivities(db_activities) 
            filterOrganizedActivites(organized_activities)
            setOrganizedActivities(organized_activities)               
        } catch (error) {
        }
        
        setLoggedActivities(user.logged_activities)

    }, [])

    /**
     * This is the "opprett ativitet"-button in the header, with the logic
     * for the redirect if the user is an organization-owner or not.
     */
    var activityButton;
    if (user.role.name === "Organization-owner") {
       activityButton = <a href="/activitychoicepage">Opprett aktivitet</a>;
    }   
    else {
      activityButton = <a href="/createactivity">Opprett aktivitet</a>;
    }

    /**
     * Renderes a header, and then some profile info and a 3-tabs system for
     * displaying the users activity suggestions, the organized activities
     * they signed up for, and their activity log. There is also a button which 
     * takes you to the CreateOrganization Page. This button will have different 
     * text based on whether or not you are an organizationOwner or not, and is
     * unavaliable if you already created an organization.
     */
    return (
        <div>
            <div className="header">
            <div className="logo"></div>
            {activityButton}
            <a href="/home">Alle aktiviteter</a>
            </div>

            <div class="myprofile">
                <div className = "profileInfo">
                    <h1>Min profil</h1>
                    <h2>Brukernavn: {user.username}</h2>
                    <h4>E-post: {user.email}</h4>
                    <h4>{user.role.name === "Organization-owner" ? <>Du er organisasjonseier{user.organization? <>, og organisasjonen din er {user.organization.name}</> : <></>} </> : <></>}</h4>
                </div>
                <div>
                    { ! user.organization ? 
                    <button className = "redirectButtonInMyProfile" onClick = { () => {
                        history.push("/createorganization")
                    }}> { user.role.name === "Organization-owner" ? <>Opprett organisasjon</> : <>Bli organisasjonseier</>}
                    </button> 
                    :
                    <button className = "redirectButtonInMyProfile" onClick = {() => {
                        history.push("/organizationprofile")
                    }}><b>Gå til min organisasjon: <br/> {user.organization.name}</b></button>
                    }
                </div>
                <div className = "content">
                    <Tabs>
                        <TabList>
                            <Tab>
                                <p>Mine aktivitetsforslag</p>
                            </Tab>
                            <Tab>
                                <p>Påmeldte aktiviteter</p>
                            </Tab>
                            <Tab>
                                <p>Aktivitetslogg</p>
                            </Tab>
            
                        </TabList>

                        <TabPanel>
                            <div className="panel-content">
                                <h2>Mine aktivitetsforslag</h2>
                                <Activities activities={myActivities}/>
                            </div>
                        </TabPanel>
                        
                        <TabPanel>
                            {user.role.name !== "Organization-owner" ? 
                                <div className="panel-content">
                                    <h2>Påmeldte aktiviteter</h2>
                                    <div>
                                        <OrganizedActivities activities={signedUpActivities}/>
                                    </div>
                                </div>
                                :
                                <div className="panel-content">
                                    <h2>Organiserte aktiviteter</h2>
                                    <div>
                                        <h3>Du er organisasjonseier, og kan ikke melde deg på organiserte aktiviteter!</h3>
                                    </div>
                                </div>
                            }
                        </TabPanel>
                        
                        <TabPanel>
                            <div className="panel-content">
                                <h2>Aktivitetslogg</h2>
                                <Activities activities={loggedActivities}/>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
        
    )
}

export default MyProfile
