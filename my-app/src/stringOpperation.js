class stringOpperation{

    static cleanNumbers(str)
    {
      str = str.replace(/[^(\d + .)]/g, "");
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
}

export default stringOpperation;