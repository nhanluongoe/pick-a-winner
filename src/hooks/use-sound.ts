import { useAudio } from "react-use";

export const useSound = () => {
  const [endAudio, , endControls] = useAudio({
    src: "/sound/end.mp3",
    autoPlay: true,
  });

  const [startAudio, , startControls] = useAudio({
    src: "/sound/start.mp3",
    autoPlay: true,
  });

  const [spinningAudio, , spinningControls, spinningRef] = useAudio({
    src: "/sound/spinning.mp3",
    autoPlay: true,
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

  const playSpinningSound = () => {
    spinningControls.play();
    if (spinningRef.current) {
      spinningRef.current.loop = true;
    }
  };
  const stopSpinningSound = () => {
    spinningControls.pause();
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
  };
};
