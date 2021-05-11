import basicRestRequests from './basicRestRequests.js';


class backendApi extends basicRestRequests
{ 
    static #baseUrl = "http://127.0.0.1:8000/";



    static async getPDF(json)
    {   
        console.log(this.#baseUrl);
        let result = await this.PostRequest(this.#baseUrl,json);
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
      return result;
    }

    static async registerNewUser(json)
    {
      let url = this.#baseUrl + "register";
      let result = await this.PostRequest(url,json);
      return result;
    }

    static async getCurrentUsers(jwt)
    {
      let url = this.#baseUrl + "users";
      let result = await this.GetRequestWithJWT(url,jwt);
      return result;
    }

    static async createNewUser(json, jwt)
    {
      let url = this.#baseUrl + "create-user";
      let result = await this.PostRequestWithJWT(url, json, jwt);
      return result;
    }

    static async deleteUser(userNumber, jwt)
    {
      let url = this.#baseUrl + "delete-users/" + userNumber;
      let result = await this.DeleteRequest(url, jwt);
      return result;
    }

    static async refreshLogin()
    {
      console.log("Refeshing Login!");
      let result = await this.PostRequest(this.#baseUrl + "refresh-login", null);
      let data;
      try
      {
        data = JSON.parse(result.response);
        return data.token;
      }
      catch
      {
        console.log(result.response);
        return null;
      }

      
    }


    
}

export default backendApi;