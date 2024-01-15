import { Member } from "../models/member";
import useLocalStorage from "./use-storage";

const useMembers = () => {
  const [members, setMembers] = useLocalStorage<Member[]>("members", []);

  const addMember = (member: Member) => {
    setMembers((members) => [...members, member]);
  };

  const addMembers = (members: Member[]) => {
    setMembers((prevMembers) => [...prevMembers, ...members]);
  };

  const removeMember = (name: string) => {
    setMembers((members) => members.filter((member) => member.name !== name));
  };

  const removeMembers = (names: string[]) => {
    setMembers((members) =>
      members.filter((member) => !names.includes(member.name)),
    );
  };

  return { members, addMember, addMembers, removeMember, removeMembers };
};

export default useMembers;
