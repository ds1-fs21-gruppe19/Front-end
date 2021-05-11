import './MyAccount.css';
import stringOpperation from './stringOpperation.js';
import React from 'react';
import backendApi from './backendApi';
import UserGrid from './UserGrid.js';


class MyAccount extends React.Component {

    constructor(props) {
        super(props);
        this.loadData();
        this.state = {
          Users: [],
          UsersLoaded : false,
          UsersOnServer: 0
        }

        this.AddUser = this.AddUser.bind(this);
        this.HomePressed = this.HomePressed.bind(this);
      }
    
    async loadData()
    {
      let userdata = await backendApi.getCurrentUsers(this.props.jwttoken);
      console.log(userdata);
      let users;
      try
      {
        users = JSON.parse(userdata);
      }
      catch
      {
        console.log(userdata);
      }
      this.setState({Users : users});
      this.setState({UsersLoaded : true});
      this.setState({UsersOnServer: JSON.parse(userdata).length});

      
      
    }

    render() {
      if (this.state.UsersLoaded)
      {
        let ShowUsers = <table>{this.createTable(this.state.Users.length)}</table>
        
        return (
          <div className = "MyAccountPage">
            <h1>MyAccount</h1>
            {ShowUsers}
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

    createTable = (lenght) => {
      let table = []
  
      // Outer loop to create parent
      for (let i = 0; i < lenght; i++) {
        let children = []
        let isNewEntree = false;
        if(i >= this.state.UsersOnServer)
        {
          isNewEntree = true;
        }
          children.push(
            <td><h1 className="BenutzerTitel">Benutzer {i+1}</h1><UserGrid data = {this.state.Users[i]} newEntree = {isNewEntree} jwttoken = {this.props.jwttoken}></UserGrid></td>
            
            
          );
        
        //Create the parent and add the children
        table.push(<tr>{children}</tr>)
      }
      table.push(<tr><td><input type="Button" className = "AddButtonMyAccount" onClick={this.AddUser} value="Neuer User" ></input></td></tr>)
      table.push(<tr><td><input type="Button" className = "AddButtonMyAccount" onClick={this.HomePressed} value="Zurück" ></input></td></tr>)
      return table
    }
    
    AddUser(e)
    {
      const originalArr = this.state.Users;
      
      const newList = originalArr.concat([{
        "name":"",
        "address": "",
        "zip_code": "",
        "city": "",
        "iban": "",
        "country": ""
      }]);

      this.setState({Users: newList});
    }

    HomePressed(e)
    {
        this.props.reportHomePressed();
    }
 
  }
  
  export default MyAccount;
  