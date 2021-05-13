import './Footer.css';
import React from 'react';


class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            additionalInfo : <div></div>,
            infoState: "non",
            legalButtonText :"Legal Stuff",
            privacyButtonText :"Privacy Policy"
        }
        this.LegalButtonPressed = this.LegalButtonPressed.bind(this);
        this.PrivacyButtonPressed = this.PrivacyButtonPressed.bind(this);
      }
    
     
    render() {
        
        return (
        
        <div className = "Footer">
            <hr></hr>
            <img src = "./LogoGross.svg" className ="Logo" alt="Logo"></img>
            <h1 className ="Copyright">Copyright © 2021 Robin Friedli, Linard Vincenz, Tobias Rothlin</h1>
            {this.state.additionalInfo}
            <input type="Button" value ={this.state.legalButtonText} className="LinkButton" onClick={this.LegalButtonPressed} readOnly></input>
            <input type="Button" value ={this.state.privacyButtonText} className="LinkButton" onClick={this.PrivacyButtonPressed} readOnly></input>
        </div>
      );
    }

    LegalButtonPressed(e)
    {   
        if(this.state.infoState !== "Legal")
        {
            this.setState({additionalInfo :
                <h2 className="AdditionalInfoText">© 2021 Robin Friedli, Linard Vincenz, Tobias Rothlin. All rights reserved. Use of this site constitutes acceptance of our User Agreement and Privacy Policy and Cookie Statement. This site may earn a portion of sales from products that are purchased through our site as part of our Affiliate Partnerships with retailers. The material on this site may not be reproduced, distributed, transmitted, cached or otherwise used, except with the prior written permission of Robin Friedli, Linard Vincenz or Tobias Rothlin. Ad Choices</h2>
            });
            this.setState({
                infoState : "Legal",
                legalButtonText:"Close Legal",
                privacyButtonText:"Privacy Policy"
            });
        }
        else
        {
            this.setState({additionalInfo : <div></div>});
            this.setState({
                infoState : "non",
                legalButtonText:"Legal Stuff",
                privacyButtonText:"Privacy Policy"
            });
        }
        
    }

    PrivacyButtonPressed(e)
    {
        if(this.state.infoState !== "Privacy")
        {
            this.setState({additionalInfo :
                <h2 className="AdditionalInfoText">Currently no privacy on this page</h2>
            });
            this.setState({
                infoState : "Privacy",
                legalButtonText:"Legal Stuff",
                privacyButtonText:"Close Privacy"
            });
        }
        else
        {
            this.setState({additionalInfo : <div></div>});
            this.setState({
                infoState : "non",
                legalButtonText:"Legal Stuff",
                privacyButtonText:"Privacy Policy"
            });
        }
    }

  }
  
  export default Footer;
