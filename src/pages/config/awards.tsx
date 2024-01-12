import Dialog from "../../components/dialog";
import useAwards from "../../hooks/useAwards";

export default function Awards() {
  const { awards } = useAwards();

  console.log(awards);

  return (
    <div>
      {awards.map((award) => (
        <div key={award.prize} className="my-3">
          <p className="font-bold capitalize">{award.prize}</p>
          {award.members.map((member) => (
            <p key={member} className="capitalize">
              {member}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
