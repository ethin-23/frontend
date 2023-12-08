"use client";

import { Container, Text, Box } from "@radix-ui/themes";
import { CardShimmer } from "@/components/common/CardShimmer";
import { VOYAGER_BASE_ADDRESS } from "@/utils/constants";

export default function Dashboard() {
  return (
    <Container className="mx-auto mt-10 flex flex-col">
      <Box>
        <Text>App fields</Text>
      </Box>
    </Container>
  );
}
