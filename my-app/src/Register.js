import './Register.css';
import stringOperation from './stringOperation.js';
import React from 'react';
import backendApi from './backendApi';


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          name: ["", "TextBox_Half",""], 
          address: ["", "TextBox_Full",""],
          zip_code: ["", "TextBox_Half",""],
          city: ["", "TextBox_Half",""],
          iban: ["", "TextBox_Full",""],
          country: ["", "TextBox_Full",""],
          user_name: ["", "TextBox_Full",""],
          password: ["", "TextBox_Full",""],
        }
        this.Register = this.Register.bind(this);
        this.TextInputChange = this.TextInputChange.bind(this);
        this.IbanTextChange = this.IbanTextChange.bind(this);
        this.emailHasChanged = this.emailHasChanged.bind(this);
      }

    render() {
      return (
        <div className = "RegisterPage">
            <h1>Registrieren</h1>
            <div className = "InputField">

              <div className = "NameField">
              <label className = "TextBoxLbl_Register"> Name</label><label className="Error">{this.state.name[2]}</label><br></br>
              <input type = "Text" id= "name" className ={this.state.name[1]} value = {this.state.name[0]} placeholder ="" onChange = {this.TextInputChange}></input>
              </div>

              <div className = "StreetField">
              <label className = "TextBoxLbl_Register">Strasse Nr.</label><label className="Error">{this.state.address[2]}</label><br></br>
              <input type = "Text" id= "address" className ={this.state.address[1]} value = {this.state.address[0]} placeholder ="" onChange = {this.TextInputChange} ></input>
              </div>

              <div className = "ZIPCodeField">
              <label className = "TextBoxLbl_Register">PLZ</label><label className="Error">{this.state.zip_code[2]}</label><br></br>
              <input type = "Text" id= "zip_code" className ={this.state.zip_code[1]} value = {this.state.zip_code[0]} placeholder ="" onChange = {this.TextInputChange} ></input>
              </div>

              <div className = "CityField">
              <label className = "TextBoxLbl_Register">Stadt</label><label className="Error">{this.state.city[2]}</label><br></br>
              <input type = "Text" id= "city" className ={this.state.city[1]} value = {this.state.city[0]} placeholder ="" onChange = {this.TextInputChange}></input>
              </div>

              <div className = "IBANField">
              <label className = "TextBoxLbl_Register">IBAN</label><label className="Error">{this.state.iban[2]}</label><br></br>
              <input type = "Text" id= "iban" className ={this.state.iban[1]} value = {this.state.iban[0]} placeholder ="" onChange = {this.IbanTextChange} onBlur={this.IbanTextChange} ></input>
              </div>

              <div className = "CountryField">
              <label className = "TextBoxLbl_Register">Land</label><label className="Error">{this.state.country[2]}</label><br></br>
              <input type = "Text" id= "country" className ={this.state.country[1]} value = {this.state.country[0]} placeholder ="" onChange = {this.TextInputChange} ></input>
              </div>

              <div className = "EmailField">
              <label className = "TextBoxLbl_Register">Email</label><label className="Error">{this.state.user_name[2]}</label><br></br>
              <input type = "Text" id= "user_name" className ={this.state.user_name[1]} value = {this.state.user_name[0]} placeholder ="" onChange = {this.emailHasChanged}></input>
              </div>

              <div className = "PasswordField">
              <label className = "TextBoxLbl_Register">Passwort</label><label className="Error">{this.state.password[2]}</label><br></br>
              <input type = "Password" id= "password" className ={this.state.password[1]} value = {this.state.password[0]} onChange = {this.TextInputChange} placeholder =""></input>
              </div>

              <div className = "SubmitField">
              <input className ="Btn_RegisterSubmit" type ="Button" value ="Registrieren" onClick={this.Register} readOnly></input>
              </div>

            </div>
        </div>
      );
    }

    TextInputChange(e)
    {  
      let newText = "";
      if(e.target.id === "zip_code")
      {
        newText =stringOperation.cleanNumbers(e.target.value).substring(0,4);
      }
      else
      {
        newText = e.target.value;
      }
      let newValues = [newText, this.state[e.target.id][1], this.state[e.target.id][2]];
      if(e.target.value.length > 0)
      {
        newValues[1] = "TextBox_Full valid";
        newValues[2] = "";
      }
      else
      {
        newValues[1] = "TextBox_Full error";
        newValues[2] = "ist ein Pflichtfeld!";
      }

      this.setState({[e.target.id] : newValues });
    }

    async IbanTextChange(e)
    {
      let formattedIban = stringOperation.StringAddSpace(e.target.value);
      console.log(formattedIban.length);
      if(formattedIban.length >26)
      {
        formattedIban =formattedIban.substring(0,26);
      }
      let newValues = [formattedIban, this.state[e.target.id][1], this.state[e.target.id][2]];
      if(e.target.value.length >= 25)
      {
        if (stringOperation.validateIban(e.target.value))
        {  
          newValues[1] = "TextBox_Full valid";
          newValues[2] = "";
        }
        else
        {
          newValues[1] = "TextBox_Full error";
          newValues[2] = "ist nicht gültig!";
        }
      }
      this.setState({[e.target.id] : newValues });
    }

    emailHasChanged(e)
    {
      let newValues = [e.target.value, this.state[e.target.id][1], this.state[e.target.id][2]];

      if(stringOperation.validateEmail(e.target.value) )
      {
        newValues[1] = "TextBox_Full valid";
        newValues[2] = "";
      }
      else
      {
        newValues[1] = "TextBox_Full error";
        newValues[2] = "ist nicht gülting";
      }
      this.setState({[e.target.id] : newValues });
    }

    async Register(e)
    { 
      let formComplete = true;
      if(this.state.name[0].length === 0)
      {
        let newValues = [this.state.name[0], this.state.name[1], "ist ein Pflichtfeld!"];
        this.setState({name : newValues });
        formComplete = false;
      }

      if(this.state.address[0].length === 0)
      {
        let newValues = [this.state.address[0], this.state.address[1], "ist ein Pflichtfeld!"];
        this.setState({address : newValues });
        formComplete = false;
      }

      if(this.state.zip_code[0].length === 0)
      {
        let newValues = [this.state.zip_code[0], this.state.zip_code[1], "ist ein Pflichtfeld!"];
        this.setState({zip_code : newValues });
        formComplete = false;
      }


      if(this.state.city[0].length === 0)
      {
        let newValues = [this.state.city[0], this.state.city[1], "ist ein Pflichtfeld!"];
        this.setState({city : newValues });
        formComplete = false;
      }

      if(this.state.country[0].length === 0)
      {
        let newValues = [this.state.country[0], this.state.country[1], "ist ein Pflichtfeld!"];
        this.setState({country : newValues });
        formComplete = false;
      }

      if(this.state.password[0].length === 0)
      {
        let newValues = [this.state.password[0], this.state.password[1], "ist ein Pflichtfeld!"];
        this.setState({password : newValues });
        formComplete = false;
      }
      
      console.log("Iban------");
      console.log(this.state.iban[1]);
      console.log(this.state.iban[1].indexOf("valid"));
      console.log(this.state.iban[1].indexOf("valid") === -1);

      if(this.state.iban[1].indexOf("valid") === -1)
      {
        let newValues = [this.state.iban[0], this.state.iban[1], "ist nicht gültig!"];
        this.setState({iban : newValues });
        formComplete = false;
      }

      if(this.state.user_name[1].indexOf("valid") === -1)
      {
        let newValues = [this.state.user_name[0], this.state.user_name[1], "ist nicht gültig!"];
        this.setState({user_name : newValues });
        formComplete = false;
      }

      console.log("The Form is: "+ formComplete);

      if(formComplete)
      {
        let json = {
          "name" : this.state.name[0],
          "address": this.state.address[0], 
          "zip_code":this.state.zip_code[0], 
          "city":this.state.city[0], 
          "iban":this.state.iban[0],  
          "country": this.state.country[0],
          "user_name": this.state.user_name[0],
          "password": this.state.password[0]
          };
  
        let response = await backendApi.registerNewUser(json);
        if(response.status === 200)
        {
          this.props.reportRegister(e);
        }
        else
        {
          let newValues = [this.state.user_name[0], this.state.user_name[1], "Für diese Email besteht schon ein Login!"];
          this.setState({user_name : newValues });
        }
      }
    }
  }
  
  export default Register;
  