"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo } from "react";
import { GenericButton } from "./GenericButton";
import { shortenedAddress } from "@/utils/helpers";

export const ConnectButton = () => {
  const { address } = useAccount();
  const { connectors, pendingConnector, connectAsync } = useConnect();
  const { disconnect } = useDisconnect();

  const shortenedAddressMemoised = useMemo(() => {
    if (!address) return "";
    return shortenedAddress(address);
  }, [address]);

  return address ? (
    <GenericButton
      label={shortenedAddressMemoised}
      onClick={() => disconnect()}
    />
  ) : (
    <div className="flex items-center gap-4">
      <div className="flex gap-4">
        {connectors.map((connector) => (
          <GenericButton
            key={connector.id}
            label={connector.name}
            onClick={() => connectAsync({ connector })}
            disabled={
              pendingConnector && pendingConnector.name === connector.name
            }
          />
        ))}
      </div>
    </div>
  );
};
