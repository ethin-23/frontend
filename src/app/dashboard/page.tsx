"use client";

import {
  Container,
  Text,
  Box,
  TextFieldInput,
  Button,
  Flex,
  Heading,
  Separator,
} from "@radix-ui/themes";
import { CardShimmer } from "@/components/common/CardShimmer";
import {
  ADDRESS_VALIDATOR_REGEX,
  API_BASE_URL,
  VOYAGER_BASE_ADDRESS,
  JSON_API_ENCRYPT_PAYLOAD,
  TRANSACTION_HISTORY_STEALTHYSTARK,
} from "@/utils/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Spinner } from "@/components/common/Spinner";
import toast from "react-hot-toast";
import { uuid } from "uuidv4";
import { useAccount } from "@starknet-react/core";
import { CallData, WeierstrassSignatureType } from "starknet";
import { formatDate, typedDataValidate } from "@/utils/helpers";
import { useLocalStorage } from "react-use";
import { AwesomeModal } from "@/components/common/Modal";
import PrivatTxnAbi from "@/abis/PrivateTxn.json";
import { Alert } from "@/components/common/Alert";
import { Transaction, TransactionHistory } from "@/types";

interface IFormInput {
  receiverAddress: string;
  amount: number;
}

interface EncryptionResult {
  cipher: string;
  n: string;
  r: string;
}

const contract_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [isFetchingEryptedData, setIsFetchingEncryptedData] = useState(false);
  const [decryptedBalance, setDecryptedBalance] = useState(0);
  const [isRefetchingDecryptedBalance, setIsRefetchingDecryptedBalance] =
    useState(false);
  const [showEncryptModal, setShowEncryptModal] = useState(false);
  const { address, account } = useAccount();
  const [encryptionResult, setEncryptionResult] =
    useState<EncryptionResult | null>(null);
  const [txnDetail, setTxnDetail] = useState<{
    receiverAddress: string;
    amount: number;
  } | null>();

  const [previousTxHash, setPreviousTxHash] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [transactionHistory, setTransactionHistory] =
    useLocalStorage<TransactionHistory>(TRANSACTION_HISTORY_STEALTHYSTARK, {});

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setEncryptionResult(null);
    setIsFetchingEncryptedData(true);
    console.log(data);
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        body: JSON.stringify({
          ...JSON_API_ENCRYPT_PAYLOAD,
          params: `${data.receiverAddress},${data.amount}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("result", result);
      setEncryptionResult(result.result);
      setIsFetchingEncryptedData(false);
      setTxnDetail(data);
      setShowEncryptModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const refetchDecryptedBalance = async () => {
    if (!account) {
      return toast("Please connect your wallet first!");
    }
    setIsRefetchingDecryptedBalance(true);
    const signature2 = (await account.signMessage(
      typedDataValidate
    )) as WeierstrassSignatureType;
    console.log("signature: ", signature2);
  };

  console.log(errors);

  const handleTransfer = async () => {
    if (!address) {
      return toast.error("Please connect your wallet first!");
    }
    if (!txnDetail?.receiverAddress) {
      return toast.error("Please enter receiver address");
    }
    if (!encryptionResult?.cipher) {
      return toast.error("Please secure your transaction first!");
    }

    try {
      const account: any =
        (window as any).starknet?.account ??
        (window as any).starknet_braavos?.account;

      const result = await account.execute({
        contractAddress: contract_address,
        entrypoint: "create_transfer_job",
        calldata: CallData.compile({
          amount: encryptionResult?.cipher,
          recipient: txnDetail.receiverAddress,
        }),
      });

      console.log("result:134 ", result);
      if (result.transaction_hash) {
        const txn: Transaction = {
          senderWallet: address,
          receiverWallet: txnDetail.receiverAddress,
          amount: txnDetail.amount,
          encryptedAmount: encryptionResult.cipher,
          txn_hash: result.transaction_hash,
          date_time: formatDate(new Date()),
        };
        const previousTxns = transactionHistory || {};
        if (!previousTxns[address]) {
          const txns = [txn];
          previousTxns[address] = txns;
        } else {
          previousTxns[address] = [txn, ...previousTxns[address]];
        }
        setTransactionHistory(transactionHistory);
        setShowEncryptModal(false);
        setTimeout(() => {
          setShowSuccessAlert(true);
        }, 1000);
      }
    } catch (error) {
      toast.error("Please accept Transaction to continue!");
      console.error(error);
    }
  };

  return (
    <Container className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <Box className="mx-auto mb-8 flex h-48 w-2/3 flex-col gap-4 border border-dashed border-sky-200 p-8">
        <Flex align="center" justify="center">
          <strong>Received Balance</strong>: {decryptedBalance}
        </Flex>
        <Button onClick={refetchDecryptedBalance} variant="surface" size="4">
          {isRefetchingDecryptedBalance ? (
            <div className="flex items-center gap-2">
              <Spinner />
              <span> Fetching Balance... </span>
            </div>
          ) : (
            <span>Refresh</span>
          )}
        </Button>
      </Box>
      <Box className="mx-auto flex h-96 w-2/3 flex-col gap-4 border border-dashed border-sky-200 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Receiver Address
            </Text>
            <TextFieldInput
              color="blue"
              variant="soft"
              placeholder="Enter Receiver Address"
              className="!h-12"
              {...register("receiverAddress", {
                required: "Please Enter Receiver Address",
                pattern: {
                  value: ADDRESS_VALIDATOR_REGEX,
                  message:
                    "Invalid Address. Address should be starknet wallet address.",
                },
              })}
              my="2"
            />
            <Text size="1" color="red" my="-2">
              {errors.receiverAddress?.message}
            </Text>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Amount
            </Text>
            <TextFieldInput
              color="blue"
              variant="soft"
              placeholder="Enter Amount"
              className="!h-12"
              my="2"
              {...register("amount", {
                required: "Please Enter Amount",
              })}
              type="number"
            />
            <Text size="1" color="red" my="-2">
              {errors.amount?.message}
            </Text>
          </label>

          <Button
            type="submit"
            size="4"
            disabled={isFetchingEryptedData}
            variant="surface"
          >
            {isFetchingEryptedData ? (
              <div className="flex items-center gap-2">
                <Spinner />
                <span> Processing... </span>
              </div>
            ) : (
              <span>Secure Transfer</span>
            )}
          </Button>
        </form>
      </Box>
      <AwesomeModal
        isOpen={showEncryptModal}
        onToggle={() => {
          setShowEncryptModal(!showEncryptModal);
        }}
        title=""
      >
        <Flex direction="column" align="center" gap="4">
          <Heading>Encryption Done Successfully</Heading>
          {encryptionResult?.cipher && (
            <Box>
              <Text size="3" className="block">
                Encrypted Balance payload
              </Text>
              <Text>{encryptionResult.cipher}</Text>
            </Box>
          )}
          <Button onClick={handleTransfer} size="4" variant="surface">
            Proceed With Transfer
          </Button>
        </Flex>
      </AwesomeModal>
      <Alert
        open={showSuccessAlert}
        title="Transaction Queued Successfully!"
        description="What this means is we have started verifying your transaction details, once its done, amount will be reflected in the receiver's account"
        okButtonLabel="Yes, Got It"
        setOpen={setShowSuccessAlert}
      />
    </Container>
  );
}
