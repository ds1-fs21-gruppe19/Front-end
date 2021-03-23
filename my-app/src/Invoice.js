import './Invoice.css';
import React from 'react';

class Invoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          Receiver_IBAN: "", 
          Receiver_Name: "", 
          Receiver_Street: "", 
          Receiver_City:"", 
          Receiver_Ref:"", 
          AdditionalInfo:"",  
          FromName: "",
          FromStreet: "",
          FromCity: "",
          Amount: "",
          Currency: "CHF"
        }
        this.TextInputChange = this.TextInputChange.bind(this);
        this.DowndLoadClick = this.DowndLoadClick.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);
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
                  <h6>Konto/Zahlbar am</h6>
                  <input type = "Text" id= "Receiver_IBAN" className ="TextBox_Medium" value = {this.state.Receiver_IBAN} placeholder ="IBAN Nummer" onChange = {this.TextInputChange}></input>
                  <br></br>
                  <input type = "Text" id= "Receiver_Name" className ="TextBox_Medium" value = {this.state.Receiver_Name} placeholder ="Name" onChange = {this.TextInputChange}></input>
                  <br></br>
                  <input type = "Text" id= "Receiver_Street" className ="TextBox_Medium" value = {this.state.Receiver_Street} placeholder ="Strasse Nr." onChange = {this.TextInputChange}></input>
                  <br></br>
                  <input type = "Text" id= "Receiver_City" className ="TextBox_Medium" value = {this.state.Receiver_City} placeholder ="PLZ Wohnort" onChange = {this.TextInputChange}></input>
                </div>

                <div className ="AddressReceiverLeft">
                  <h7>Konto/Zahlbar am</h7>
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
                  <input type = "Text" id= "Receiver_Ref" className ="TextBox_Medium" value = {this.state.Receiver_Ref} placeholder ="Referenz Nummer" onChange = {this.TextInputChange}></input>
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
                  <input type = "Text" id= "FromName" className ="TextBox_Medium" value = {this.state.FromName} placeholder ="Name" onChange = {this.TextInputChange}></input>
                  <br></br>
                  <input type = "Text" id= "FromStreet" className ="TextBox_Medium" value = {this.state.FromStreet}  placeholder ="Strasse Nr." onChange = {this.TextInputChange}></input>
                  <br></br>
                  <input type = "Text" id= "FromCity" className ="TextBox_Medium" value = {this.state.FromCity} placeholder ="PLZ Wohnort" onChange = {this.TextInputChange}></input>
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
                    <input type = "Text" id= "Amount" className ="TextBox_Medium" value = {this.state.Amount} placeholder ="Betrag" onChange = {this.TextInputChange}></input>
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

        let result = await makeRequest("POST", url, json);
        console.log(result);
    }

    TextInputChange(e)
    { 
      this.setState({[e.target.id] : e.target.value});
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

  function makeRequest(method, url , json) {
      console.log(url);
      let data = JSON.stringify(json);
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.send(data);
    });
}