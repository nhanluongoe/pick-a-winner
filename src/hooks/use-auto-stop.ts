import { useState } from "react";
import { useKey } from "react-use";

export const useAutoStop = () => {
  const [autoStop, setAutoStop] = useState<boolean>(false);

  useKey("=", () => {
    setAutoStop((prev) => !prev);
  });

  return autoStop;
};
