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

    SendPassword(e)
    {
        console.log(this.state);
        this.props.reportLogin("Tobias Rothlin");
    }

    emailHasChanged(e)
    {
        this.setState({email : e.target.value});
    }

    passwordHasChanged(e)
    {
        this.setState({password : e.target.value});
    }
 
  }
  
  
  export default Login;