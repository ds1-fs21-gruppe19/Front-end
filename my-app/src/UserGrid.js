import './UserGrid.css';
import React from 'react';
import backendApi from './backendApi';
import stringOperation from './stringOperation';



class UserGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            data : this.props.data,
            newEntree : this.props.newEntree,
            errors : {name : "GirdTextField", address: "GirdTextField", zip_code : "GirdTextField", city : "GirdTextField", country : "GirdTextField", iban : "GirdTextField"},
            errorText : {name : "", address: "", zip_code : "", city : "", country : "", iban : ""}
        }
        this.saveEntree = this.saveEntree.bind(this);
        this.deleteEntree = this.deleteEntree.bind(this);
        this.TextInputChange = this.TextInputChange.bind(this);
        this.IbanChanged = this.IbanChanged.bind(this);
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
          <label className="UserGidLbl">Name:</label><label className = "ErrorTextUserGird">{this.state.errorText.name}</label>
            <input type="Text" className={this.state.errors.name} value ={this.state.data.name} onChange = {this.TextInputChange} id="name" readOnly = {existingEntries}></input>
          </div>
           

          <div className = "UserGridAddress">
          <label className="UserGidLbl">Adresse:</label><label className = "ErrorTextUserGird">{this.state.errorText.address}</label>
            <input type="Text" className={this.state.errors.address} value ={this.state.data.address} onChange = {this.TextInputChange} id= "address" readOnly = {existingEntries}></input>
          </div>

          <div className = "UserGridZipCode">
          <label className="UserGidLbl">PLZ:</label><label className = "ErrorTextUserGird">{this.state.errorText.zip_code}</label>
            <input type="Text" className={this.state.errors.zip_code} value ={this.state.data.zip_code} id = "zip_code" onChange = {this.TextInputChange} readOnly = {existingEntries}></input>
          </div>

          <div className = "UserGridCity">
          <label className="UserGidLbl">Stadt:</label><label className = "ErrorTextUserGird">{this.state.errorText.city}</label>
            <input type="Text" className={this.state.errors.city} value ={this.state.data.city} id = "city" onChange = {this.TextInputChange} readOnly = {existingEntries}></input>
          </div>

          <div className = "UserGridCountry">
          <label className="UserGidLbl">Land:</label><label className = "ErrorTextUserGird">{this.state.errorText.country}</label>
            <input type="Text" className={this.state.errors.country} value ={this.state.data.country} onChange = {this.TextInputChange} id = "country" readOnly = {existingEntries}></input>
          </div>

          <div className = "UserGridIban">
              <label className="UserGidLbl">Iban:</label><label className = "ErrorTextUserGird">{this.state.errorText.iban}</label>
            <input type="Text" className={this.state.errors.iban} value ={this.state.data.iban} id= "iban" onChange = {this.IbanChanged} onBlur= {this.IbanChanged} readOnly = {existingEntries}></input>
          </div>

    
          <div className="UserGridEdit">{editButton}</div>
          <div className ="HorziontalLine"></div>
        </div>
      );
    }

    async saveEntree(e)
    {
        let formComplete = true;

        let listOfErrors = {name : "GirdTextField", address: "GirdTextField", zip_code : "GirdTextField", city : "GirdTextField" , country : "GirdTextField" , iban : "GirdTextField"};
        let listOfErrorText = {name : "", address: "", zip_code : "", city : "" , country : "" , iban : ""};

        if(this.state.data.name.length === 0)
        {
          listOfErrors.name = listOfErrors.name + " error";
          listOfErrorText.name = "ist ein Pflichtfeld";
          formComplete = false
        }

        if(this.state.data.address.length === 0)
        {
          listOfErrors.address = listOfErrors.address + " error";
          listOfErrorText.address = "ist ein Pflichtfeld";
          formComplete = false
        }

        if(this.state.data.zip_code.length === 0)
        {
          listOfErrors.zip_code = listOfErrors.zip_code + " error";
          listOfErrorText.zip_code = "Pflichtfeld";
          formComplete = false
        }

        if(this.state.data.city.length === 0)
        {
          listOfErrors.city = listOfErrors.city + " error";
          listOfErrorText.city = "Pflichtfeld";
          formComplete = false
        }

        if(this.state.data.country.length === 0)
        {
          listOfErrors.country = listOfErrors.country + " error";
          listOfErrorText.country = "ist ein Pflichtfeld";
          formComplete = false
        }

        if(!stringOperation.validateIban(this.state.data.iban))
        {
          listOfErrors.iban = listOfErrors.iban + " error";
          listOfErrorText.iban = "ist ein Pflichtfeld";
          formComplete = false
        }

        this.setState({errors : listOfErrors });
        this.setState({errorText : listOfErrorText });

        if(formComplete)
        {
          console.time("Time For Request:");
          let response = await backendApi.createNewUser( this.state.data, this.props.jwt);
          console.log(response);
          if(response.status === 200)
          {
            this.props.ReloadUsers(e);
          }
          console.timeEnd("Time For Request:");
        }        
    }

    async deleteEntree(e)
    {
      console.time("Time For Request:");
        console.log(this.state.data);
        let response = await backendApi.deleteUser( this.state.data.pk, this.props.jwt);
        console.log(response);
        if(response.length > 0)
        {
          this.props.ReloadUsers(e);
        }
        console.timeEnd("Time For Request:");
    }

    TextInputChange(e) 
    {  
      let newText = "";
      if(e.target.id.indexOf("zip_code") > -1)
      {
        newText =stringOperation.cleanNumbers(e.target.value).substring(0,4);
      }
      else
      {
        newText = e.target.value;
      }

        let newData = this.state.data;
        newData[e.target.id] = newText
        this.setState({data : newData});
    }

    IbanChanged(e)
    {
      let newData = this.state.data;
      let formattedIban =  stringOperation.StringAddSpace(e.target.value);
      if(formattedIban.length >=26)
      {
        formattedIban =formattedIban.substring(0,26);

        let listOfErrors = {name : this.state.errors.name, address: this.state.errors.address, zip_code : this.state.errors.zip_code, city : this.state.errors.city , country : this.state.errors.country , iban : this.state.errors.iban};
        let listOfErrorText = {name : this.state.errorText.name, address: this.state.errorText.address, zip_code : this.state.errorText.zip_code, city : this.state.errorText.city , country : this.state.errorText.country , iban : this.state.errorText.iban};

        if(stringOperation.validateIban(formattedIban))
        {
          listOfErrors.iban = "GirdTextField valid";
          listOfErrorText.iban = "";
        }
        else
        {
          listOfErrors.iban = "GirdTextField error";
          listOfErrorText.iban = "nicht gültig";
        }

        this.setState({errors : listOfErrors });
        this.setState({errorText : listOfErrorText });
      }
      newData[e.target.id] = formattedIban;
      this.setState({data : newData});
    }
 
  }
  
  export default UserGrid;