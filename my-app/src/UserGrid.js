import './UserGrid.css';
import React from 'react';
import backendApi from './backendApi';



class UserGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            data : this.props.data,
            newEntree : this.props.newEntree
        }
        this.saveEntree = this.saveEntree.bind(this);
        this.deleteEntree = this.deleteEntree.bind(this);
        this.TextInputChange = this.TextInputChange.bind(this);
      }

    render() {
        let editButton  = <div></div>;
        let existingEntries = true;
        if(this.props.newEntree)
        {
            editButton = <input type="Button" className = "SaveButton" onClick= {this.saveEntree} readOnly value = "Speichern"></input>
            existingEntries = false;
        }
        else
        {
            editButton = <input  type="Button" className = "DeleteButton" onClick= {this.deleteEntree} readOnly value = "Löschen"></input>
        }
      return (
        <div className = "UserGrid">

          <div className = "UserGridName">
          <label className="UserGidLbl">Name:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.name} onChange = {this.TextInputChange} id="name" readOnly = {existingEntries}></input>
          </div>
           

          <div className = "UserGridAddress">
          <label className="UserGidLbl">Adresse:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.address} onChange = {this.TextInputChange} id= "address" readOnly = {existingEntries}></input>
          </div>

          <div className = "UserGridZipCode">
          <label className="UserGidLbl">PLZ:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.zip_code} id = "zip_code" onChange = {this.TextInputChange} readOnly = {existingEntries}></input>
          </div>

          <div className = "UserGridCity">
          <label className="UserGidLbl">Stadt:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.city} id = "city" onChange = {this.TextInputChange} readOnly = {existingEntries}></input>
          </div>

          <div className = "UserGridCountry">
          <label className="UserGidLbl">Land:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.country} onChange = {this.TextInputChange} id = "country" readOnly = {existingEntries}></input>
          </div>

          <div className = "UserGridIban">
              <label className="UserGidLbl">Iban:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.iban} id= "iban" onChange = {this.TextInputChange} readOnly = {existingEntries}></input>
          </div>

    
          <div className="UserGridEdit">{editButton}</div>
          <div className ="HorziontalLine"></div>
        </div>
      );
    }

    async saveEntree(e)
    {
        console.time("Time For Request:");
        let response = await backendApi.createNewUser( this.state.data, this.props.jwt);
        console.log(response);
        if(response.status === 200)
        {
          console.log("Did Work");
          this.props.ReloadUsers(e);
        }
        console.timeEnd("Time For Request:");
        
    }

    async deleteEntree(e)
    {
      console.time("Time For Request:");
        console.log(this.state.data);
        let response = await backendApi.deleteUser( this.state.data.pk, this.props.jwt);
        console.log(response);
        if(response.status === 200)
        {
          console.log("Did Work");
          this.props.ReloadUsers(e);
        }
        console.timeEnd("Time For Request:");
    }

TextInputChange(e) 
    {  
        let newData = this.state.data;
        newData[e.target.id] = e.target.value
        this.setState({data : newData});
    }
 
  }
  
  export default UserGrid;