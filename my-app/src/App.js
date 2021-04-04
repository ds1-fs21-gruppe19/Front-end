import React from 'react';
import './App.css';
import Invoice from './Invoice.js';
import Login from './Login.js';
import Header from './Header.js';

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
    return (
      <div className="App">
        <header className="App-header">
          <Header loginState = {this.state.loginState}></Header>
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
