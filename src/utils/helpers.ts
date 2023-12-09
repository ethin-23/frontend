import {
  ec,
  hash,
  num,
  json,
  Contract,
  WeierstrassSignatureType,
  TypedData,
  shortString,
} from "starknet";

export const typedDataValidate: TypedData = {
  types: {
    StarkNetDomain: [
      { name: "name", type: "string" },
      { name: "version", type: "felt" },
      { name: "chainId", type: "felt" },
    ],
    Validate: [
      { name: "randomNo", type: "felt" },
      { name: "message", type: "felt" }, // array of felt
    ],
  },
  primaryType: "Validate",
  domain: {
    name: "stealthystark", // put the name of your dapp to ensure that the signatures will not be used by other DAPP
    version: "1",
    chainId: shortString.encodeShortString("SN_GOERLI"), // shortString of 'SN_GOERLI' (or 'SN_MAIN'), to be sure that signature can't be used by other network.
  },
  message: {
    randomNo: "122333",
    message: "test123",
  },
};

// connect your account, then
export const helper = () => {};
