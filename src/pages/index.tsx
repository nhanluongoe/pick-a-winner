import { useEffect, useRef, useState } from "react";
import useMembers from "../hooks/use-members";
import useAwards from "../hooks/use-awards";
import usePrizes from "../hooks/use-prizes";
import { Link, useNavigate } from "react-router-dom";
import { shuffle } from "../utils/shuffle";
import { Member } from "../models/member";
import useMode from "../hooks/use-mode";
import useStage from "../hooks/use-stage";
import { hidePrefix } from "../utils/hide-prefix";
import Confetti from "../components/confetti";
import { useAutoStop } from "../hooks/use-auto-stop";
import { useSound } from "../hooks/use-sound";
import WinnerText from "../components/winner-text";

const DURATION = 5 * 1000;
const INTERVAL = 75;

export const Home = () => {
  const navigate = useNavigate();

  const {
    playStartSound,
    playSpinningSound,
    stopSpinningSound,
    playEndSound,
    startAudio,
    endAudio,
    spinningAudio,
    longSpinningAudio,
    playLongSpinningSound,
    stopLongSpinningSound,
  } = useSound();

  const [fancy, setFancy] = useState<boolean>(false);

  const { members, internalMembers, removeMembers } = useMembers();
  const { updateMembers } = useAwards();

  const { prizes, decreaseQuantity } = usePrizes();
  const stage = useStage();
  const currentPrize = prizes[stage];

  const mode = useMode();
  const [hide, setHide] = useState<boolean>(true);
  useEffect(() => {
    setHide(true);
  }, [stage, mode]);

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
  const autoStop = useAutoStop();

  const [celebrating, setCelebrating] = useState<boolean>(false);

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
    setHide(false);

    playStartSound();

    if (autoStop) {
      playSpinningSound();
    } else {
      playLongSpinningSound();
    }

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
    setFancy(true);
    const fancyTimeout = setTimeout(() => {
      setFancy(false);
      clearTimeout(fancyTimeout);
    }, 6 * 1000);

    if (autoStop) {
      stopSpinningSound();
    } else {
      stopLongSpinningSound();
    }

    playEndSound();

    setCelebrating(true);
    setSpinning(false);
    clearInterval(intervalIdRef.current);
    updateMembers(currentPrize, winnersRef.current);
    removeMembers(winnersRef.current);
    decreaseQuantity(currentPrize.name, batch);
  };

  return (
    <div className="h-full flex flex-col justify-around items-center">
      <div className="text-center uppercase text-5xl text-white font-manrope">
        {currentPrize ? (
          <>
            <p className="mb-6 text-3xl">
              {currentPrize.initialQuantity} {currentPrize.name}
            </p>
            <p className="text-6xl">{currentPrize.type}</p>
          </>
        ) : (
          <p>{"?"}</p>
        )}
      </div>

      <div className="w-3/4 relative font-manrope">
        <div
          className={`${
            fancy ? "fancy" : "not-fancy"
          } overflow-hidden relative w-full flex-col flex justify-center items-center bg-blue-100 bg-opacity-70 rounded-xl `}
        >
          {hide ? (
            <img src="/anonymous.png" className="w-[300px]" />
          ) : mode === "supplement" ? (
            <WinnerText fontSize="3.8rem">
              {hidePrefix(finalWinners[0])}
            </WinnerText>
          ) : (
            finalWinners.map((w) => (
              <WinnerText key={w} fontSize="3.5rem">
                {hidePrefix(w)}
              </WinnerText>
            ))
          )}
        </div>
        <img
          src="/left-wing.png"
          className={`absolute -bottom-[115px] -left-[10%] w-1/6 -rotate-[20deg]`}
        />
        <img
          src="/right-wing.png"
          className="absolute -right-[10%] -bottom-[115px] w-1/6 rotate-[20deg]"
        />
      </div>

      <div className="text-white">
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

      <div className="flex w-1/3 gap-5 justify-center">
        <button
          onClick={handlePick}
          className="btn-primary"
          disabled={spinning}
        >
          Quay {mode === "supplement" ? "Bổ Sung" : ""}
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

      {celebrating && <Confetti onComplete={() => setCelebrating(false)} />}

      {startAudio}
      {spinningAudio}
      {endAudio}
      {longSpinningAudio}

      <div className="fixed left-12 bottom-12 text-gray-500 underline opacity-0">
        <Link to="/configuration/prizes">
          <img src="/config.svg" />
        </Link>
      </div>
    </div>
  );
};
