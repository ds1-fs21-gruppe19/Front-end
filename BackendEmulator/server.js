const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();


var myAccouncts = {
    "tobias@rothlin.com" :
    {
        "password" : "8zuqdn",
        "users" :
        [
            {
                "name": "Tobias Rothlin",
                "address": "Peterliwiese 33",
                "zip_code": "8855",
                "city": "WangenSZ",
                "iban":"CH4000777003656120095",
                "country": "CH"
            },
            {
                "name": "Reynholm Industries",
                "address": "Thomas More St",
                "zip_code": "E1W 1YW",
                "city": "London",
                "iban": "CH9830781624909502000",
                "country": "CH"
            },
            {
                "name": "Test User",
                "address": "Downing Street 10",
                "zip_code": "SW1",
                "city": "London",
                "iban": "CH4000777003656120095",
                "country": "CH"
            }

        ]

        
    }
}


app.post('/login',jsonParser, async (request, response) => {

    console.log(request.body);
    let json = 
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MTc5Mjc5ODYsInN1YiI6InJvYmluZnJpZWRsaSJ9.3VRAuVSjkcZzB8wPVfi79JwOWq6g0fLx7Gd6uW4fiWmHTDKqblmR6HnVL_M5kUuOuKBYZ9qB2BMh_9kTiolDXA",
        "expiration_secs": 900
    }
    response.json(json);

});

app.post('/create-user',jsonParser, async (request, response) => {

    myAccouncts['tobias@rothlin.com'].users.push(request.body);
    console.log(myAccouncts['tobias@rothlin.com'].users);
    response.sendStatus(200);

});

app.get('/users', async (request, response) => {

    console.log(request.body);
    let json = myAccouncts['tobias@rothlin.com'].users;
    console.log(json);
    response.json(json);

});

app.listen(process.env.PORT || 8000, () => console.log(`App available on http://localhost:8000`))