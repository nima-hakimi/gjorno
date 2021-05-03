import React from "react"

const LoginScreen = () => {
  const background = {
    backgroundImage: "url(" + "https://d3rr2gvhjw0wwy.cloudfront.net/uploads/activity_galleries/296628/2000x2000-0-70-045ce64ce7a1ee9ffe45c4acc68a54de.jpg" + ")",
    backgroundsize: 'cover',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundPosition: 'center',
  }
  const rectangle = {
    fontFamily: "Brush Script MT",
    width: '200px',
    height: '200px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-100px 0 0 -100px',
    color: "white",
  }
  return (
    <div style={background}>
      <div class="rectangle" style={rectangle}>
        <h1>GjørNo'</h1>
        <h3>Logg inn</h3>
        <form> 
          <label for="email">E-post:</label><br/>
          <input type="text" id="fname" name="fname" /><br />
          <label for="pword">Passord:</label><br />
          <input type="text" id="lname" name="lname" /><br />
          <input type="submit" value="Logg Inn" />
          <input type="submit" value="Registrer deg" />
        </form>
      </div>
    </div>
  );
}

export default LoginScreen
