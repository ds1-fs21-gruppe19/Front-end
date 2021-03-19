import './Invoice.css';
import React from 'react';

class Invoice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {parameters: "", returnString: ""}
 
      }

    render() {
      return (
        <div className = "Invoice-Slip">
            <div className = "Invoice">

                <div class Name = "HeaderLeft">
                  <h5>Empfangschein</h5>
                </div>

                <div class Name = "HeaderCenter">
                  <h5>Zahlzeil</h5>
                </div>

                <div className = "AddressReceiverRight">
                  <h6>Konto/Zahlbar am</h6>
                  <input Type = "Text" id= "Receiver_IBAN" className ="TextBox_Medium" value = "CH"></input>
                  <br></br>
                  <input Type = "Text" id= "Receiver_Name" className ="TextBox_Medium" value = "Name"></input>
                  <br></br>
                  <input Type = "Text" id= "Receiver_Street" className ="TextBox_Medium" value = "Strasse"></input>
                  <br></br>
                  <input Type = "Text" id= "Receiver_City" className ="TextBox_Medium" value = "PZL/ Stadt"></input>
                </div>

                <div className ="AddressReceiverLeft">
                  <h7>Konto/Zahlbar am</h7>
                  <br></br>
                  <label id = "ReceiverAddress">
                    CH64 3196 1000 0044 2155 7 <br></br>
                    Max Muster<br></br>
                    MusterStrasse 123<br></br>
                    8000 Seldwyla
                  </label>
                </div>

                <div className = "QRCodeView">
                  <img src ="" className = "QrCode"></img>
                </div>

                <div className = "ReferenzRight">
                  <h6>Referenz</h6>
                  <input Type = "Text" id= "Receiver_Ref" className ="TextBox_Medium" value = "Ref"></input>
                </div>

                <div className = "ReferenzLeft">
                  <h7>Referenz</h7>
                  <br></br>
                  <label id = "ReerenzLeft">00 00082 077791 </label>
                </div>

                <div className ="FromAddressLeft">
                  <h7>Zahlbar durch</h7>
                    <br></br>
                    <label id = "FromAddress">
                      Simon Test<br></br>
                      TestStrasse 5<br></br>
                      MeineStrasse55<br></br>
                      7500 West
                    </label>
                </div>

                <div class = "AdditionalInformation">
                  <h6>Zusätzliche Informationen</h6>
                  <br></br>
                  <input Type = "Text" id= "AdditionalInfo" className ="TextBox_Medium" value = "Für den neuen Porsche"></input>
                </div>

                <div class = "FromAddressRight">
                  <h6>Zahlbar durch</h6>
                  <br></br>
                  <input Type = "Text" id= "FromName" className ="TextBox_Medium" value = "Name"></input>
                  <br></br>
                  <input Type = "Text" id= "FromStreet" className ="TextBox_Medium" value = "Street"></input>
                  <br></br>
                  <input Type = "Text" id= "FromCity" className ="TextBox_Medium" value = "City"></input>
                </div>

                <div className = "AmountLeft">
                  <div className = "AmountLeft_ColumnLeft">
                    <h7>Währung</h7>
                    <br></br>
                    <label>CHF</label>
                  </div>
                  <div className = "AmountLeft_ColumnRight">
                    <h7>Betrag</h7>
                    <br></br>
                    <label id = "AmountLeft">50.00</label>
                  </div>
                </div>

                <div className = "AmountRight">
                  <div className = "AmountRight_ColumnLeft">
                    <h6>Währung</h6>
                    <br></br>
                    <label>CHF</label>
                  </div>
                  <div className = "AmountRight_ColumnRight">
                    <h6>Betrag</h6>
                    <br></br>
                    <input Type = "Text" id= "Amount" className ="TextBox_Medium" value = "50.00"></input>
                  </div>
                </div>
            </div>
        </div>
      );
    }


    async getRequest(url)
    {
        let result = await makeRequest("GET", url);
        console.log(result);
    }
  }
  
  
  export default Invoice;

  function makeRequest(method, url) {
      console.log(url);
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.send();
    });
}