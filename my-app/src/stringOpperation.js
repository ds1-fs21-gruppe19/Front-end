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

        console.log("InsertValue: " + intergerValue);

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

}

export default stringOpperation;