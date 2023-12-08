"use client";
import { Box, Badge, Container, Link, Heading } from "@radix-ui/themes";
import { ThemeToggle } from "./common/ThemeToggle";
import { ConnectButton } from "./buttons/ConnectButton";
import { useNetwork } from "@starknet-react/core";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const GITHUB_CONTRACTS_URL = "https://github.com/ethin-23/backend";

export const Header = () => {
  const { chain } = useNetwork();
  console.log(chain);
  return (
    <Container>
      <Box height="0" className="absolute left-4 top-8 flex items-center gap-4">
        <Link href="/" className="p-4">
          <Heading className="leading-2">Stark Mask</Heading>
        </Link>
        <Link href="/dashboard" className="py-4">
          Dashboard
        </Link>
        <Link href={GITHUB_CONTRACTS_URL} target="_blank" className="py-4">
          <GitHubLogoIcon />
        </Link>
      </Box>
      <Box
        height="0"
        className="absolute right-4 top-8 flex items-center gap-4"
      >
        {!!chain && !!chain.name && !!chain.network && (
          <Badge highContrast size="2">
            {chain.name} {chain.network}
          </Badge>
        )}
        <ConnectButton />
        <ThemeToggle />
      </Box>
    </Container>
  );
};
