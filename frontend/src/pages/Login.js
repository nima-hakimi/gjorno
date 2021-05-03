import { loginAsUser } from "./../services/userService"
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useSessionStorage } from "../services/storageHooks";
import './Design.css';

const Login = () => {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()
    const [jwt, setJwt] = useSessionStorage("jwt", null)
    const [user, setUser] = useSessionStorage("user", null)
    
    const loginUser = async (event) => {
      event.preventDefault()
      const User = {
        email: email,
        password: password
      }
      try {
        const response = await loginAsUser(User)
        setJwt(response.jwt)
        setUser(response.user)
        console.log(JSON.stringify(response.user))
        history.push('/Home')
      }
      catch (error) {
      }
    }
  
    return (
      <div>
        <div className="header">
          <div className="logo"></div>
        </div>
        <div className="rectangle">
          <div className="login">
        <h1>Logg inn</h1>
          <form onSubmit = {event => loginUser(event)}>
            <input 
                value = {email}
                onChange = {event => setEmail(event.target.value)}
                placeholder="Brukernavn"
            /><br></br>
            <input type="password"
                value = {password}
                onChange = {event=>setPassword(event.target.value)}
                placeholder="Passord"
            /><br/>
            <button type='submit'>Logg inn</button>
          </form><br></br>Ny bruker?
          <button type='button' onClick={() => history.push("/register")}>Registrer deg her!</button>
        </div>
      </div>
      </div>  
    )
  
  }
  
export default Login