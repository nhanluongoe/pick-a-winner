import { useWindowSize } from "react-use";
import ReactConfetti from "react-confetti";

interface ConfettiProps {
  onComplete?: () => void;
}

export default function Confetti(props: ConfettiProps) {
  const { onComplete } = props;
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      colors={["#ffec0d", "#fff941", "#feff86", "#d1a300", "#fcffc1"]}
      numberOfPieces={1000}
      width={width}
      height={height}
      recycle={false}
      onConfettiComplete={onComplete}
    />
  );
}
