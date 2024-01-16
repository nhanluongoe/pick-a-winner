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
      numberOfPieces={500}
      width={width}
      height={height}
      recycle={false}
      onConfettiComplete={onComplete}
    />
  );
}
