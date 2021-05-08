import React from 'react';
import './App.css';
import Invoice from './Invoice.js';
import Login from './Login.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Register from './Register.js';
import MyAccount from './MyAccount.js';
import backendApi from './backendApi';

class App extends React.Component
{ 
  constructor(props) {
    super(props);
    this.state = {
      currentPage: <Invoice></Invoice>,
      loginState : false,
      jwttoken: "",
      experationTime : 0,
      userName : "",
      showLogin : true,
      Users:[]
    }
    this.reportLogin = this.reportLogin.bind(this);
    this.reportLoginPressed = this.reportLoginPressed.bind(this);
    this.reportRegisterPressed = this.reportRegisterPressed.bind(this);
    this.reportHomePressed = this.reportHomePressed.bind(this);
    this.reportRegister = this.reportRegister.bind(this);
    this.reportMyAccountPressed = this.reportMyAccountPressed.bind(this);
    }


    refreshToken= () => {
      console.log("Refreshing Login");
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header showLogin = {this.state.showLogin} loginState = {this.state.loginState} reportLoginPressed= {this.reportLoginPressed}  reportHomePressed = {this.reportHomePressed} reportMyAccountPressed = {this.reportMyAccountPressed}  userName = {this.state.userName}></Header>
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

  async reportLogin(e)
  {
    
    this.setState({loginState : true});
    this.setState({userName : e.User});
    this.setState({jwttoken : e.Data.token});
    this.setState({experationTime : e.Data.expiration_secs});
    let refreshIntervall = (e.Data.expiration_secs-100)*1000;
    this.refreshToken();
    setInterval(this.refreshToken, refreshIntervall);
    let userdata = await backendApi.getCurrentUsers(this.props.jwttoken);
    console.log(userdata);
    this.setState({Users : JSON.parse(userdata)});
    this.setState({currentPage : <Invoice userdata = {this.state.Users}></Invoice>});
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
    this.setState({currentPage : <Invoice userdata = {this.state.Users}></Invoice>});
  }

  reportRegister(e)
  {
    this.setState({showLogin : true});
    this.setState({currentPage : <Invoice userdata = {this.state.Users}></Invoice>});
  }

  reportMyAccountPressed(e)
  {
    this.setState({currentPage : <MyAccount jwttoken = {this.state.jwttoken} reportHomePressed = {this.reportHomePressed}></MyAccount>});
  }
}



export default App;
