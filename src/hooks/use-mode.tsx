import { useState } from "react";
import { useKey } from "react-use";

export default function useMode() {
  const [mode, setMode] = useState<"normal" | "supplement">("normal");

  useKey("-", () => {
    setMode((prev) => (prev === "normal" ? "supplement" : "normal"));
  });

  return mode;
}
