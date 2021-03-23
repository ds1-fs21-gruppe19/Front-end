# Front-End Doc

### Download PDF

Beim drücken auf den Knpf "Download PDF" sendet die Ract App einen **Post** request. 
Die **Json** Struktur sieht wie folgt aus. 

##### Request payload:
```
{
    "InvoiceInfo":
    {
        "Receiver_IBAN" : "",
        "Receiver_Name": "", 
        "Receiver_Street": "", 
        "Receiver_City": "", 
        "Receiver_Ref": "", 
        "AdditionalInfo": "",  
        "FromName": "",
        "FromStreet": "",
        "FromCity": "",
        "Amount": ""
    },
    "MetaData": 
    {
        "NumberOfPages" : 1
    }
}
```

##### Invoice View:

Das Invoice Modul besteht aus 10 Textfelder sowie einem Button. 
![Invoice Modul](QRCode_View.png)

