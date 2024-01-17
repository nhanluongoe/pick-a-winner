import { useState } from "react";
import { useKey } from "react-use";
import usePrizes from "./use-prizes";

export default function useStage() {
  const [stage, setStage] = useState<number>(0);
  const { prizes } = usePrizes();

  useKey(
    "ArrowRight",
    () => {
      if (stage + 1 > prizes.length - 1) return;
      setStage((prev) => prev + 1);
    },
    {},
    [stage],
  );

  useKey(
    "ArrowLeft",
    () => {
      if (stage - 1 < 0) return;
      setStage((prev) => prev - 1);
    },
    {},
    [stage],
  );

  return stage;
}
