import './Header.css';
import React from 'react';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginState : false
        }

        this.SendPassword = this.SendPassword.bind(this);
        
      }

    render() {
        let loginView;
        const islogedIn = this.state.loginState;
        if(!islogedIn)
        {
            loginView = <input type ="Button" value ="Login" className = "LoginButton" onClick = {this.LoginPressed}></input>;
        }
        else
        {
            let text = "Wilkommen " + this.state.userName;
            console.log(text);
            loginView = <label className = "LblReturningUsers">{text}</label>;
        }
        return (
        
        <div className = "Header">
            <div className ="Header_Titel">
                <h1>QR-Rechnung</h1>
            </div>
            <div className = "Header_LoginButton">
            {loginView}
            </div>
        </div>
      );
    }

    async SendPassword(e)
    {
        
    }
 
  }
  
  export default Header;
