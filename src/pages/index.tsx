import { useEffect, useRef, useState } from "react";
import useMembers from "../hooks/useMembers";
import useAwards from "../hooks/useAwards";
import usePrizes from "../hooks/usePrizes";
import { Prize } from "../models/prize";
import { toast } from "react-stacked-toast";

const DURATION = 3 * 1000;
const INTERVAL = 50;

export const Home = () => {
  const { members, removeMember } = useMembers();
  const { updateMembers } = useAwards();

  const [winner, setWinner] = useState<string>("");
  const winnerRef = useRef<string>("");

  const { prizes, decreaseQuantity } = usePrizes();
  const [currentPrizeIndex, setCurrentPrizeIndex] = useState<number>(0);
  const currentPrize = prizes[currentPrizeIndex];
  const currentPrizeAvailable = currentPrize && currentPrize.quantity <= 0;

  const handlePick = () => {
    if (members.length === 0) {
      toast.error({
        title: "No members available!",
      });
      return;
    }
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * members.length);
      const randomMember = members[randomIndex];
      winnerRef.current = randomMember.name;
      setWinner(randomMember.name);
    }, INTERVAL);

    setTimeout(() => {
      clearInterval(intervalId);

      if (currentPrize) {
        updateMembers(currentPrize, [winnerRef.current]);
      } else {
        toast.error({
          title: "No prizes available!",
        });
      }

      removeMember(winnerRef.current);
      decreaseQuantity(currentPrize.name);
    }, DURATION);
  };

  const handleNextPrize = () => {
    setCurrentPrizeIndex((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center flex-col items-center gap-48">
      <div className="text-center uppercase text-5xl text-blue-600">
        <p className="mb-2">
          {currentPrize?.quantity} {currentPrize?.type}
        </p>
        <p>{currentPrize?.name}</p>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <p className="text-9xl p-5 bg-blue-200 capitalize rounded-xl text-center text-blue-600 w-full">
          {winner || "abcd"}
        </p>
      </div>

      <div className="flex w-1/3 gap-5 justify-center">
        <button onClick={handlePick} className="btn-primary">
          Quay
        </button>
        <button onClick={handlePick} className="btn-secondary">
          Dừng
        </button>
      </div>

      {currentPrizeAvailable && (
        <button onClick={handleNextPrize}>Next Prize</button>
      )}
    </div>
  );
};
