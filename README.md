# Front-End Doc

### Invoice

Beim drücken auf den Knopf "Download PDF" sendet die Ract App einen **Post** request. 
Die **Json** Struktur sieht wie folgt aus. 

##### Request payload:
```
{
    "Receiver_IBAN" : "CH40 0077 7003 6561 2009 5",
    "Receiver_Name": "Tobias Rothlin",
    "Receiver_Street": "Peterliwiese 33",
    "Receiver_City": "8855 Wangen SZ",
    "Receiver_Ref": "",
    "AdditionalInfo": "Test123",
    "FromName": "Hans Muster",
    "FromStreet": "Sonnenstrasse 31",
    "FromCity": "2000 Schöningen",
    "Amount": "5000.00",
    "Currency": "CHF"
}
```

##### Invoice View:

Das Invoice Modul besteht aus 10 Textfelder sowie einem Button. 
![Invoice Modul](Screenshots/QRCode_View.png)


### Login

Bei drücken auf den "Login" Knopf auf der Startseite verschwindet das Invoice Modul und das Login Modul wird dargetstellt.

##### Request payload:
```

```

##### Invoice View:

Das Login Modul besteht aus 2 Textfelder sowie einem Button. 
![Invoice Modul](Screenshots/Login_View.png)


### Preview

Ein Build der App kann unter dieser URL angeschaut werden. 
Preview [Preview](http://www.QRCodePreview.rothlin.com).

Die Preview Seite sendet einen Post request an ein Echo Rest. Die Antwort des Rests wird in der Console angezeit. 
