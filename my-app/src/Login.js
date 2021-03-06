import './Login.css';
import stringOperation from './stringOperation.js';
import React from 'react';
import backendApi from './backendApi';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          password : "",
          email : "",
          validEmail: <img alt="Warnings" hidden></img>,
          isEmailValid: false,
          isPasswordValid: false,
          errorText : <h2 className="errorText"> </h2>
        }

        this.Login = this.Login.bind(this);
        this.emailHasChanged = this.emailHasChanged.bind(this);
        this.passwordHasChanged = this.passwordHasChanged.bind(this);
        this.registerButtonPressed = this.registerButtonPressed.bind(this);
      }

    render() {
      return (
        <div className = "LoginPage">
            
            <div className ="LoginField">
                <div className = "LoginSide">
                  <h1>Willkommen zurück!</h1>
                    <input  className ="TextField" type ="Text" placeholder ="Email" onChange ={this.emailHasChanged}></input>
                    {this.state.validEmail}
                    <br></br>
                    <input className ="TextField" type ="Password" placeholder ="Passwort" onChange = {this.passwordHasChanged}></input>
                    <br></br>
                    <input className ="Btn_Login" type ="Button" value ="Login" onClick={this.Login} readOnly></input>
                    {this.state.errorText}
                </div>
                <div className="VerticalSeparator"><br></br></div>
                <div className ="RegisterSide">
                  <h1>Neu hier?</h1>
                  <h4 className ="RegisterTitle">Mit einem Konto können Sie:</h4>
                  <img src="./Speichern.svg" className = "IconRegister" alt ="ImgNotFound" ></img>
                  <label>Einzelne Teile des Einzahlungsscheins speichern</label>
                  <br></br>
                  <img src="./Herunterladen.svg" className = "IconRegister" alt ="ImgNotFound" ></img>
                  <label>Mehrere Einzahlungsscheine in einem PDF herunterladen</label>
                  <br></br>
                  <input className ="Btn_Register" type ="Button" value ="Registrieren" onClick={this.registerButtonPressed} readOnly></input>
                </div>
            </div>
        </div>
      );
    }

    async Login(e)
    { 
      let response = await backendApi.login(this.state.email,this.state.password);
      let data;
      try
      {
        data = JSON.parse(response.response);
      }
      catch
      {
        console.log(response.response);
      }
      let report = 
      {
        "User" : this.state.email,
        "Data" : data
      };
      if(response.status === 200)
        {
          this.props.reportLogin(report);
          this.setState({errorText : <h2 className="errorText"> </h2>}); 
        }
        else
        {
          this.setState({errorText : <h2 className="errorText">Email oder Passwort falsch!</h2>});
        }
    }

    emailHasChanged(e)
    {
      let str = e.target.value.toLowerCase();
      if(stringOperation.validateEmail(str))
      {
        this.setState({
          email : str,
          isEmailValid: true
        });
        this.setState({validEmail : <img src="./Verified.svg" className = "Login_IconImgs" alt ="ImgNotFound" ></img>});
      }
      else
      {
        this.setState({validEmail : <img src="./Warning.svg" className = "Login_IconImgs" alt ="ImgNotFound" ></img>});
        this.setState({
          isEmailValid: true
        });
      }
    }

    passwordHasChanged(e)
    {
        this.setState({
          password : e.target.value,
          isPasswordValid: true
        });
    }

    registerButtonPressed(e)
    {
      this.props.reportRegisterPressed(e)
    }
 
  }
  
  export default Login;
  