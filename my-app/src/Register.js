import './Register.css';
import stringOpperation from './stringOpperation.js';
import React from 'react';
import backendApi from './backendApi';


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          Iban_Verified: <img alt="Warnings" hidden></img>,
          first_name: "", 
          last_name: "",
          address: "",
          zip_code: "",
          city: "",
          iban: "",
          country: "",
          user_name: "",
          email_Verified: <img alt="Warnings" hidden></img>,
          password: "",
          EmailUsed: <label className="ErrorEmailUsed"></label>
        }
        this.Register = this.Register.bind(this); 
        this.TextInputChange = this.TextInputChange.bind(this);
        this.IbanTextChange = this.IbanTextChange.bind(this);
        this.IbanTextFocusLost = this.IbanTextFocusLost.bind(this);
        this.emailHasChanged = this.emailHasChanged.bind(this);
      }

    render() {
      return (
        <div className = "RegisterPage">
            <h1>Registrieren</h1>
            <div className = "InputField">

              <div className = "FamilyNameField">
                <label className = "TextBoxLbl_Register" >Vorname</label><br></br>
                <input type = "Text" id= "first_name" className ="TextBox_Half" value = {this.state.first_name} placeholder ="" onChange = {this.TextInputChange} ></input>
              </div>
              
              <div className = "NameField">
              <label className = "TextBoxLbl_Register"> Nachname</label><br></br>
              <input type = "Text" id= "last_name" className ="TextBox_Half" value = {this.state.last_name} placeholder ="" onChange = {this.TextInputChange}></input>
              </div>

              <div className = "StreetField">
              <label className = "TextBoxLbl_Register">Strasse Nr.</label><br></br>
              <input type = "Text" id= "address" className ="TextBox_Full" value = {this.state.address} placeholder ="" onChange = {this.TextInputChange} ></input>
              </div>

              <div className = "ZIPCodeField">
              <label className = "TextBoxLbl_Register">PLZ</label><br></br>
              <input type = "Text" id= "zip_code" className ="TextBox_Half" value = {this.state.zip_code} placeholder ="" onChange = {this.TextInputChange} ></input>
              </div>

              <div className = "CityField">
              <label className = "TextBoxLbl_Register">Stadt</label><br></br>
              <input type = "Text" id= "city" className ="TextBox_Half" value = {this.state.city} placeholder ="" onChange = {this.TextInputChange}></input>
              </div>

              <div className = "IBANField">
              <label className = "TextBoxLbl_Register">IBAN</label><br></br>
              <input type = "Text" id= "iban" className ="TextBox_Full" value = {this.state.iban} placeholder ="" onChange = {this.IbanTextChange} onBlur = {this.IbanTextFocusLost} ></input>
              </div>

              <div className = "CountryField">
              <label className = "TextBoxLbl_Register">Land</label><br></br>
              <input type = "Text" id= "country" className ="TextBox_Full" value = {this.state.country} placeholder ="" onChange = {this.TextInputChange} ></input>
              </div>

              <div className = "EmailField">
              <label className = "TextBoxLbl_Register">Email</label>{this.state.EmailUsed}<br></br>
              <input type = "Text" id= "user_name" className ="TextBox_Full" value = {this.state.user_name} placeholder ="" onChange = {this.emailHasChanged}></input>
              </div>

              <div className = "PasswordField">
              <label className = "TextBoxLbl_Register">Passwort</label><br></br>
              <input type = "Password" id= "password" className ="TextBox_Full" value = {this.state.password} onChange = {this.TextInputChange} placeholder =""></input>
              </div>

              <div className = "SubmitField">
              <input className ="Btn_RegisterSubmit" type ="Button" value ="Registrieren" onClick={this.Register} readOnly></input>
              </div>
              
              {this.state.Iban_Verified}
              {this.state.email_Verified}

            </div>
            
            
        </div>
      );
    }

    TextInputChange(e)
    {  
      this.setState({[e.target.id] : e.target.value});
    }

    IbanTextChange(e)
    {
      let formatedIban = stringOpperation.StringAddSpace(e.target.value);
      console.log(formatedIban.length);
      if(formatedIban.length >26)
      {
        formatedIban =formatedIban.substring(0,26);
      }
      this.setState({[e.target.id] : formatedIban});
      if(e.target.value.length >= 25)
      {
        this.IbanTextFocusLost(e);
      }
    }

    async IbanTextFocusLost(e)
    { 
      if(await backendApi.validateIban(e.target.value))
      {  
        this.setState({Iban_Verified : <img src="./Verified.svg" className = "IbanVerification" alt ="ImgNotFlund" ></img>});
      }
      else
      {
        this.setState({Iban_Verified : <img src="./Warning.svg" className = "IbanVerification" alt ="ImgNotFlund"></img>});
      }
    }

    emailHasChanged(e)
    {
      this.setState({user_name : e.target.value});

      if(stringOpperation.validateEmail(e.target.value))
      {
        this.setState({
          isEmailValid: true
        });
        this.setState({email_Verified : <img src="./Verified.svg" className = "EmailVerification" alt ="ImgNotFlund" ></img>});
      }
      else
      {
        this.setState({email_Verified : <img src="./Warning.svg" className = "EmailVerification" alt ="ImgNotFlund" ></img>});
        this.setState({
          isEmailValid: true
        });
      }
    }

    async Register(e)
    { 
      let json = {
        "first_name" : this.state.first_name ,
        "last_name": this.state.last_name, 
        "address": this.state.address, 
        "zip_code":this.state.zip_code, 
        "city":this.state.city, 
        "iban":this.state.iban,  
        "country": this.state.country,
        "user_name": this.state.user_name,
        "password": this.state.password
        };

      let respone = await backendApi.registerNewUser(json);
      if(respone.status === 200)
      {
        this.props.reportRegister(e);
      }
      else
      {
        this.setState({EmailUsed : <label className="ErrorEmailUsed">Für diese Adresse gibt es bereits ein Login</label>});
      }
      
    }
  }
  
  export default Register;
  