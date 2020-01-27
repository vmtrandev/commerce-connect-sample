let MERCHANT_URL = "http://";
let clientTransactionId = "";
let amount = 100;
let tokenData = {
    "resultURL": [true,"string"],
    "keyValue" :[true,"string"],
    "ivValue" : [true,"string"],
    "transactionDetails": [true,"object"] , 
    "customerDetails": [true,"object"] ,
    "productData": [true,"object"] ,
    "cardData" : [false,"object"] , 
    "walletData" :[false,"object"] ,  
    "paymentMethodType":[false,"string"],
    "integrationType":[false,"string"],
};

let customerDetails = {
    "customerId": [true,"string"],
    "hostedIds": [true,"object"], 
   "name": [true,"object"] ,
   "mobileNo": [true,"number"],
   "emailId": [true,"string"],
   "billingAddress": [true,"object"],
   "shippingAddress": [true,"object"]
}

let  transactionDetails= {
    "merchantID" : [true,"string"],
    "clientTransactionId": [true,"string"],
    "transactionType": [true,"string"],
    "amount": [true,"number"],
    "currencyCode": [true,"string"],
}
let billingAddress = {
    "street1": [true,"string"],
    "stree2":[true,"string"],
    "city": [true,"string"],
    "state": [true,"string"],
    "country": [true,"string"],
    "zipcode": [true,"number"]
}
 let shippingAddress = {
    "street1": [true,"string"],
    "stree2":[true,"string"],
    "city": [true,"string"],
    "state": [true,"string"],
    "country": [true,"string"],
    "zipcode": [true,"number"]
 }

let walletData = {
    "firstPayWalletCode": [true,"string"],
    "firstPayWalletName": [true,"string"],

}
let productData = {
    "productId":  [true,"string"],
    "productDescription":  [true,"string"],
    "quantity":  [true,"number"],
    "price": [true,"number"],
    "txnAmount":  [true,"number"],
    "shippingFee":  [true,"number"],
    "discountPrice":  [true,"number"],
}
let cardData = {
    "cardNumber" : [true,"number"],
    "expMonth" :[true,"number"],
    "expYear" : [true,"number"],
    "cVV" : [true,"number"],
    "nameOnCard" :[true,"string"],
    "vaultCard" : [true,"boolean"],
}
let name = {
    "firstName": [true,"string"],
    "lastName": [true,"string"],
    "middleName": [true,"string"],
    "suffix": [true,"string"],
}
module.exports = {tokenData,customerDetails,name,cardData,productData,walletData,shippingAddress,transactionDetails,billingAddress}