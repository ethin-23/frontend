"use client";

import { Container, Text, Box, TextFieldInput, Button } from "@radix-ui/themes";
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

interface IFormInput {
  receiverAddress: string;
  amount: number;
}

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [isFetchingEryptedData, setIsFetchingEncryptedData] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
      toast("Encryption Successfull, Submitting Transaction.");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(errors);

  return (
    <Container className="flex h-screen w-full flex-col items-center justify-center">
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
    </Container>
  );
}
