const FDConnectSDK = require(".");
const { tokenData } = require("./test/testData");

async function main() {
  try {
    const sdkClient = new FDConnectSDK(tokenData);

    const session = await sdkClient.getSessionId();

    console.log(session);
  } catch (error) {
    console.log({ error });
  }
}

main();
