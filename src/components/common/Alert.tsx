"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";

type AlertProps = {
  title: string;
  description: string;
  cancelButtonLabel?: string;
  cancelButtonHandler?: () => void;
  okButtonLabel?: string;
  okButtonHandler?: () => void;
  open: boolean;
  showOk?: boolean;
  showCancel?: boolean;
};

export const Alert = ({
  title,
  description,
  cancelButtonLabel = "Cancel",
  okButtonLabel = "Okay",
  okButtonHandler = () => {},
  open,
  showOk = true,
  showCancel = true,
}: AlertProps) => {
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Content>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description>{description}</AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          {showCancel && (
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                {cancelButtonLabel}
              </Button>
            </AlertDialog.Cancel>
          )}
          {showOk && (
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={okButtonHandler}>
                {okButtonLabel}
              </Button>
            </AlertDialog.Action>
          )}
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
