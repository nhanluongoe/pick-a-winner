import { Prize } from "../models/prize";
import useLocalStorage from "./useStorage";

const usePrizes = () => {
  const [prizes, setPrizes] = useLocalStorage<Prize[]>("prizes", []);

  const addPrize = (prize: Prize) => {
    setPrizes((prizes) => [...prizes, prize]);
  };

  const removePrize = (id: number) => {
    setPrizes((prizes) => prizes.filter((prize) => prize.id !== id));
  };

  return { prizes, addPrize, removePrize };
};

export default usePrizes;
