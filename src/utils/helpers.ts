import { TypedData, shortString } from "starknet";

export const typedDataValidate: TypedData = {
  types: {
    StarkNetDomain: [
      { name: "name", type: "string" },
      { name: "version", type: "felt" },
      { name: "chainId", type: "felt" },
    ],
    Validate: [
      { name: "randomNo", type: "u128" },
      { name: "message", type: "u128" },
    ],
  },
  primaryType: "Validate",
  domain: {
    name: "stealthystark", // put the name of your dapp to ensure that the signatures will not be used by other DAPP
    version: "1",
    chainId: shortString.encodeShortString("SN_GOERLI"), // shortString of 'SN_GOERLI' (or 'SN_MAIN'), to be sure that signature can't be used by other network.
  },
  message: {
    randomNo: 1233,
    message: 1237,
  },
};

// connect your account, then
export const helper = () => {};

export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1; // Add 1 to get the month in MM format
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const shortenedAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function hexToDecimal(hex: string) {
  // Remove the leading "0x" if present
  if (hex.startsWith("0x")) {
    hex = hex.substring(2);
  }

  // Convert the hex string to a base-16 integer
  return parseInt(hex, 16);
}
