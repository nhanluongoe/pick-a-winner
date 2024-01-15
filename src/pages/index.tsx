import { useRef, useState } from "react";
import useMembers from "../hooks/use-members";
import useAwards from "../hooks/use-awards";
import usePrizes from "../hooks/use-prizes";
import { toast } from "react-stacked-toast";
import { Link } from "react-router-dom";

const DURATION = 3 * 1000;
const INTERVAL = 75;

export const Home = () => {
  const { members, removeMember } = useMembers();
  const { updateMembers } = useAwards();

  const [winner, setWinner] = useState<string>("");
  const winnerRef = useRef<string>("");

  const { prizes, decreaseQuantity } = usePrizes();
  const [currentPrizeIndex, setCurrentPrizeIndex] = useState<number>(0);
  const currentPrize = prizes[currentPrizeIndex];
  const currentPrizeAvailable = currentPrize && currentPrize.quantity > 0;

  const intervalIdRef = useRef<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);

  const handlePick = () => {
    setSpinning(true);

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
    setSpinning(false);
    clearInterval(intervalIdRef.current);
    updateMembers(currentPrize, [winnerRef.current]);
    removeMember(winnerRef.current);
    decreaseQuantity(currentPrize.name);
  };

  return (
    <div className="h-full flex flex-col justify-around items-center">
      <div className="text-center uppercase text-5xl text-blue-600">
        {currentPrize ? (
          <>
            <p className="mb-2">
              {currentPrize.initialQuantity} {currentPrize.name}
            </p>
            <p>{currentPrize.type}</p>
          </>
        ) : (
          <p>{"?"}</p>
        )}
      </div>

      <div className="w-3/4 flex justify-center items-center">
        <p className="text-8xl p-5 bg-blue-200 capitalize rounded-xl text-center text-blue-600 w-full">
          {winner || "???"}
        </p>
      </div>

      {!currentPrizeAvailable && (
        <button className="btn-tertiary" onClick={handleNextPrize}>
          Giải tiếp theo
        </button>
      )}

      <div
        className="flex items-center gap-x-1 text-3xl text-blue-500 cursor-pointer"
        onClick={handleAutoStop}
      >
        <input type="checkbox" name="auto-stop" checked={autoStop} readOnly />
        <label htmlFor="auto-stop">Tự động dừng</label>
      </div>

      <div className="flex w-1/3 gap-5 justify-center">
        <button
          onClick={handlePick}
          className="btn-primary"
          disabled={spinning || !currentPrizeAvailable}
        >
          Quay
        </button>
        {!autoStop && (
          <button
            onClick={handleStop}
            className="btn-secondary"
            disabled={!spinning}
          >
            Dừng
          </button>
        )}
      </div>

      <div className="fixed left-12 bottom-12 text-gray-500 underline">
        <Link to="/configuration/prizes">
          <img src="/config.svg" />
        </Link>
      </div>
    </div>
  );
};
