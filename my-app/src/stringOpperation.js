class stringOpperation{

    static cleanNumbers(str)
    {
      str = str.replace(/[^(\d + . + ,)]/g, "");
      str = str.replace(/,/g,".");
      return str;
    }

    static StringAddSpace(str, spaceNumber = 4)
    {
      str = str.replace(/ /g, "").toUpperCase();

      let numberOfCharactersInString = str.length;
      let numberOfSubsetsInString = parseInt(numberOfCharactersInString/spaceNumber);

      let formatedIbanStr = "";

      for(let index = 0 ; index < numberOfSubsetsInString; index++)
      {
        formatedIbanStr +=  str.substring(index*spaceNumber, (index+1)*spaceNumber) + " ";
      }

      if((numberOfCharactersInString-(spaceNumber*numberOfSubsetsInString)) === 0)
      {
       formatedIbanStr = formatedIbanStr.substring(0,formatedIbanStr.length-1);
      }
      else
      {
        formatedIbanStr += str.substring(spaceNumber*numberOfSubsetsInString);
      }

      //----Debug----
      //console.log("numberOfCharactersInString: " + numberOfCharactersInString);
      //console.log("numberOfSubsetsInString: " + numberOfSubsetsInString);
      //console.log("formatedIbanStr: " +formatedIbanStr);

      return formatedIbanStr;
    }

    static formatValue(inputStr)
    {       
        if(inputStr.length === 0)
        {
            return "0.00";
        }
        inputStr = inputStr.replace(/ /g, "");
        let partsInString = inputStr.split(/\.|,/g);
        let intergerValue = parseInt(partsInString[0]).toString();

        let splitIndex = 3;

        let numberOfCharactersInString = intergerValue.length;
        let numberOfSubsetsInString = parseInt(numberOfCharactersInString/splitIndex);

        for(let index = 1; index <= numberOfSubsetsInString; index++)
        {
            intergerValue = this.insertChar(intergerValue, numberOfCharactersInString-(index* splitIndex));
        }

        if((numberOfCharactersInString-(splitIndex*numberOfSubsetsInString)) === 0)
        {
            intergerValue = intergerValue.substring(1);
        }

        

        let decValue = "00";
        if(partsInString.length >1)
        {   

            let numb =  "0." + partsInString[1];
            let inputNumber = parseFloat(numb);
            let roundedNumber = inputNumber.toFixed(2);
            decValue = (roundedNumber).toString().substring(2);

            //----Debug----
            //console.log("numb: " + numb);
            //console.log("inputNumber: " + inputNumber);
            //console.log("roundedNumber: " + roundedNumber);
            //console.log("decValue: " + decValue);
        }


        //----Debug----
        //console.log("InsertValue: " + intergerValue);
        //console.log("FormatingString:");
        //console.log(inputStr);
        //console.log("partsInString.lengt: " + partsInString.length);
        inputStr =  intergerValue + "." + decValue;

        return inputStr;
    }


    static insertChar(str, index, char = "'")
    {   
        return str.substring(0, index) + char + str.substring(index, str.length);
    }


    static validateEmail(str)
    {
      let regex1 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      return regex1.test(str);
    }

}

export default stringOpperation;