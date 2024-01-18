import { useAudio } from "react-use";

export const useSound = () => {
  const [endAudio, , endControls] = useAudio({
    src: "/sound/end.mp3",
  });

  const [startAudio, , startControls] = useAudio({
    src: "/sound/start.mp3",
  });

  const [spinningAudio, , spinningControls, spinningRef] = useAudio({
    src: "/sound/spinning.mp3",
  });

  const [longSpinningAudio, , longSpinningControls, longSpinningRef] = useAudio({
    src: "/sound/long-spinning.mp3",
  });

  const playStartSound = () => {
    startControls.play();
  };
  const stopStartSound = () => {
    startControls.pause();
  };

  const playEndSound = () => {
    endControls.play();
  };
  const stopEndSound = () => {
    endControls.pause();
  };

  const playLongSpinningSound = () => {
    longSpinningControls.play();
    if (longSpinningRef.current) {
      longSpinningRef.current.loop = true;
    }
  };
  const stopLongSpinningSound = () => {
    longSpinningControls.pause();
    longSpinningControls.seek(0);
  };

  const playSpinningSound = () => {
    spinningControls.play();
    if (spinningRef.current) {
      spinningRef.current.loop = true;
    }
  };
  const stopSpinningSound = () => {
    spinningControls.pause();
    spinningControls.seek(0);
  };

  return {
    playStartSound,
    stopStartSound,
    playEndSound,
    stopEndSound,
    playSpinningSound,
    stopSpinningSound,
    endAudio,
    startAudio,
    spinningAudio,
    longSpinningAudio,
    playLongSpinningSound,
    stopLongSpinningSound,
  };
};
