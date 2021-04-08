import './Login.css';
import stringOpperation from './stringOpperation.js';
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
          errorText : <h2 className="errorText"></h2>
        }

        this.Login = this.Login.bind(this);
        this.emailHasChanged = this.emailHasChanged.bind(this);
        this.passwordHasChanged = this.passwordHasChanged.bind(this);
        
      }

    render() {
      return (
        <div className = "LoginPage">
            <h1>Willkommen zurück!</h1>
            <div className ="LoginField">
                <div className = "ElementsInField">
                    <input  className ="TextField" type ="Text" placeholder ="Email" onChange ={this.emailHasChanged}></input>
                    {this.state.validEmail}
                    <br></br>
                    <input className ="TextField" type ="Password" placeholder ="Password" onChange = {this.passwordHasChanged}></input>
                    <br></br>
                    <input className ="Btn_Login" type ="Button" value ="Login" onClick={this.Login} readOnly></input>
                    {this.state.errorText}
                </div>
            </div>
        </div>
      );
    }

    async Login(e)
    {   
      if(this.state.isEmailValid && this.state.isPasswordValid)
        {
          let respone = await backendApi.login(this.state.email,this.state.password);
          this.props.reportLogin(this.state.email);
          this.setState({errorText : <h2 className="errorText"></h2>});
        }
        else
        {
          this.setState({errorText : <h2 className="errorText">Email oder Passwort flasch!</h2>});
        }
    }

    emailHasChanged(e)
    {
      if(stringOpperation.validateEmail(e.target.value))
      {
        this.setState({
          email : e.target.value,
          isEmailValid: true
        });
        this.setState({validEmail : <img src="./Verified.svg" className = "Login_IconImgs" alt ="ImgNotFlund" ></img>});
      }
      else
      {
        this.setState({validEmail : <img src="./Warning.svg" className = "Login_IconImgs" alt ="ImgNotFlund" ></img>});
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
 
  }
  
  export default Login;

  function makeRequest(method, url , json) {
    console.log(url);
    let data = JSON.stringify(json);
  return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
          resolve(xhr.response);
      };
      xhr.send(data);
  });
}