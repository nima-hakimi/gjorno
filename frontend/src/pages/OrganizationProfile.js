import { useState, useEffect } from 'react'
import Activities from '../components/Activities'
import { getAllActivities } from '../services/activitiesService'
import { useSessionStorage } from '../services/storageHooks'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './MyProfileTabsStyle.css'
import './Design.css'
import { useHistory } from "react-router-dom";

/**
 * A profile page with info about the organization and their activities
 * and sign-ups. Renderes a header, and then some profile info and a 
 * 3-tabs system for displaying the users activity suggestions, the 
 * organized activities they signed up for, and their activity log.
 * @returns A profile page belonging to the logged-in user.
 */
const OrganizationProfile = () => {

    const [myActivities, setMyActivities] = useState([])
    const [myOrganizedActivities, setMyOrganizedActivities] = useState([])
    const [user, setUser] = useSessionStorage('user', {})
    const history = useHistory()

    /**
     * Filter the activites where userID equals the activitys creator id, and
     * sets the activities on the profile using the activity boxes.
     */
    const filterMyActivities = (activities) => {
        const ID = user.id
        const temp = []
        console.log(activities)
        activities.forEach(activity => {
            try {
                ID === activity.creator.id ? temp.push(activity) : console.log("Hei")
            } catch (error) {
            }
        })
        setMyActivities(temp)
    }

    /**
     * This runs when the component/page first renders. It tries to fetch the 
     * activities the user has made by running filterMyAcivities. And then it
     * saves the users logged activities in a storagehook. 
     */
    useEffect(async () => {
        try {
            const db_activities = await getAllActivities()
            filterMyActivities(db_activities)
        } catch (error) {
        }

        setMyOrganizedActivities(user.organized_activities)

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
     * they signed up for, and their activity log. 
     */
    return (
        <div>
            <div className="header">
                <div className="logo"></div>
                {activityButton}
                <a href="/home">Alle aktiviteter</a>
                <a href="/myprofile">Min profil</a>

            </div>
            {user.organization ?
                <>
                    <div class="myprofile organization-prof">
                        <div className="profileInfo">
                            <h1>{user.organization.name}</h1>
                            <h4>Beskrivelse: {user.organization.description}</h4>
                        </div>
                        <div className="content organization">
                            <Tabs>
                                <TabList>
                                    <Tab>
                                        <p>Våre aktivitetsforslag</p>
                                    </Tab>
                                    <Tab>
                                        <p>Våre organiserte aktiviteter</p>
                                    </Tab>
                                </TabList>

                                <TabPanel>
                                    <div className="panel-content">
                                        <h2>Våre aktivitetsforslag</h2>
                                        <Activities activities={myActivities} />
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="panel-content">
                                        <h2>Våre organiserte aktiviteter</h2>
                                        {/* A COMPONENT TO DISPLAY THE USERS SIGNED UP ORGANIZED ACTIVITIES SHOULD BE HERE */}
                                    </div>
                                </TabPanel>

                            </Tabs>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="rectangle">
                        <h1>Opprett organisasjon her</h1>
                        <button onClick={() => history.push("/createorganization")}>Kom i gang</button>
                    </div>
                </>
            }
        </div>

    )
}

export default OrganizationProfile
