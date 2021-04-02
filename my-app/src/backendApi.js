import basicRestRequests from './basicRestRequests.js';


class backendApi extends basicRestRequests
{
    static async validateIban(iban)
    {
      iban = iban.replace(/ /g, "").toUpperCase();
      if(iban.length > 0)
      {
        let request = "https://openiban.com/validate/" + iban + "?validateBankCode=true&getBIC=true";
        let respone = await this.GetRequest(request);
        let data = JSON.parse(respone);
        return data.valid;
      }
      else
      {
        return false;
      }

    }


    
}

export default backendApi;