import './Header.css';
import React from 'react';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginState : false
        }

        this.LoginPressed = this.LoginPressed.bind(this);
        
      }

    render() {
        let loginView;
        const islogedIn = this.props.loginState;
        if(!islogedIn)
        {
            loginView = <input type ="Button" value ="Login" className = "LoginButton" onClick = {this.LoginPressed}></input>;
        }
        else
        {
            let text = "Wilkommen " + this.props.userName;
            console.log(text);
            loginView = <label className = "LblReturningUsers">{text}</label>;
        }
        return (
        
        <div className = "Header">
            <div className ="Header_Titel">
                <img src = "./LogoGross.svg" className ="HeaderLogo" alt={this.props.Titel}></img>
            </div>
            <div className = "Header_LoginButton">
            {loginView}
            </div>
        </div>
      );
    }

    LoginPressed(e)
    {
        this.props.reportLoginPressed();
    }
 
  }
  
  export default Header;
