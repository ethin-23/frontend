export type Transaction = {
  senderWallet: string;
  receiverWallet: string;
  amount: number;
  encryptedAmount: string;
  txn_hash: string;
  date_time: string;
};

export type TransactionHistory = {
  [key: string]: Transaction[];
};
