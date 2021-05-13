class stringOperation{

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

      let formattedIbanStr = "";

      for(let index = 0 ; index < numberOfSubsetsInString; index++)
      {
        formattedIbanStr +=  str.substring(index*spaceNumber, (index+1)*spaceNumber) + " ";
      }

      if((numberOfCharactersInString-(spaceNumber*numberOfSubsetsInString)) === 0)
      {
       formattedIbanStr = formattedIbanStr.substring(0,formattedIbanStr.length-1);
      }
      else
      {
        formattedIbanStr += str.substring(spaceNumber*numberOfSubsetsInString);
      }
      return formattedIbanStr;
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
      let regex1 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:|\\)*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:|\\)+)\])/;
      return regex1.test(str);
    }

    static isQRIban(str)
    {
      let id = parseInt(str.replace(/( )|(\D)/g, "").substring(2,7));
      console.log(id);
      if(id >= 30000 && id <= 31999)
      {
        return true;
      }
      else
      {
        return false;
      }
    }

    static validateIban(iban)
    {
      console.time("Duration to verify Iban");
      iban = iban.replace(/ /g, "").toUpperCase();
      iban = iban.replace(/CH/g, "1217");
      iban = iban.replace(/LU/g, "2130");

      if(parseInt(iban.substring(4,6)) === parseInt(98 - this.modulus(iban.substring(6) + iban.substring(0,4) + "00")))
      {
        console.log("Iban is Valid!");
        console.timeEnd("Duration to verify Iban");
        return true;
      }
      else
      {
        console.log("Iban is  not Valid!");
        console.timeEnd("Duration to verify Iban");
        return false;
      }

    }

    
    static modulus(str , divideBy = "97")
    {
        let cleanNumberStirng = str;
        while(cleanNumberStirng[0] === "0")
        {
            cleanNumberStirng = cleanNumberStirng.substring(1);
        }
        //console.log("InputNumber: " + cleanNumberStirng);
        let rest = "";
        for(var i = 0 ; i < cleanNumberStirng.length; i++)
        {
            rest =   rest + cleanNumberStirng[i];
            console.log("Rest: " + rest);
            rest = parseInt(rest) % parseInt(divideBy);
        }
        return rest;
    }

}

export default stringOperation;