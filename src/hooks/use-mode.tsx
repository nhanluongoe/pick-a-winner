import { useEffect, useState } from "react";
import { useKeyPress } from "react-use";

export default function useMode() {
  const [mode, setMode] = useState<"normal" | "supplement">("supplement");
  const isCtrlPressed = useKeyPress("Shift")[0];

  useEffect(() => {
    if (isCtrlPressed) {
      setMode((prev) => (prev === "normal" ? "supplement" : "normal"));
    }
  }, [isCtrlPressed]);

  return mode;
}
