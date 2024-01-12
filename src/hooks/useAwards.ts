import { Award } from "../models/award";
import { Prize } from "../models/prize";
import useLocalStorage from "./useStorage";

const useAwards = () => {
  const [awards, setAwards] = useLocalStorage<Award[]>("awards", []);

  const addAward = (award: Award) => {
    setAwards((awards) => [...awards, award]);
  };

  const removeAward = (prize: string) => {
    setAwards((awards) => awards.filter((award) => award.prize !== prize));
  };

  const updateMembers = (prize: Prize, members: string[]) => {
    const prizeExists = awards.some((a) => a.prize === prize.name);
    if (prizeExists) {
      const updatedAwards = awards.map((a) => {
        if (a.prize === prize.name) {
          return { ...a, members: [...a.members, ...members] };
        }
        return a;
      });
      setAwards(updatedAwards);
    } else {
      addAward({ prize: prize.name, members });
    }
  };

  return { awards, addAward, removeAward, updateMembers };
};

export default useAwards;
