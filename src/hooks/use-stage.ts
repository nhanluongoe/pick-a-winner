import { useState } from "react";
import { useKeyPress } from "react-use";
import usePrizes from "./use-prizes";

const regex = /[0-9]/;

export default function useStage() {
  const [stage, setStage] = useState<number>(0);
  const { prizes } = usePrizes();

  useKeyPress((event) => {
    const key = event.key;

    if (regex.test(key)) {
      if (parseInt(key) + 1 > prizes.length) return true;
      setStage(parseInt(key));
    }

    return true;
  });

  return stage;
}
