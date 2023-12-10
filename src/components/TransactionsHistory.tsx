import { Transaction } from "@/types";
import { VOYAGER_BASE_ADDRESS } from "@/utils/constants";
import { shortenedAddress } from "@/utils/helpers";
import { Link, Table } from "@radix-ui/themes";

export const TransactionHistory = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <Table.Root className="w-full" mt="9">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Sender Wallet</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Receiver Wallet</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Encrypted Amount</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Date Time</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>View On Voyager</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {transactions.map((transaction) => (
          <Table.Row key={transaction.txn_hash}>
            <Table.Cell>
              {shortenedAddress(transaction.senderWallet)}
            </Table.Cell>
            <Table.Cell>
              {shortenedAddress(transaction.receiverWallet)}
            </Table.Cell>
            <Table.Cell>{transaction.amount}</Table.Cell>
            <Table.Cell>{transaction.encryptedAmount}</Table.Cell>
            <Table.Cell>{transaction.date_time}</Table.Cell>
            <Table.Cell>
              <Link
                href={`${VOYAGER_BASE_ADDRESS}/tx/${transaction.txn_hash}`}
                target="_blank"
              >
                View On Voyager
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
