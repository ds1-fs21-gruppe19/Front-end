
class basicRestRequests
{
    static PostRequest(url , json) {
        console.log(url);
        let data = JSON.stringify(json);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open("POST", url);
          xhr.onload = function () {
              resolve(xhr.response);
          };
          xhr.send(data);
      });
    }

    static GetRequest(url) {
        console.log(url);
      return new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.onload = function () {
              resolve(xhr.response);
          };
          xhr.send();
      });
    }
}

export default basicRestRequests;


