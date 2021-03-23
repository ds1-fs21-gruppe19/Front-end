import React from 'react';
import './App.css';
import Invoice from './Invoice.js';

import Login from './Login.js';

class App extends React.Component
{ 
  constructor(props) {
    super(props);
    this.state = {
      CurrentPage: <Invoice></Invoice>,
      loginState : false,
      userName : ""
    }
    this.LoginPressed = this.LoginPressed.bind(this);
    this.reportLogin = this.reportLogin.bind(this);
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
      <div className="App">
        <header className="App-header">
          
        {loginView}
          
        </header>
  
          {this.state.CurrentPage}
      </div>
    );
  }

  LoginPressed(e)
  {
    this.setState({CurrentPage : <Login reportLogin = {this.reportLogin}></Login>});
  }

  reportLogin(e)
  {
    this.setState({CurrentPage : <Invoice></Invoice>});
    this.setState({loginState : true});
    this.setState({userName : e});
  }
}



export default App;
