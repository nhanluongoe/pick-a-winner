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

  const intervalIdRef = useRef<number>(0);

  const handlePick = () => {
    if (members.length === 0) {
      toast.error({
        title: "No members available!",
      });
      return;
    }

    intervalIdRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * members.length);
      const randomMember = members[randomIndex];
      winnerRef.current = randomMember.name;
      setWinner(randomMember.name);
    }, INTERVAL);

    if (autoStop) {
      setTimeout(() => {
        handleStop();
      }, DURATION);
    }
  };

  const handleNextPrize = () => {
    setCurrentPrizeIndex((prev) => prev + 1);
  };

  const [autoStop, setAutoStop] = useState<boolean>(false);

  const handleAutoStop = () => {
    setAutoStop((prev) => !prev);
  };

  const handleStop = () => {
    clearInterval(intervalIdRef.current);
    updateMembers(currentPrize, [winnerRef.current]);
    removeMember(winnerRef.current);
    decreaseQuantity(currentPrize.name);
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

      <div
        className="flex items-center gap-x-1 text-3xl text-blue-500 cursor-pointer"
        onClick={handleAutoStop}
      >
        <input type="checkbox" name="auto-stop" checked={autoStop} />
        <label htmlFor="auto-stop">Tự động dừng</label>
      </div>

      <div className="flex w-1/3 gap-5 justify-center">
        <button onClick={handlePick} className="btn-primary">
          Quay
        </button>
        {!autoStop && (
          <button onClick={handleStop} className="btn-secondary">
            Dừng
          </button>
        )}
      </div>

      {currentPrizeAvailable && (
        <button className="btn-primary" onClick={handleNextPrize}>
          Next Prize
        </button>
      )}
    </div>
  );
};
