import './Login.css';
import React from 'react';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          password : "",
          email : ""
        }

        this.SendPassword = this.SendPassword.bind(this);
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
                    <br></br>
                    <input className ="TextField" type ="Password" placeholder ="Password" onChange = {this.passwordHasChanged}></input>
                    <br></br>
                    <input className ="Btn_Login" type ="Button" value ="Login" onClick={this.SendPassword} readOnly></input>
                    
                </div>
            </div>
        </div>
      );
    }

    async SendPassword(e)
    {
        let baseUrl = "https://rothlin.com/TestApp/";
        let url = baseUrl + "login"

        let json = {
          "user_name": this.state.email,
          "MetaData": this.state.password
          }

        let result = await makeRequest("POST", url, json);
        console.log(result);
        this.props.reportLogin(this.state.email);
    }

    emailHasChanged(e)
    {
      var regex1 = /@/;
      var regex2 = /./;
      var result = regex2.test(e.target.value) ;
      console.log(result);
        this.setState({email : e.target.value});
    }

    passwordHasChanged(e)
    {
        this.setState({password : e.target.value});
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