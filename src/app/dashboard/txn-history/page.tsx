"use client";

import { TransactionHistory } from "@/components/TransactionsHistory";
import { TransactionHistory as TransactionHistoryType } from "@/types";
import { TRANSACTION_HISTORY_STEALTHYSTARK } from "@/utils/constants";
import { Container, Flex, Heading } from "@radix-ui/themes";
import { useAccount } from "@starknet-react/core";
import { useLocalStorage } from "react-use";

export default function TransactionHistoryPage() {
  const { address } = useAccount();

  const [transactionHistory] = useLocalStorage<TransactionHistoryType>(
    TRANSACTION_HISTORY_STEALTHYSTARK,
    {}
  );

  if (
    !address ||
    !transactionHistory?.[address] ||
    !Array.isArray(transactionHistory[address])
  ) {
    return (
      <Flex align="center" justify="center" className="min-h-screen w-full">
        <Heading>NO TRANSACTIONS FOUND</Heading>
      </Flex>
    );
  }
  return (
    <Container mt="8">
      <TransactionHistory transactions={transactionHistory[address]} />
    </Container>
  );
}
