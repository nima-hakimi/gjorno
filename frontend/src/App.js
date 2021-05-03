import { useState } from 'react'
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home"
import MyProfile from "./pages/MyProfile"
import Start from "./pages/Start"
import CreateActivity from "./pages/CreateActivity"
import "./pages/Design.css"
import ActivityPage from './pages/ActivityPage';
import CreateOrganization from "./pages/CreateOrganization";
import DisplayOrganizedActivity from "./pages/DisplayOrganizedActivity"
import ActivityChoicePage from './pages/ActivityChoicePage';
import CreateOrganizedActivity from './pages/CreateOrganizedActivity';
import OrganizationProfile from './pages/OrganizationProfile'


const App = () => {

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/createorganization">
            <CreateOrganization />
          </Route>
          <Route path="/organizationprofile">
            <OrganizationProfile />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/createactivity">
            <CreateActivity />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
          </Route>
          <Route path="/activitypage">
            <ActivityPage />
          </Route>
          <Route path="/organized-activities/:id">
            <DisplayOrganizedActivity />
          </Route>
          <Route path="/activitychoicepage"> 
            <ActivityChoicePage/>
          </Route>
          <Route path="/createorganizedactivity"> 
            <CreateOrganizedActivity/>
          </Route>
          <Route path="/"> 
            <Start/>
          </Route>
        </Switch>
      </Router>

    </div>
  )

}

export default App