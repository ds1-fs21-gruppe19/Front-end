import React from 'react';
import './App.css';
import Invoice from './Invoice.js';
import Login from './Login.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Register from './Register.js';

class App extends React.Component
{ 
  constructor(props) {
    super(props);
    this.state = {
      currentPage: <Invoice></Invoice>,
      loginState : false,
      userName : "",
      showLogin : true
    }
    this.reportLogin = this.reportLogin.bind(this);
    this.reportLoginPressed = this.reportLoginPressed.bind(this);
    this.reportRegisterPressed = this.reportRegisterPressed.bind(this);
    this.reportHomePressed = this.reportHomePressed.bind(this);
    this.reportRegister = this.reportRegister.bind(this);
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header showLogin = {this.state.showLogin} loginState = {this.state.loginState} reportLoginPressed= {this.reportLoginPressed}  reportHomePressed = {this.reportHomePressed}  userName = {this.state.userName}></Header>
        </header>
  
          {this.state.currentPage}
        <footer>
          <div className="FooterMain">
            <Footer Titel ="QR_Rechnung"></Footer>
          </div> 
        </footer>
      </div>
    );
  }

  reportLogin(e)
  {
    console.log("User loged In");
    this.setState({currentPage : <Invoice></Invoice>});
    this.setState({loginState : true});
    this.setState({userName : e});
  }

  reportLoginPressed(e)
  {
    this.setState({showLogin : false});
    this.setState({currentPage : <Login reportLogin = {this.reportLogin} reportRegisterPressed = {this.reportRegisterPressed}></Login>});
  }

  reportRegisterPressed(e)
  {
    this.setState({showLogin : false});
    this.setState({currentPage : <Register reportRegister = {this.reportRegister}></Register>});
  }

  reportHomePressed(e)
  {
    if(!this.state.loginState)
    {
      this.setState({showLogin : true});
    }
    this.setState({currentPage : <Invoice></Invoice>});
  }

  reportRegister(e)
  {
    this.setState({showLogin : true});
    this.setState({currentPage : <Invoice></Invoice>});
  }
}



export default App;
