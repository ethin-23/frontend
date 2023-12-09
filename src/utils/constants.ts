export const VOYAGER_BASE_ADDRESS = "https://goerli.voyager.online";
export const ADDRESS_VALIDATOR_REGEX = /0x[0-9a-f]{64}/gi;
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:18765";
export const JSON_API_ENCRYPT_PAYLOAD = {
  jsonrpc: "2.0",
  method: "encrypt",
  params: "wallet_address,amount",
  id: 1,
};
