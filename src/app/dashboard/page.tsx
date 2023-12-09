"use client";

import {
  Container,
  Text,
  Box,
  TextFieldInput,
  Button,
  Flex,
  Heading,
} from "@radix-ui/themes";
import { CardShimmer } from "@/components/common/CardShimmer";
import {
  ADDRESS_VALIDATOR_REGEX,
  API_BASE_URL,
  VOYAGER_BASE_ADDRESS,
  JSON_API_ENCRYPT_PAYLOAD,
} from "@/utils/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Spinner } from "@/components/common/Spinner";
import toast from "react-hot-toast";
import { uuid } from "uuidv4";
import { useAccount } from "@starknet-react/core";
import { CallData, WeierstrassSignatureType } from "starknet";
import { typedDataValidate } from "@/utils/helpers";
import { useLocalStorage } from "react-use";
import { AwesomeModal } from "@/components/common/Modal";
import PrivatTxnAbi from "@/abis/PrivateTxn.json";

interface IFormInput {
  receiverAddress: string;
  amount: number;
}

interface EncryptionResult {
  cipher: string;
  n: string;
  r: string;
}
// type Window = {
//   starknet: {
//     account: {
//       execute: (
//         contractAddress: string,
//         entrypoint: string,
//         calldata: Array<any>,
//         options?: {
//           maxFee?: number;
//           callerAddress?: string;
//         }
//       ) => Promise<any>;
//     };
//   };
// };
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
  const [receiverAddress, setReceiverAddress] = useState("");

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
      setReceiverAddress(data.receiverAddress);
      setShowEncryptModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const refetchDecryptedBalance = async () => {
    if (!account) {
      return toast("Please connect your wallet first!");
    }
    const signature2 = (await account.signMessage(
      typedDataValidate
    )) as WeierstrassSignatureType;
    console.log("signature: ", signature2);
  };

  console.log(errors);

  const handleTransfer = async () => {
    if (!receiverAddress) {
      return toast("Please enter receiver address");
    }
    if (!encryptionResult?.cipher) {
      return toast("Please secure your transaction first!");
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
          recipient: receiverAddress,
        }),
      });
      console.log("result: ", result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="flex h-screen w-full flex-col items-center justify-center gap-8">
      <Box className="mx-auto mb-8 flex h-48 w-2/3 flex-col gap-4 border border-dashed border-sky-200 p-8">
        <Flex align="center" justify="center">
          <strong>Received Balance</strong>: {decryptedBalance}
        </Flex>
        <Button onClick={refetchDecryptedBalance}>Refresh</Button>
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

          <Button type="submit" size="4" disabled={isFetchingEryptedData}>
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
          <Button onClick={handleTransfer}>Proceed With Transfer</Button>
        </Flex>
      </AwesomeModal>
    </Container>
  );
}
