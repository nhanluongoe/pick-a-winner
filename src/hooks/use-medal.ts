import { useState } from "react";
import { useKey } from "react-use";

export const useMedal = () => {
  const [medal, setMedal] = useState(false);
 
  useKey("`", () => {
    setMedal((prev) => !prev); 
  }, {}, [medal])

  return medal;
}
