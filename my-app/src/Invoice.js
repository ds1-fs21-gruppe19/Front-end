import './Invoice.css';
import React from 'react';
import backendApi from './backendApi.js';
import stringOpperation from './stringOpperation.js';

class Invoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          Receiver_IBAN: "", 
          Iban_Verified: <img alt="Warnings" hidden></img>,
          Receiver_Name: "", 
          Receiver_Name_Verified: <img alt="Warnings" hidden></img>,
          Receiver_Street: "", 
          Receiver_StreetVerified: <img alt="Warnings" hidden></img>,
          Receiver_City:"", 
          Receiver_City_Verified: <img alt="Warnings" hidden></img>,
          Receiver_Ref:"", 
          Receiver_Ref_Verified: <img alt="Warnings" hidden></img>,
          AdditionalInfo:"",  
          FromName: "",
          FromName_Verified: <img alt="Warnings" hidden></img>,
          FromStreet: "",
          FromStreet_Verified: <img alt="Warnings" hidden></img>,
          FromCity: "",
          FromCity_Verified: <img alt="Warnings" hidden></img>,
          Amount: "",
          Amount_Verified: <img alt="Warnings" hidden></img>,
          Currency: "CHF"
        }
        this.TextInputChange = this.TextInputChange.bind(this);
        this.DowndLoadClick = this.DowndLoadClick.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);

        this.IbanTextChange = this.IbanTextChange.bind(this);
        this.IbanTextFocusLost = this.IbanTextFocusLost.bind(this);

        this.AmoutTextChange = this.AmoutTextChange.bind(this);
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
                  <input type = "Text" id= "Receiver_IBAN" className ="TextBox_Medium" value = {this.state.Receiver_IBAN} placeholder ="IBAN Nummer" onChange = {this.IbanTextChange} onBlur = {this.IbanTextFocusLost} ></input> {this.state.Iban_Verified}
                  <br></br>
                  <input type = "Text" id= "Receiver_Name" className ="TextBox_Medium" value = {this.state.Receiver_Name} placeholder ="Name" onChange = {this.TextInputChange}></input>{this.state.Receiver_Name_Verified}
                  <br></br>
                  <input type = "Text" id= "Receiver_Street" className ="TextBox_Medium" value = {this.state.Receiver_Street} placeholder ="Strasse Nr." onChange = {this.TextInputChange}></input>{this.state.Receiver_Street_Verified}
                  <br></br>
                  <input type = "Text" id= "Receiver_City" className ="TextBox_Medium" value = {this.state.Receiver_City} placeholder ="PLZ Wohnort" onChange = {this.TextInputChange}></input>{this.state.Receiver_City_Verified}
                </div>

                <div className ="AddressReceiverLeft">
                  <h7>Konto/Zahlbar an</h7>
                  <br></br>
                  <label id = "ReceiverAddress">
                    {this.state.Receiver_IBAN} <br></br>
                    {this.state.Receiver_Name} <br></br>
                    {this.state.Receiver_Street}<br></br>
                    {this.state.Receiver_City}
                  </label>
                </div>

                <div className = "QRCodeView">
                  <img src ="./qr-code.svg" className = "QrCode" alt ="ImgNotFlund"></img>
                </div>

                <div className = "ReferenzRight">
                  <h6>Referenz</h6>
                  <input type = "Text" id= "Receiver_Ref" className ="TextBox_Medium" value = {this.state.Receiver_Ref} placeholder ="Referenz Nummer" onChange = {this.TextInputChange}></input>{this.state.Receiver_Ref_Verified}
                </div>

                <div className = "ReferenzLeft">
                  <h7>Referenz</h7>
                  <br></br>
                  <label id = "ReerenzLeft">{this.state.Receiver_Ref} </label>
                </div>

                <div className ="FromAddressLeft">
                  <h7>Zahlbar durch</h7>
                    <br></br>
                    <label id = "FromAddress">
                    {this.state.FromName}<br></br>
                    {this.state.FromStreet}<br></br>
                    {this.state.FromCity}<br></br>
                    </label>
                </div>

                <div className = "AdditionalInformation">
                  <h6>Zusätzliche Informationen</h6>
                  <input type = "Text" id= "AdditionalInfo" className ="TextBox_Medium" value = {this.state.AdditionalInfo} placeholder ="Zusätzliche Infromation" onChange = {this.TextInputChange}></input>
                </div>

                <div className = "FromAddressRight">
                  <h6>Zahlbar durch</h6>
                  <input type = "Text" id= "FromName" className ="TextBox_Medium" value = {this.state.FromName} placeholder ="Name" onChange = {this.TextInputChange}></input>{this.state.FromName_Verified}
                  <br></br>
                  <input type = "Text" id= "FromStreet" className ="TextBox_Medium" value = {this.state.FromStreet}  placeholder ="Strasse Nr." onChange = {this.TextInputChange}></input>{this.state.FromStreet_Verified}
                  <br></br>
                  <input type = "Text" id= "FromCity" className ="TextBox_Medium" value = {this.state.FromCity} placeholder ="PLZ Wohnort" onChange = {this.TextInputChange}></input>{this.state.FromCity_Verified}
                </div>

                <div className = "AmountLeft">
                  <div className = "AmountLeft_ColumnLeft">
                    <h7>Währung</h7>
                    <br></br>
                    <label>{this.state.Currency}</label>
                  </div>
                  <div className = "AmountLeft_ColumnRight">
                    <h7>Betrag</h7>
                    <br></br>
                    <label id = "AmountLeft">{this.state.Amount}</label>
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
                    <input type = "Text" id= "Amount" className ="TextBox_Medium" value = {this.state.Amount} placeholder ="Betrag" onChange = {this.AmoutTextChange}></input>{this.state.Amount_Verified}
                  </div>
                </div>
            </div>
            <div className = "Controls">
              <h4>Einstellungen:</h4>
              <input type="Button" className ="DownloadButton" value ="Download PDF" onClick ={this.DowndLoadClick} readOnly></input>            
            </div>
        </div>
      );
    }


    async GetPDF()
    { 
        let url = "https://rothlin.com/TestApp/"
        
        let json = {
          "InvoiceInfo":{
            "Receiver_IBAN" : this.state.Receiver_IBAN,
            "Receiver_Name": this.state.Receiver_Name, 
            "Receiver_Street": this.state.Receiver_Street, 
            "Receiver_City":this.state.Receiver_City, 
            "Receiver_Ref":this.state.Receiver_Ref, 
            "AdditionalInfo":this.state.AdditionalInfo,  
            "FromName": this.state.FromName,
            "FromStreet": this.state.FromStreet,
            "FromCity": this.state.FromCity,
            "Amount": this.state.Amount
          },
          "MetaData": {
            "NumberOfPages" : 1
          }
          }

        let result = await backendApi.PostRequest( url, json);
        console.log(result);
    }

    TextInputChange(e)
    {  
      this.setState({[e.target.id] : e.target.value});
    }

    IbanTextChange(e)
    {
      let formatedIban = stringOpperation.StringAddSpace(e.target.value);
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
        this.setState({Iban_Verified : <img src="./Verified.svg" className = "IconImgs" alt ="ImgNotFlund" ></img>});
      }
      else
      {
        this.setState({Iban_Verified : <img src="./Warning.svg" className = "IconImgs" alt ="ImgNotFlund"></img>});
      }
    }


    AmoutTextChange(e)
    {
      let formatedAmount = stringOpperation.cleanNumbers(e.target.value);
      this.setState({[e.target.id] : formatedAmount});
    }




    

    DowndLoadClick(e)
    {
      console.log("Download Button Pressed")
      this.GetPDF();
    }

    dropDownChange(e)
    {
      this.setState({Currency : e.target.value});
    }

    
  }
  
  
  export default Invoice;

