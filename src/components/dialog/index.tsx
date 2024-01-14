import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./dialog.css";
import { ReactNode } from "react";

interface DialogProps {
  children?: ReactNode;
  open: boolean;
  title?: ReactNode;
  description?: ReactNode;
  okAction?: {
    text: string;
    onClick?: () => void;
  };
  rejectAction?: {
    text: string;
    onClick?: () => void;
  };
}

export default function Dialog(props: DialogProps) {
  const { open, title, description, okAction, rejectAction, children } = props;
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          {title && (
            <AlertDialog.Title className="AlertDialogTitle">
              {title}
            </AlertDialog.Title>
          )}
          {description && (
            <div className="AlertDialogDescription">{description}</div>
          )}

          <div
            style={{
              display: "flex",
              gap: 25,
              justifyContent: "center",
              width: "75%",
              margin: "auto",
            }}
          >
            {rejectAction && (
              <AlertDialog.Cancel
                asChild
                onClick={rejectAction.onClick}
                className="flex-1"
              >
                <button className="btn-gray text-center">{rejectAction.text}</button>
              </AlertDialog.Cancel>
            )}
            {okAction && (
              <AlertDialog.Action asChild className="flex-1">
                <button className="btn-tertiary text-center" onClick={okAction.onClick}>
                  {okAction.text}
                </button>
              </AlertDialog.Action>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>

      {children}
    </AlertDialog.Root>
  );
}
