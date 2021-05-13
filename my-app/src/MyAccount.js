import './MyAccount.css';
import React from 'react';
import backendApi from './backendApi';
import UserGrid from './UserGrid.js';


class MyAccount extends React.Component {

    constructor(props) {
        super(props);
        this.loadData();
        this.state = {
          users: [],
          usersLoaded : false,
          usersOnServer: 0
        }

        this.AddUser = this.AddUser.bind(this);
        this.HomePressed = this.HomePressed.bind(this);
        this.ReloadUsers = this.ReloadUsers.bind(this);
      }
    
    async loadData()
    {
      let userData = await backendApi.getCurrentUsers(this.props.jwt);
      console.log(userData);
      let users;
      try
      {
        users = JSON.parse(userData);
      }
      catch
      {
        console.log(userData);
      }
      this.setState({users : users});
      this.setState({usersLoaded : true});
      this.setState({usersOnServer: JSON.parse(userData).length});

      
      
    }

    ReloadUsers(e)
    {
      this.loadData();
    }

    render() {
      if (this.state.usersLoaded)
      {
        let showUsers = <table>{this.createTable(this.state.users.length)}</table>
        
        return (
          <div className = "MyAccountPage">
            <h1>MyAccount</h1>
            {showUsers}
          </div>
        );
      }
      else
      {
        return (
          <div className = "MyAccountPage">
            <h1>MyAccount</h1>
            <h2>Loading User Data</h2>
          </div>
        );
      }
      
    }

    createTable = (length) => {
      let table = []
  
      // Outer loop to create parent
      for (let i = 0; i < length; i++) {
        let children = []
        let isNewEntree = false;
        if(i >= this.state.usersOnServer)
        {
          isNewEntree = true;
        }
          children.push(
            <td><h1 className="BenutzerTitle">Benutzer {i+1}</h1><UserGrid data = {this.state.users[i]} newEntree = {isNewEntree} jwt = {this.props.jwt} ReloadUsers = {this.ReloadUsers}></UserGrid></td>
            
            
          );
        
        //Create the parent and add the children
        table.push(<tr>{children}</tr>)
      }
      table.push(<tr><td><input type="Button" className = "AddButtonMyAccount" onClick={this.AddUser} value="Neuer User" readOnly></input></td></tr>)
      table.push(<tr><td><input type="Button" className = "AddButtonMyAccount" onClick={this.HomePressed} value="Zurück" readOnly></input></td></tr>)
      return table
    }
    
    AddUser(e)
    {
      const originalArr = this.state.users;
      
      const newList = originalArr.concat([{
        "name":"",
        "address": "",
        "zip_code": "",
        "city": "",
        "iban": "",
        "country": ""
      }]);

      this.setState({users: newList});
    }

    HomePressed(e)
    {
        this.props.reportHomePressed();
    }
 
  }
  
  export default MyAccount;
  