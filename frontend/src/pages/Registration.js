import { createUser } from "../services/userService"
import { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useSessionStorage } from "../services/storageHooks";
import './Design.css';
import { useHistory } from "react-router-dom";

/**
 * 
 * @returns the registeration
 */
const Registration = () => {
  const {register, errors, setError, clearErrors, handleSubmit} = useForm(); //react
  


  
  const [jwt, setJwt] = useSessionStorage("jwt", null)
  const history = useHistory()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const onSubmit = data => {
  postUser(data);
  }

  const postUser = async (data) => {
      const User = {
        username: data.userName,
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password
      }
      try {
        const response = await createUser(User)
        if (response.data === null) {
          setError("userName", {type: "validateUserName", message:"*Brukernavn og mail opptatt*"})
          throw new Error('Nice')
        } else{
          clearErrors("userName")
        }
        setJwt(response.jwt)
        history.push("/login")
      } catch (error) {
      }
      

    }
    const handlePasswordChange = (event) => { //checks
      setPassword(event.target.value)
      if (event.target.value !== confirmPassword){
        console.log("Ulikt")
        setError("password", {type: "validatePassword", message: "*Passordene må være like*"})
        document.getElementById("btn1").disabled = true
  
      } else{
        clearErrors("password")
        console.log("Likt")
        document.getElementById("btn1").disabled = false
      }
    }
    
    const handleConfirmedPasswordChange = (event) => {
      setConfirmPassword(event.target.value)
      if (event.target.value !== password){
        console.log("Ulikt")
        setError("password", {type: "validatePassword", message: "*Passordene må være like*"})
        document.getElementById("btn1").disabled = true
  
      } else{
        clearErrors("password")
        console.log("Likt")
        document.getElementById("btn1").disabled = false
      }
    }
  
  
    return (
      <div className="rectangleRegistration">
        <div className="login">
        <h1>Registrer ny bruker</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="userName" ref={register({
              required: true,
              minLength: 3, maxLength: 20,
              pattern: /^[a-zA-Z0-9]*$/i})}
              placeholder="Brukernavn"/>
            {errors.userName && errors.userName.type === "required" && (<p>*Brukernavn påkrevd*</p>)}
            {errors.userName && errors.userName.type === "pattern" && (<p>*Brukernavn kan bare inneholde stor og liten bokstav og tall*</p>)}
            {errors.userName && errors.userName.type === "minLength" && (<p>*Brukernavn må ha minst 3 tegn*</p>)}
            {errors.userName && errors.userName.type === "maxLength" && (<p>*Brukernavn kan ha maks 20 tegn*</p>)}
            {errors.userName && <p>{errors.userName.message}</p>}
            
           
            <input name="firstName" ref={register({
              required: true,
              pattern: /^[A-Za-z]+$/i  })} 
              placeholder="Fornavn"/>
            {errors.firstName && errors.firstName.type === "required" && (<p>*Fornavn påkrevd*</p>)}
            {errors.firstName && errors.firstName.type === "pattern" && (<p>*Fornavn kan bare inneholde små og store bokstaver*</p>)}
  
            
            <input name="lastName" ref={register({
              required: true,
              pattern: /^[A-Za-z]+$/i })} 
              placeholder="Etternavn"/>
            {errors.lastName && errors.lastName.type === "required" && (<p>*Etternavn påkrevd*</p>)}
            {errors.lastName && errors.lastName.type === "pattern" && (<p>*Etternavn kan bare inneholde små og store bokstaver*</p>)}
  
           
            <input name="email" ref={register({
              required: "*E-mail påkrevd*",
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })} 
              placeholder="E-post"/>
            {errors.email && errors.email.type === "required" && (<p>*E-mail påkrevd*</p>)}
            {errors.email && errors.email.type === "pattern" && (<p>*Vennligst inntast gyldig e-mail*</p>)}
  
            
            <input type="password"
            name="password" onChange = {(event) => handlePasswordChange(event)}
              ref={register({
                required: "*Passord påkrevd*",
                pattern: /^(?=.[a-z])(?=.[A-z])(?=.*[0-9]).{8,}/i })}
                placeholder="Passord"/>
            {errors.password && <p>{errors.password.message}</p>}
            {errors.password && errors.password.type === "pattern" && (<p>*Passord må inneholde en stor og en liten bokstav, et tall og være 8 tegn langt</p>)}
            
            
            <input type="password" onChange = {(event) => handleConfirmedPasswordChange(event)}
            name="cPassword" ref={register({})} 
            placeholder="Bekreft passord"/>
            <button id="btn1" type="submit" >Registrer deg</button>
          </form>
        </div>
      </div>
      )
    
    }
  
  export default Registration;