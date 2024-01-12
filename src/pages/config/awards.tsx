import Dialog from "../../components/dialog";
import useAwards from "../../hooks/useAwards";

export default function Awards() {
  const { awards } = useAwards();

  return (
    <div>
      <Dialog />
    </div>
  );
}
