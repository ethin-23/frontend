"use client";

import { Container, Text, Box, TextFieldInput, Button } from "@radix-ui/themes";
import { CardShimmer } from "@/components/common/CardShimmer";
import {
  ADDRESS_VALIDATOR_REGEX,
  VOYAGER_BASE_ADDRESS,
} from "@/utils/constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Spinner } from "@/components/common/Spinner";

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsFetchingEncryptedData(true);
    console.log(data);
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
              className=""
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
              my="2"
              {...register("amount", {
                required: "Please Enter Amount",
              })}
              type="number"
              step="0.00000001"
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
              <span>Transfer</span>
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
}
