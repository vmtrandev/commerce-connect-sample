const { randomUUID } = require("node:crypto");

// https://test.fdconnect.com/Pay/?sessionToken={received

let MERCHANT_URL =
  "https://c7b5-2402-800-62fa-7181-78e3-6f78-80b8-5ac6.ngrok-free.app";

const cred = {
  merchantID: "470000018941417",
  pageId: "PageId2023112722495",
  masterKey: "eUbH/qG88yCkWgmXLeh5jh2ZOIHmjvkjgNIrc/tn5vM=",
  masterIv: "T3C3aCbl6jPfSHpBgoIF2g==",
};
let amount = 100;

const clientTransactionId = randomUUID();

console.log(clientTransactionId);

var tokenData = {
  resultURL: "https://dc35-2402-800-62fa-8b30-74-e05b-aea2-ad7e.ngrok-free.app/webhook/fisive-commerce-connect?ledgerId=123&sdk_url=sad",
  keyValue: cred.masterKey,
  ivValue: cred.masterIv,
  transactionDetails: {
    merchantID: cred.merchantID,
    clientTransactionId: clientTransactionId,
    transactionType: "sale",
    amount: amount,
    currencyCode: "INR",
  },
  customerDetails: {
    customerId: "ABC1234",
    hostedIds: ["KRS1220ESFFTR8490"],
    name: {
      firstName: "ABC",
      lastName: "XYZ",
      middleName: "DEF",
      suffix: "ADX",
    },
    mobileNo: 1234567890,
    emailId: "abc@gmail.com",
    billingAddress: {
      street1: "Ghodbandar Rode",
      stree2: "Sai Nagar",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipcode: 400000,
    },
    shippingAddress: {
      street1: "Ghodbandar Rode",
      stree2: "Sai nagar",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipcode: 400000,
    },
  },
  productData: {
    productId: "P123",
    productDescription: "Water Bottle",
    quantity: 1,
    price: 100,
    txnAmount: 120,
    shippingFee: 20,
    discountPrice: 0,
  },
  paymentMethodType: "UPI",
  integrationType: "MERCHANT_PAYMENT_MODE_INTEGRATION",
};

///
var hostedIds = {
  resultURL: MERCHANT_URL + "/merchantSuccessPage.jsp",
  keyValue: "CNy+HimxmI4PmrJWrpLarBfbo6jIY/CHcezg2VQ8u5o=",
  ivValue: "9T4hd3Nx0b0sMgYuyWLCTg==",
  transactionDetails: {
    merchantID: "470000018941417",
    clientTransactionId: clientTransactionId,
    transactionType: "sale",
    amount: amount,
    currencyCode: "INR",
  },
  customerDetails: {
    customerId: "ABC1234",
    hostedIds: [9],
    name: {
      firstName: "ABC",
      lastName: "XYZ",
      middleName: "DEF",
      suffix: "ADX",
    },
    mobileNo: 1234567890,
    emailId: "abc@gmail.com",
    billingAddress: {
      street1: "Ghodbandar Rode",
      stree2: "Sai Nagar",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipcode: 400000,
    },
    shippingAddress: {
      street1: "Ghodbandar Rode",
      stree2: "Sai nagar",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      zipcode: 400000,
    },
  },
  productData: {
    productId: "P123",
    productDescription: "Water Bottle",
    quantity: 1,
    price: "100",
    txnAmount: "120",
    shippingFee: "20",
    discountPrice: "0",
  },
  // paymentMethodType: "NETBANKING",
  // integrationType: "MERCHANT_PAYMENT_MODE_INTEGRATION",
  paymentMethodType: "CREDITCARD",
  integrationType: "MERCHANT_PAYMENT_MODE_INTEGRATION",
};

var wrongDataFormat = {
  resultURL: MERCHANT_URL + "/merchantSuccessPage.jsp",
  transactionDetails: "",
};

var tokenDataInnerObject = {
  resultURL: MERCHANT_URL + "/merchantSuccessPage.jsp",
  transactionDetails: {
    merchantID: "470000000332260",
    clientTransactionId: "sdfsdfsd",
    transactionType: "sale",
    amount: amount,
    currencyCode: "INR",
  },
};

module.exports = {
  tokenDataInnerObject,
  wrongDataFormat,
  hostedIds,
  tokenData,
  cred,
};
