import { useEffect, useRef, useState } from "react";
import useMembers from "../hooks/useMembers";

const DURATION = 3 * 1000;
const INTERVAL = 100;

export const Home = () => {
  const [winner, setWinner] = useState<string>("");
  const { members } = useMembers();

  const winnerRef = useRef<string>("");

  const handlePick = () => {
    const intervalId = setInterval(() => {
      const numOfMembers = members.length;
      const randomIndex = Math.floor(Math.random() * numOfMembers);
      const randomMember = members[randomIndex];
      setWinner(randomMember.name);
      winnerRef.current = randomMember.name;
    }, INTERVAL);

    setTimeout(() => {
      clearInterval(intervalId);
      console.log(winnerRef.current) 
    }, DURATION);
  };

  return (
    <div>
      <p>{winner}</p>
      <button onClick={handlePick}>Start</button>
    </div>
  );
};
