
const  FDConnectSDK = require("../index.js");
const {expect,chai} = require("chai");
var assert = require('chai').assert;
const {tokenData,wrongDataFormat,tokenDataInnerObject,hostedIds}  = require("./testData")


describe('FDConnect Test for validation', 
  () => { 
    it('should return object' , () => {
        var fcn = new FDConnectSDK(tokenData);

        assert.instanceOf(fcn, FDConnectSDK,"object created succesfully");
    })

    it('should contain validateTokenData' , () => {
        var fcn = new FDConnectSDK(tokenData);
        expect(fcn.validateJSON).to.be.a('function');
    }) 
    it('should return error resultURL is misisng', () => { 
        var fcn = function(){new FDConnectSDK({})};
      expect( fcn).to.throw("resultURL is missing"); 
  }); 
   it("wrongDataFormat tesing should thro error", () => {
    
    var fcn = function(){new FDConnectSDK(wrongDataFormat)};
    expect( fcn).to.throw("transactionDetails should be object but got string"); 
   })



   it("hostedID is not a string", () => {
    
    var fcn = function(){new FDConnectSDK(hostedIds)};
    expect( fcn).to.throw("all property of hostID should be string"); 
   })


});


describe('FDConnect to test hamc' , () => {
    it("getHamc should be an function" ,() => {
        var fcn = new FDConnectSDK(tokenData);
        expect(fcn.getHamc).to.be.a('function');
    })
    it("getHamc should return string" ,() => {
        var fcn = new FDConnectSDK(tokenData);
        expect(fcn.getHamc()).to.be.a('string');
    })
})

describe('FDCOnnect to test AESEncryption', () => {

    it("getPlaintext should return string" ,() => {
        var fcn = new FDConnectSDK(tokenData);
        expect(fcn.getAESEncryption()).to.be.a('string');
    })
})


describe('getSession id ', () => {

    it("getSessionId should make API call" ,() => {
        tokenData.transactionDetails.clientTransactionId = Math.random().toString();
        var fcn = new FDConnectSDK(tokenData);
        var result = fcn.getSessionId();
        result.then((data) => {
            // expect(data).to.equal( { sessionTokenId: 'N5MKL079W5ZZHW7O' })
            console.log("DATA",data)
            data.include.keys("sessionTokenId")
        })
       
    })
})