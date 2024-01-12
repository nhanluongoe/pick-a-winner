import { Member } from "../models/member";
import useLocalStorage from "./useStorage";

const useMembers = () => {
  const [members, setMembers] = useLocalStorage<Member[]>("members", []);

  const addMember = (member: Member) => {
    console.log("member, ", member, members);
    setMembers((members) => [...members, member]);
  };

  const addMembers = (members: Member[]) => {
    setMembers((prevMembers) => [...prevMembers, ...members]);
  };

  const removeMember = (id: number) => {
    setMembers((members) => members.filter((member) => member.id !== id));
  };

  return { members, addMember, addMembers, removeMember };
};

export default useMembers;
