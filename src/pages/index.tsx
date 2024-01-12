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
      setWinner(randomMember.name);
      winnerRef.current = randomMember.name;
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
    <div>
      <p>{winner}</p>
      <button onClick={handlePick}>Start</button>

      {currentPrizeAvailable && (
        <button onClick={handleNextPrize}>Next Prize</button>
      )}
    </div>
  );
};
