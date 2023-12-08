// import Image from "next/image";

import { Button, Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

// import backgroundImage from "@/images/background.jpg";

export function Hero() {
  const router = useRouter();
  return (
    <div className="relative pb-20 pt-10 sm:py-24">
      <Flex
        direction="column"
        className="mx-auto max-w-4xl lg:max-w-4xl lg:px-6"
        align="center"
      >
        <h1 className="font-display text-6xl font-bold sm:text-7xl">
          <Heading className="block text-center" size="9" highContrast>
            Stark Mask
          </Heading>
          <Text className="block text-center text-sm">
            Private Payments With Starknet
          </Text>
        </h1>
        <Text className="font-display space-y-6 text-2xl tracking-wide" mt="8">
          Tired of having your every transaction tracked and analyzed?
          Introducing StarkMask, the groundbreaking private payment service
          built on StarkNet using Homomorphic Enryption technology, a
          cutting-edge blockchain technology. With StarkMask, you can finally
          send tokens to others without revealing your wallet address or the
          amount sent.
        </Text>
        <Button
          onClick={() => router.push("/dashboard")}
          className="w-64 cursor-pointer"
          size="3"
          mt="9"
        >
          Start Now!
        </Button>
      </Flex>
    </div>
  );
}
