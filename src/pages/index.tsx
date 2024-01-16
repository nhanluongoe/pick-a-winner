import { useRef, useState } from "react";
import useMembers from "../hooks/use-members";
import useAwards from "../hooks/use-awards";
import usePrizes from "../hooks/use-prizes";
import { Link, useNavigate } from "react-router-dom";
import { shuffle } from "../utils/shuffle";
import { Member } from "../models/member";
import useMode from "../hooks/use-mode";
import useStage from "../hooks/use-stage";
import { hidePrefix } from "../utils/hide-prefix";

const DURATION = 3 * 1000;
const INTERVAL = 75;

export const Home = () => {
  const navigate = useNavigate();

  const mode = useMode();

  const { members, internalMembers, removeMembers } = useMembers();
  const { updateMembers } = useAwards();

  const { prizes, decreaseQuantity } = usePrizes();
  const stage = useStage();
  const currentPrize = prizes[stage];

  const batch = mode === "normal" ? currentPrize?.batch : 1;
  const [shuffledWinners, setShuffledWinners] = useState<Member[]>(members);
  const winners = shuffledWinners.slice(0, batch).map((m) => m.name);
  const [shuffledInternalWinners, setShuffledInternalWinners] =
    useState<Member[]>(internalMembers);
  const internalWinners = shuffledInternalWinners
    .slice(0, batch)
    .map((m) => m.name);
  const winnersRef = useRef<string[]>([]);
  const finalWinners = currentPrize?.for === "all" ? winners : internalWinners;

  const intervalIdRef = useRef<number>(0);
  const isConfigured: boolean = !!prizes.length;

  const [spinning, setSpinning] = useState<boolean>(false);
  const [autoStop, setAutoStop] = useState<boolean>(false);

  const handleShuffle = () => {
    if (currentPrize?.for === "all") {
      const res = shuffle(members);
      winnersRef.current = res.slice(0, batch).map((m) => m.name);
      setShuffledWinners(res);
    } else {
      const res = shuffle(internalMembers);
      winnersRef.current = res.slice(0, batch).map((m) => m.name);
      setShuffledInternalWinners(res);
    }
  };

  const handlePick = () => {
    setSpinning(true);

    intervalIdRef.current = setInterval(() => {
      handleShuffle();
    }, INTERVAL);

    if (autoStop) {
      setTimeout(() => {
        handleStop();
      }, DURATION);
    }
  };

  const handleStop = () => {
    setSpinning(false);
    clearInterval(intervalIdRef.current);
    updateMembers(currentPrize, winnersRef.current);
    removeMembers(winnersRef.current);
    decreaseQuantity(currentPrize.name, batch);
  };

  const handleAutoStop = () => {
    setAutoStop((prev) => !prev);
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

      {mode === "supplement" ? (
        <div className="w-3/4 flex justify-center items-center">
          <p className="text-8xl px-5 py-7 bg-blue-200 capitalize rounded-xl text-center text-blue-600 w-full">
            {hidePrefix(finalWinners[0]) || "???"}
          </p>
        </div>
      ) : (
        <div className="w-3/4 flex-col flex justify-center items-center bg-blue-200 rounded-xl">
          {finalWinners.map((w) => (
            <p
              key={w}
              className="text-5xl px-5 py-5 capitalize text-center text-blue-600 w-full block"
            >
              {hidePrefix(w)}
            </p>
          ))}
        </div>
      )}
      <div className="w-3/4 flex justify-center items-center">{}</div>

      <div>
        {!isConfigured && (
          <p>
            Có vẻ như bạn chưa cấu hình giải thưởng 🤔?
            <button
              className="btn-tertiary mx-3"
              onClick={() => navigate("/configuration/prizes")}
            >
              Cấu hình
            </button>
          </p>
        )}
      </div>

      <div
        className="flex items-center gap-x-1 text-3xl text-blue-500 cursor-pointer"
        onClick={handleAutoStop}
      >
        <input
          type="checkbox"
          name="auto-stop"
          checked={autoStop}
          readOnly
          className="scale-150 mr-2"
        />
        <label htmlFor="auto-stop">Tự động dừng</label>
      </div>

      <div className="flex w-1/3 gap-5 justify-center">
        <button
          onClick={handlePick}
          className="btn-primary"
          disabled={spinning}
        >
          Quay {mode === "supplement" ? "Bù" : ""}
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
