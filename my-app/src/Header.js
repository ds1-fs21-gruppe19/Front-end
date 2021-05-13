import './Header.css';
import React from 'react';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginState : false
        }

        this.LoginPressed = this.LoginPressed.bind(this);
        this.RegisterPressed = this.RegisterPressed.bind(this);
        this.HomePressed = this.HomePressed.bind(this);
        this.EditPressed = this.EditPressed.bind(this);
      }

    render() {
        let loginView;
        let editView;
        const isLoggedIn = this.props.loginState;
        if(!isLoggedIn)
        {
            if(this.props.showLogin)
            {
                loginView = <input type ="Button" value ="Anmelden" className = "LoginButton" onClick = {this.LoginPressed} readOnly></input>;
            }
        }
        else
        {
            let text = "Willkommen " + this.props.userName;
            console.log(text);
            loginView = <label className = "LblReturningUsers">{text}</label>;
            editView = <input type = "Button" value ="Mein Account" className = "EditButton" onClick ={this.EditPressed} readOnly></input>;
        }
        return (
        
        <div className = "Header">
            <div className ="Header_Title">
                <img src = "./LogoGross.svg" className ="HeaderLogo" alt="Logo" onClick = {this.HomePressed}></img>
            </div>
            <div className = "Header_LoginButton">
            {editView}
            {loginView}
            </div>
        </div>
      );
    }

    LoginPressed(e)
    {
        this.props.reportLoginPressed();
    }

    EditPressed(e)
    {
        this.props.reportMyAccountPressed();
    }

    RegisterPressed(e)
    {
        this.props.reportRegisterPressed();
    }

    HomePressed(e)
    {
        this.props.reportHomePressed();
    }
  }
  
  export default Header;
