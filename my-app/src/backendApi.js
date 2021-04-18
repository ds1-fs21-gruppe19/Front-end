import basicRestRequests from './basicRestRequests.js';


class backendApi extends basicRestRequests
{ 
    static #baseUrl = "https://rothlin.com/TestApp/";

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


    static async getPDF(json)
    {   
        console.log(this.#baseUrl);
        let result = await this.PostRequest(this.#baseUrl,json);
        console.log(result);
        return result;
    }

    static async login(email,passowrd)
    {
      let url = this.#baseUrl + "login";
      let json = {
        "user_name": email,
        "password": passowrd
        }

      let result = await this.PostRequest(url, json);
      console.log(result);
      return result;
    }

    static async registerNewUser(json)
    {
      console.log(this.#baseUrl);
        let result = await this.PostRequest(this.#baseUrl,json);
        console.log(result);
        return result;
    }


    
}

export default backendApi;