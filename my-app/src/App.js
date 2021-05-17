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
      jwt: "",
      expirationTime : 0,
      userName : "",
      showLogin : true,
      users:[],
      firstRefresh: true
    }
    
    this.reportLogin = this.reportLogin.bind(this);
    this.reportLoginPressed = this.reportLoginPressed.bind(this);
    this.reportRegisterPressed = this.reportRegisterPressed.bind(this);
    this.reportHomePressed = this.reportHomePressed.bind(this);
    this.reportRegister = this.reportRegister.bind(this);
    this.reportMyAccountPressed = this.reportMyAccountPressed.bind(this);
    }

    refreshToken = async() => {
      let refresh = this.state.firstRefresh;

      if(!refresh)
      {
        let newToken = await backendApi.refreshLogin();
        this.setState({jwt : newToken});
      }
      else
      {
        console.log("%c First Refresh","color: Green");
      }

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
            <Footer></Footer>
          </div> 
        </footer>
      </div>
    );
  }

  async reportLogin(e)
  {
    
    this.setState({loginState : true});
    this.setState({userName : e.User});
    this.setState({jwt : e.Data.token});
    this.setState({expirationTime : e.Data.expiration_secs});
    let refreshInterval = (e.Data.expiration_secs-100)*1000;
    this.refreshToken();
    setInterval(this.refreshToken, refreshInterval);
    let userData = await backendApi.getCurrentUsers(this.state.jwt);
    console.log(userData);
    this.setState({users : JSON.parse(userData)});
    this.setState({currentPage : <Invoice userData = {this.state.users}></Invoice>});
    this.setState({firstRefresh: false});
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

  async reportHomePressed(e)
  {
    if(!this.state.loginState)
    {
      this.setState({showLogin : true});
      this.setState({currentPage : <Invoice></Invoice>});
    }
    else
    {
      let userData = await backendApi.getCurrentUsers(this.state.jwt);
      let users;
      try
      {
        users = JSON.parse(userData);
      }
      catch
      {
        window.location.reload();
      }
      this.setState({users : users});
      this.setState({currentPage : <Invoice userData = {this.state.users}></Invoice>});
    }
    
  }

  reportRegister(e)
  {
    this.setState({showLogin : true});
    this.setState({currentPage : <Invoice userData = {this.state.users}></Invoice>});
  }

  reportMyAccountPressed(e)
  {
    this.setState({currentPage : <MyAccount jwt = {this.state.jwt} reportHomePressed = {this.reportHomePressed}></MyAccount>});
  }
}



export default App;
