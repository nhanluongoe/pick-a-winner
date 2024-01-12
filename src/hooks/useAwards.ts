import { Award } from "../models/award";
import useLocalStorage from "./useStorage";

const useAwards = () => {
  const [awards, setAwards] = useLocalStorage<Award[]>("awards", []);

  const addAward = (award: Award) => {
    setAwards((awards) => [...awards, award]);
  };

  const removeAward = (prize: string) => {
    setAwards((awards) => awards.filter((award) => award.prize !== prize));
  };

  const updateMembers = (award: Award, members: string[]) => {
    const updatedAwards = awards.map((a) => {
      if (a.prize === award.prize) {
        return { ...a, members };
      }
      return a;
    });
    setAwards(updatedAwards);
  };

  return { awards, addAward, removeAward, updateMembers };
};

export default useAwards;
