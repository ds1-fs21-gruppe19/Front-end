import './Invoice.css';
import React from 'react';
import backendApi from './backendApi.js';
import stringOpperation from './stringOpperation.js';

class Invoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          creditor_iban: ["CH4000777003656120095", "TextBox_Medium",""],
          creditor_name: ["Tobias Rothlin", "TextBox_Medium",""],
          creditor_address: ["Peterliwiese 33", "TextBox_Medium",""],
          creditor_zip_code: ["8855", "TextBox_Small",""],
          creditor_city: ["Wangen SZ", "TextBox_Small",""],
          creditor_country: ["", "TextBox_Medium",""],
          debtor_name: ["Lukas Rothlin", "TextBox_Medium",""],
          debtor_address: ["Perterliwiese 33", "TextBox_Medium",""],
          debtor_zip_code: ["8855", "TextBox_Small",""],
          debtor_city: ["Wangen SZ", "TextBox_Small",""],
          debtor_country: ["", "TextBox_Medium",""],
          amount: ["100.00", "TextBox_Medium",""],
          currency: ["CHF", "TextBox_Medium",""],
          reference_type: ["", "TextBox_Medium",""],
          reference_number: ["", "TextBox_Medium",""],
          additional_information: ["", "TextBox_Medium",""]
        }
        this.TextInputChange = this.TextInputChange.bind(this);
        this.DownloadClick = this.DownloadClick.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);

        this.IbanTextChange = this.IbanTextChange.bind(this);

        this.AmoutTextChange = this.AmoutTextChange.bind(this);
        this.AmountTextFocusLost = this.AmountTextFocusLost.bind(this);
      }

    render() {
      return (
        <div className = "Invoice-Slip">
            <div className = "Invoice">

                <div className = "HeaderLeft">
                  <h5>Empfangsschein</h5>
                </div>

                <div className = "HeaderCenter">
                  <h5>Zahlteil</h5>
                </div>

                <div className ="CutHorizotalView">
                  <img src="./Cut-Horizontal.svg" className = "CutHorizotal" alt ="ImgNotFlund"></img>
                </div>

                <div className ="CutVerticalView">
                  <img src="./Cut-Vertical.svg" className = "CutVertical" alt ="ImgNotFlund"></img>
                </div>


                <div className = "AddressReceiverRight">
                  <h6>Konto/Zahlbar an</h6>
                  <input type = "Text" id= "creditor_iban" className ={this.state.creditor_iban[1]} value = {this.state.creditor_iban[0]} placeholder ="IBAN Nummer" onChange = {this.IbanTextChange} onBlur = {this.IbanTextChange} ></input><label className = "Error">{this.state.creditor_iban[2]}</label>
                  <br></br>
                  <input type = "Text" id= "creditor_name" className ={this.state.creditor_name[1]} value = {this.state.creditor_name[0]} placeholder ="Vorname Nachname" onChange = {this.TextInputChange}></input><label className = "Error">{this.state.creditor_name[2]}</label>
                  <br></br>
                  <input type = "Text" id= "creditor_address" className ={this.state.creditor_address[1]} value = {this.state.creditor_address[0]} placeholder ="Strasse Nr." onChange = {this.TextInputChange}></input><label className = "Error">{this.state.creditor_address[2]}</label>
                  <br></br>
                  <input type = "Text" id= "creditor_zip_code" className ={this.state.creditor_zip_code[1]} value = {this.state.creditor_zip_code[0]} placeholder ="PLZ" onChange = {this.TextInputChange}></input>
                  <input type = "Text" id= "creditor_city" className ={this.state.creditor_city[1]} value = {this.state.creditor_city[0]} placeholder ="Wohnort" onChange = {this.TextInputChange}></input><label className = "Error">{this.state.creditor_zip_code[2]}</label><label className = "Error">{this.state.creditor_city[2]}</label>
                </div>

                <div className ="AddressReceiverLeft">
                  <h7>Konto/Zahlbar an</h7>
                  <br></br>
                  <label id = "ReceiverAddress">
                    {this.state.creditor_iban[0]} <br></br>
                    {this.state.creditor_name[0]} <br></br>
                    {this.state.creditor_address[0]}<br></br>
                    {this.state.creditor_zip_code[0] + " " + this.state.creditor_city[0]}
                  </label>
                </div>

                <div className = "QRCodeView">
                  <img src ="./qr-code.svg" className = "QrCode" alt ="ImgNotFlund"></img>
                </div>

                <div className = "ReferenzRight">
                  <h6>Referenz</h6>
                  <input type = "Text" id= "reference_number" className ={this.state.reference_number[1]} value = {this.state.reference_number[0]} placeholder ="Referenz Nummer" onChange = {this.TextInputChange}></input><label className = "Error">{this.state.reference_number[2]}</label>
                </div>

                <div className = "ReferenzLeft">
                  <h7>Referenz</h7>
                  <br></br>
                  <label id = "ReerenzLeft">{this.state.reference_number[0]} </label>
                </div>

                <div className ="FromAddressLeft">
                  <h7>Zahlbar durch</h7>
                    <br></br>
                    <label id = "FromAddress">
                    {this.state.debtor_name[0]}<br></br>
                    {this.state.debtor_address[0]}<br></br>
                    {this.state.debtor_zip_code[0] + " " + this.state.debtor_city[0]}<br></br>
                    </label>
                </div>

                <div className = "AdditionalInformation">
                  <h6>Zusätzliche Informationen</h6>
                  <input type = "Text" id= "additional_information" className ={this.state.additional_information[1]} value = {this.state.additional_information[0]} placeholder ="Zusätzliche Infromation" onChange = {this.TextInputChange}></input><label className = "Error">{this.state.additional_information[2]}</label>
                </div>

                <div className = "FromAddressRight">
                  <h6>Zahlbar durch</h6>
                  <input type = "Text" id= "debtor_name" className ={this.state.debtor_name[1]} value = {this.state.debtor_name[0]} placeholder ="Name" onChange = {this.TextInputChange}></input><label className = "Error">{this.state.debtor_name[2]}</label>
                  <br></br>
                  <input type = "Text" id= "debtor_address" className ={this.state.debtor_address[1]} value = {this.state.debtor_address[0]}  placeholder ="Strasse Nr." onChange = {this.TextInputChange}></input><label className = "Error">{this.state.debtor_address[2]}</label>
                  <br></br>
                  <input type = "Text" id= "debtor_zip_code" className ={this.state.debtor_zip_code[1]} value = {this.state.debtor_zip_code[0]} placeholder ="PLZ" onChange = {this.TextInputChange}></input>
                  <input type = "Text" id= "debtor_city" className ={this.state.debtor_city[1]} value = {this.state.debtor_city[0]} placeholder ="Wohnort" onChange = {this.TextInputChange}></input><label className = "Error">{this.state.debtor_zip_code[2]}</label><label className = "Error">{this.state.debtor_city[2]}</label>
                </div>

                <div className = "AmountLeft">
                  <div className = "AmountLeft_ColumnLeft">
                    <h7>Währung</h7>
                    <br></br>
                    <label>{this.state.currency[0]}</label>
                  </div>
                  <div className = "AmountLeft_ColumnRight">
                    <h7>Betrag</h7>
                    <br></br>
                    <label id = "AmountLeft">{this.state.amount[0]}</label>
                  </div>
                </div>

                <div className = "AmountRight">
                  <div className = "AmountRight_ColumnLeft">
                    <h6>Währung</h6>
                    <br></br>
                    <div className = "select">
                      <select className = "DropDown" onChange={this.dropDownChange} >
                        <option value="CHF">CHF</option>
                        <option value="EURO">EURO</option>
                      </select>
                    </div>

                  </div>
                  <div className = "AmountRight_ColumnRight">
                    <h6>Betrag</h6>
                    <br></br>
                    <input type = "Text" id= "amount" className ={this.state.amount[1]} value = {this.state.amount[0]} placeholder ="Betrag" onChange = {this.AmoutTextChange} onBlur ={this.AmountTextFocusLost}></input><label className = "Error">{this.state.amount[2]}</label>
                  </div>
                </div>
            </div>
            <div className = "space"></div>
            <div className = "Controls">
              <div className ="Controls_Title">
                <h2 className = "ControlsTitel_Text">Einstellungen:</h2>
              </div>
              <div className ="EmptySettings"></div>
              <div className = "Controls_DownLoadButton">
                <input type="Button" className ="DownloadButton" value ="Download PDF" onClick ={this.DownloadClick} readOnly></input> 
              </div>
                         
            </div>
        </div>
      );
    }


    TextInputChange(e)
    {  
      let newText = "";
      if(e.target.id.indexOf("zip_code") > -1)
      {
        newText =stringOpperation.cleanNumbers(e.target.value).substring(0,4);
      }
      else
      {
        newText = e.target.value;
      }
      let newValues = [newText, this.state[e.target.id][1], this.state[e.target.id][2]];
      if(e.target.value.length > 0)
      {
        newValues[1] = newValues[1].split(" ")[0] + " valid";
        newValues[2] = "";
      }
      else
      {
        newValues[1] = newValues[1].split(" ")[0] + " invalid";
        newValues[2] = "Dies ist ein Pflichtfeld!";
      }

      this.setState({[e.target.id] : newValues });
    }

    async IbanTextChange(e)
    {
      let formatedIban = stringOpperation.StringAddSpace(e.target.value);
      console.log(formatedIban.length);
      if(formatedIban.length >26)
      {
        formatedIban =formatedIban.substring(0,26);
      }
      let newValues = [formatedIban, this.state[e.target.id][1], this.state[e.target.id][2]];
      if(e.target.value.length >= 25)
      {
        if (stringOpperation.validateIban(e.target.value))
        {  
          newValues[1] = newValues[1].split(" ")[0] + " valid";
          newValues[2] = "";
        }
        else
        {
          newValues[1] = newValues[1].split(" ")[0] + " invalid";
          newValues[2] = "Die Iban ist nicht gültig!";
        }
      }
      this.setState({[e.target.id] : newValues });
    }

    AmountTextFocusLost(e)
    {
      let formatedAmount = stringOpperation.formatValue(e.target.value);
      let newValues = [formatedAmount, this.state[e.target.id][1], this.state[e.target.id][2]];
      this.setState({[e.target.id] : newValues });
    }


    AmoutTextChange(e)
    {
      let formatedAmount = stringOpperation.cleanNumbers(e.target.value);
      let newValues = [formatedAmount, this.state[e.target.id][1], this.state[e.target.id][2]];
      this.setState({[e.target.id] : newValues });
    }


    async DownloadClick(e)
    { 
      let formComplete = true;

      if(this.state.creditor_iban[1].indexOf("valid") === -1)
      {
        let newValues = [this.state.creditor_iban[0], this.state.creditor_iban[1], "Iban nicht gülting"];
        this.setState({creditor_iban : newValues });
        formComplete = false;
        console.log(this.state.creditor_iban[2]);
      }

      if(this.state.creditor_name[0].length === 0)
      {
        let newValues = [this.state.creditor_name[0], this.state.creditor_name[1], "Pflichtfeld!"];
        this.setState({creditor_name : newValues });
        formComplete = false;
      }

      if(this.state.creditor_address[0].length === 0)
      {
        let newValues = [this.state.creditor_address[0], this.state.creditor_address[1], "Pflichtfeld!"];
        this.setState({creditor_address : newValues });
        formComplete = false;
      }

      if(this.state.creditor_zip_code[0].length === 0 && this.state.creditor_city[0].length === 0 )
      {
        let newValues = [this.state.creditor_zip_code[0], this.state.creditor_zip_code[1], "Pflichtfeld!"];
        this.setState({creditor_zip_code : newValues });
        formComplete = false;
      }

      else if(this.state.creditor_city[0].length === 0)
      {
        let newValues = [this.state.creditor_city[0], this.state.creditor_city[1], "Pflichtfeld!"];
        this.setState({creditor_city : newValues });
        formComplete = false;
      }

      else if(this.state.creditor_city[0].length === 0)
      {
        let newValues = [this.state.creditor_city[0], this.state.creditor_city[1], "Pflichtfeld!"];
        this.setState({creditor_city : newValues });
        formComplete = false;
      }

      if(this.state.debtor_name[0].length === 0)
      {
        let newValues = [this.state.debtor_name[0], this.state.debtor_name[1], "Pflichtfeld!"];
        this.setState({debtor_name : newValues });
        formComplete = false;
      }

      if(this.state.debtor_address[0].length === 0)
      {
        let newValues = [this.state.debtor_address[0], this.state.debtor_address[1], "Pflichtfeld!"];
        this.setState({debtor_address : newValues });
        formComplete = false;
      }

      if(this.state.debtor_zip_code[0].length === 0 && this.state.debtor_city[0].length === 0 )
      {
        let newValues = [this.state.debtor_zip_code[0], this.state.debtor_zip_code[1], "Pflichtfeld!"];
        this.setState({debtor_zip_code : newValues });
        formComplete = false;
      }

      else if(this.state.debtor_zip_code[0].length === 0)
      {
        let newValues = [this.state.debtor_zip_code[0], this.state.debtor_zip_code[1], "Pflichtfeld!"];
        this.setState({debtor_zip_code : newValues });
        formComplete = false;
      }

      else if(this.state.debtor_city[0].length === 0)
      {
        let newValues = [this.state.debtor_city[0], this.state.debtor_city[1], "Pflichtfeld!"];
        this.setState({debtor_city : newValues });
        formComplete = false;
      }

      if(this.state.amount[0].length === 0)
      {
        let newValues = [this.state.amount[0], this.state.amount[1], "Pflichtfeld!"];
        this.setState({amount : newValues });
        formComplete = false;
      }

      let ref = "";
      
      if(stringOpperation.isQRIban(this.state.creditor_iban[0]))
      {
        ref = "QRR";
        if(!(this.state.reference_number[0].length === 27 || /^\d+$/.test(this.state.reference_number[0])))
        {
          let newValues = [this.state.reference_number[0], this.state.reference_number[1], "Es gibt einnen Fehler mit der Referenz Nummer"];
          this.setState({reference_number : newValues });
          formComplete = false;
        }
      }
      else if(this.state.reference_number[0].length > 0)
      {
        ref = "SCOR";
        if(!(this.state.reference_number[0].length >= 5 && this.state.reference_number[0].length <= 25))
        {
          let newValues = [this.state.reference_number[0], this.state.reference_number[1], "Es gibt einnen Fehler mit der Referenz Nummer"];
          this.setState({reference_number : newValues });
          formComplete = false;
        }
      }
      else
      {
        ref = "NON";
      }
      
      let newValues = [ref, this.state.reference_type[1], ""];
      this.setState({reference_type : newValues });

      if(formComplete)
      {


        let json = {
          "creditor_iban": this.state.creditor_iban[0],
          "creditor_name": this.state.creditor_name[0],
          "creditor_address": this.state.creditor_address[0],
          "creditor_zip_code": this.state.creditor_zip_code[0],
          "creditor_city": this.state.creditor_city[0],
          "creditor_country": this.state.creditor_iban[0].substring(0,2),
          "debtor_name": this.state.debtor_name[0],
          "debtor_address": this.state.debtor_address[0],
          "debtor_zip_code": this.state.debtor_zip_code[0],
          "debtor_city": this.state.debtor_city[0],
          "debtor_country": this.state.creditor_iban[0].substring(0,2),
          "amount": this.state.amount[0],
          "currency": this.state.currency[0],
          "reference_type": this.state.reference_type[0],
          "reference_number": this.state.reference_number[0],
          "additional_information": this.state.additional_information[0]
        };
        console.log(json);
        let result = await backendApi.getPDF(json);
        
      } 
    }

    dropDownChange(e)
    {
      let newValues = [e.target.value, this.state.currency[1], this.state.currency[2]];
      this.setState({currency : newValues });
    }

    
  }
  
  
  export default Invoice;

