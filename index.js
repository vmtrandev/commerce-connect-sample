const testData = require("./testData");
const axios = require("axios");

var AES256 = require("./aes256");
var HmacSHA512 = require("crypto-js/hmac-sha512");
const { cred } = require('./test/testData');

function typeerror(data, dataName, reqType) {
  return ` ${dataName} should be ${reqType} but got ${typeof data} \n`;
}

function missingError(missingData) {
  return `${missingData} is missing  \n`;
}

class FDConnectSDK {
  tokenData;
  error = [];
  testData_copy;
  constructor(tokenData) {
    let errors = [];
    this.testData_copy = testData;
    this.validateJSON(tokenData, testData.tokenData);
    if (this.error.length > 0) {
      throw new Error(this.error.toString());
    }
    if (this.error.length == 0) {
      this.tokenData = tokenData;
    }
  }

  validateJSON(data, testDatas) {
    let isrequired = 0;
    let dataType = 1;
    if (typeof data === "object") {
      // for JS copailation
      for (const prop in testDatas) {
        if (testDatas[prop][isrequired]) {
          if (data[prop] == undefined) {
            // for checking  mandatory field
            this.error.push(missingError(prop));
          } else if (typeof data[prop] !== testDatas[prop][dataType]) {
            // for checking  mandatory field data types
            this.error.push(
              typeerror(data[prop], prop, testDatas[prop][dataType])
            );
          } else if (
            typeof data[prop] === "object" &&
            !Array.isArray(data[prop])
          ) {
            // for checking innner object on mandatory field data types
            this.validateJSON(data[prop], this.testData_copy[prop]);
          } else if (
            typeof data[prop] === "object" &&
            Array.isArray(data[prop])
          ) {
            // for checking arrary to be string
            for (var i = 0; i < data[prop].length; i++) {
              if (typeof data[prop][i] !== "string") {
                this.error.push("all property of hostID should be string");
                break;
              }
            }
          }
        }
        if (!testDatas[prop][isrequired] && data[prop] !== undefined) {
          // for checking  non-mandatory field
          if (typeof data[prop] !== testDatas[prop][dataType]) {
            // for checking non mandatory field data types
            this.error.push(
              typeerror(data[prop], prop, testDatas[prop][dataType])
            );
          } else if (
            typeof data[prop] === "object" &&
            !Array.isArray(data[prop])
          ) {
            // for checking innner object non mandatory field data types
            this.validateJSON(data[prop], this.testData_copy[prop]);
          } else if (
            typeof data[prop] === "object" &&
            Array.isArray(data[prop])
          ) {
            // for checking arrary to be string
            for (var i = 0; i < data[prop].length; i++) {
              if (typeof data[prop][i] !== "string") {
                this.error.push("all property of hostID should be string");
                break;
              }
            }
          }
        }
      }
    } else {
      this.error.push("not valid data");
    }
  }

  getHamcEncryption() {
    // Merchant_Id+Merchant_Txn_Id+Amount+Currency_Code+Key
    var hmacEncryptValue =
      this.tokenData.transactionDetails.merchantID +
      this.tokenData.transactionDetails.clientTransactionId +
      this.tokenData.transactionDetails.amount +
      this.tokenData.transactionDetails.currencyCode +
      this.tokenData.keyValue;
    let hmacSHA512 = HmacSHA512(hmacEncryptValue, this.tokenData.keyValue);
    let HMS = hmacSHA512.toString();
    return HMS;
    // return toHex(hmac.finalize())
  }

  getAESEncryption() {
    var key = this.tokenData.keyValue;
    var txnIv = this.tokenData.ivValue;
    const encrypt_result = AES256.encrypt(
      JSON.stringify(this.tokenData),
      key,
      txnIv
    );
    return encrypt_result;
  }

  getSessionId() {
    return new Promise((resolve, reject) => {
      var hmacEncrypted = this.getHamcEncryption();
      var encryption = this.getAESEncryption();
      var options = {
        headers: {
          "Content-Type": "application/json",
          merchantId: cred.merchantID,
          HMAC: hmacEncrypted,
        },
      };

      axios
        .post(
          "https://test.fdconnect.com/FirstPayL2Services/getToken",
          { encryptData: encryption },
          options
        )
        .then((response) => {
          if (response.data.errorCode) {
            reject(response.data.response);
          }
          resolve(response.data.response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = FDConnectSDK;
