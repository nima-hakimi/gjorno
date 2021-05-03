import { useState, useEffect, useHistory } from 'react'
import { useSessionStorage } from "../services/storageHooks";
import Activities from '../components/Activities'
import OrganizedActivities from '../components/OrganizedActivities'
import {getAllActivities} from '../services/activitiesService'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getAllOrganizedActivities } from '../services/organizedActivityService';

/**
 * Main feed page
 * @returns main feed-page with tabs system to choose to display activity suggestions or organized activities, with sorting possibilities.
 */
const Home = () => {

  const [activities, setActivities] = useState([])
  const [organizedActivities, setOrganizedActivities] = useState([])
  const [user, setUser] = useSessionStorage("user", null)
  const [jwt, setJwt] = useSessionStorage("jwt", null)

  /* 
  Fetches the data from the database, and transfer it to an array
  to be used as input for Activites.
  */
  useEffect(async () => {
    try {
      const db_activities = await getAllActivities()
      const db_organized = await getAllOrganizedActivities(jwt)
      const temp = []
      const temp_org = []
      db_activities.forEach(activity => {
        temp.push(activity)
      });
      db_organized.forEach(activity => {
        temp_org.push(activity)
      })
      setActivities(temp)
      setOrganizedActivities(temp_org)

    } catch (error) {
    }
    
  }, [])

  /**
   * This is to a function to force the react component to re-render, 
   * which will update 
   */
  let  [,setState]=useState();
  function handleUpdate() {
    //passing empty object will re-render the component
   setState({});
  }

  /**
   * Will sort the activities state hook of the given comparator.
   * @param {*} selectedKey a string, which will be used to index the correct sorting comparator
   */
  function sortActivities(selectedKey) {
      const dict = {
      "dateDown": (a, b) => a.published_at.slice(0, 10).localeCompare(b.published_at.slice(0, 10)),
      "dateUp": (a, b) => b.published_at.slice(0, 10).localeCompare(a.published_at.slice(0, 10)),
      "savesDown": (a, b) => b.saved_by.length - a.saved_by.length,
      "savesUp": (a, b) => a.saved_by.length - b.saved_by.length,
    }
    setActivities(activities.sort(dict[selectedKey]))
  }

  /**
   * Will sort the organized activities state hook of the given comparator.
   * @param {*} selectedKey a string, which will be used to index the correct sorting comparator
   */
   function sortOrganizedActivities(selectedKey) {
    
    const dict = {
    "dateDown": (a, b) => a.published_at.slice(0, 10).localeCompare(b.published_at.slice(0, 10)),
    "dateUp": (a, b) => b.published_at.slice(0, 10).localeCompare(a.published_at.slice(0, 10)),
    "savesDown": (a, b) => b.users.length - a.users.length,
    "savesUp": (a, b) => a.users.length - b.users.length,
    "spotsDown": (a, b) => b.Antall_deltakere - a.Antall_deltakere,
    "spotsUp": (a, b) => a.Antall_deltakere - b.Antall_deltakere,
  }
  setOrganizedActivities(organizedActivities.sort(dict[selectedKey]))
}

  var activityButton;
  if (user.role.name === "Organization-owner") {
    activityButton = <a href="/activitychoicepage">Opprett aktivitet</a>;
  }
  else {
    activityButton = <a href="/createactivity">Opprett aktivitet</a>;
  }

  return (
    <div>
      <div className="header">
        <div className="logo"></div>
        {activityButton}
        <a href="/myprofile">Min profil</a>
      </div>
      <div className = "content home">
        <Tabs>
          <TabList>
            <Tab>
              <p>Alle aktivitetsforslag</p>
            </Tab>
            <Tab>
              <p>Alle organiserte aktiviteter</p>
            </Tab>
          </TabList>
          <TabPanel>
            <div className="panel-content">
                <h2>Aktivitetsforslag</h2>
                <label for="activitySelect">Sorter: </label>
                <select id="activitySelect" onChange={()=>{
                  sortActivities(document.getElementById("activitySelect").value)
                  handleUpdate()
                  }}>
                  <option value="dateDown">Publiseringsdato↓</option>
                  <option value="dateUp">Publiseringsdato↑</option>
                  <option value="savesDown">Mest gjennomført</option>
                  <option value="savesUp">Minst gjennomført</option>
                </select>
                <Activities activities = {activities}/>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="panel-content">
                <h2>Organiserte aktiviteter</h2>
                <label for="organizedActivitySelect">Sorter: </label>
                <select id="organizedActivitySelect" onChange={()=>{
                  sortOrganizedActivities(document.getElementById("organizedActivitySelect").value)
                  handleUpdate()
                  }}>
                  <option value="dateDown">Publiseringsdato↓</option>
                  <option value="dateUp">Publiseringsdato↑</option>
                  <option value="savesDown">Antall påmeldte↓</option>
                  <option value="savesUp">Antall påmeldte↑</option>
                  <option value="spotsDown">Antall plasser↓</option>
                  <option value="spotsUp">Antall plasser↑</option>
                </select>
                <div>
                    <OrganizedActivities activities = {organizedActivities}/>
                </div>
            </div>
        </TabPanel>
        </Tabs>
      </div>
    </div>
  )

}

export default Home
