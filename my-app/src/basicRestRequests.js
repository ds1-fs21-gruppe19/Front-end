
class basicRestRequests
{
    static PostRequest(url , json) {
        console.log(url);
        let data = JSON.stringify(json);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("POST", url);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onload = function () {
              resolve(xhr);
          };
          xhr.send(data);
      });
    }

    static GetRequest(url) {
        console.log(url);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.open("GET", url);
          xhr.onload = function () {
              resolve(xhr.response);
          };
          xhr.send();
      });
    }
}

export default basicRestRequests;


