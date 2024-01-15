import { Prize } from "../models/prize";
import useLocalStorage from "./use-storage";

const usePrizes = () => {
  const [prizes, setPrizes] = useLocalStorage<Prize[]>("prizes", []);

  const addPrize = (prize: Prize) => {
    setPrizes((prizes) => [...prizes, prize]);
  };

  const removePrize = (name: string) => {
    setPrizes((prizes) => prizes.filter((prize) => prize.name !== name));
  };

  const decreaseQuantity = (name: string) => {
    setPrizes((prizes) =>
      prizes.map((prize) => {
        if (prize.name === name) {
          return { ...prize, quantity: prize.quantity - 1 };
        }
        return prize;
      }),
    );
  };

  return { prizes, addPrize, removePrize, decreaseQuantity };
};

export default usePrizes;
