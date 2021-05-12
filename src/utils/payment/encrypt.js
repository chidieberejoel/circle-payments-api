import * as openpgpModule from "openpgp";
import { axiosCreate, errorResponse } from "../index";

const encryptData = async (dataToEncrypt) => {
  try {
    const pciEncryptionKey = await (await axiosCreate.get("/encryption/public")).data;
    const decodedPublicKey = Buffer.from(
      pciEncryptionKey.data.publicKey,
      "base64",
    ).toString("binary");

    const openpgp = await openpgpModule;

    const options = {
      message: openpgp.message.fromText(JSON.stringify(dataToEncrypt)),
      publicKeys: (await openpgp.key.readArmored(decodedPublicKey)).keys,
    };

    return openpgp.encrypt(options).then((ciphertext) => ({
      encryptedData: Buffer.from(ciphertext.data, "binary").toString("base64"),
      keyId: pciEncryptionKey.data.keyId,
    }));
  } catch (error) {
    return errorResponse("Error", error);
  }
};

export default encryptData;
