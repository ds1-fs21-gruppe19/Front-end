import React from 'react';
import './App.css';
import Invoice from './Invoice.js';
import Login from './Login.js';
import Header from './Header.js';
import Footer from './Footer.js';

class App extends React.Component
{ 
  constructor(props) {
    super(props);
    this.state = {
      CurrentPage: <Invoice></Invoice>,
      loginState : false,
      userName : ""
    }
    this.reportLogin = this.reportLogin.bind(this);
    this.reportLoginPressed = this.reportLoginPressed.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header loginState = {this.state.loginState} reportLoginPressed= {this.reportLoginPressed} userName = {this.state.userName}></Header>
        </header>
  
          {this.state.CurrentPage}
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
    this.setState({CurrentPage : <Invoice></Invoice>});
    this.setState({loginState : true});
    this.setState({userName : e});
  }

  reportLoginPressed(e)
  {
    this.setState({CurrentPage : <Login reportLogin = {this.reportLogin}></Login>});
  }
}



export default App;
