# Front-End Doc

### Download PDF

Beim drücken auf den Knpf "Download PDF" sendet die Ract App einen **Post** request. 
die **Json** Struktur sieht wie folgt aus. 

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
