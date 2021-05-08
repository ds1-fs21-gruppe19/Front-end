import './UserGrid.css';
import React from 'react';
import backendApi from './backendApi';



class UserGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            data : this.props.data
        }
        this.saveEntree = this.saveEntree.bind(this);
        this.deleteEntree = this.deleteEntree.bind(this);
        this.TextInputChange = this.TextInputChange.bind(this);
      }

    render() {
        let EditButton  = <div></div>;
        let existingEntrie = true;
        if(this.props.newEntree)
        {
            EditButton = <input type="Button" className = "SaveButton" onClick= {this.saveEntree} value = "Speichern"></input>
            existingEntrie = false;
        }
        else
        {
            EditButton = <input  type="Button" className = "DeleteButton" onClick= {this.deleteEntree} value = "Löschen"></input>
        }
      return (
        <div className = "UserGrid">

          <div className = "UserGridName">
          <label className="UserGidLbl">Name:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.name} onChange = {this.TextInputChange} id="name" readOnly = {existingEntrie}></input>
          </div>
           

          <div className = "UserGridAddress">
          <label className="UserGidLbl">Adresse:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.address} onChange = {this.TextInputChange} id= "address" readOnly = {existingEntrie}></input>
          </div>

          <div className = "UserGridZipCode">
          <label className="UserGidLbl">PLZ:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.zip_code} id = "zip_code" onChange = {this.TextInputChange} readOnly = {existingEntrie}></input>
          </div>

          <div className = "UserGridCity">
          <label className="UserGidLbl">Stadt:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.city} id = "city" onChange = {this.TextInputChange} readOnly = {existingEntrie}></input>
          </div>

          <div className = "UserGridCountry">
          <label className="UserGidLbl">Land:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.country} onChange = {this.TextInputChange} id = "country" readOnly = {existingEntrie}></input>
          </div>

          <div className = "UserGridIban">
              <label className="UserGidLbl">Iban:</label>
            <input type="Text" className="GirdTextField" value ={this.state.data.iban} id= "iban" onChange = {this.TextInputChange} readOnly = {existingEntrie}></input>
          </div>

    
          <div className="UserGridEdit">{EditButton}</div>
          <div className ="HorziontalLine"></div>
        </div>
      );
    }

    async saveEntree(e)
    {

        let response = await backendApi.createNewUser( this.state.data, this.props.jwttoken);
        console.log(response);
    }

    async deleteEntree(e)
    {
        console.log(this.state.data);
        let response = await backendApi.deleteUser( this.state.data.pk, this.props.jwttoken);
        console.log(response);
    }

TextInputChange(e) 
    {  
        let newData = this.state.data;
        newData[e.target.id] = e.target.value
        this.setState({data : newData});
    }
 
  }
  
  export default UserGrid;