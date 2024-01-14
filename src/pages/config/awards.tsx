import { useState } from "react";
import Dialog from "../../components/dialog";
import useAwards from "../../hooks/useAwards";
import usePrizes from "../../hooks/usePrizes";
import { Prize } from "../../models/prize";

export default function Awards() {
  const { awards } = useAwards();
  const { prizes } = usePrizes();
  const [activePrize, setActivePrize] = useState<Prize>();
  const listOfWinners = awards.find((a) => a.prize === activePrize?.name)
    ?.members;

  const [open, setOpen] = useState<boolean>(false);

  const handleClickPrize = (prize: Prize) => {
    setOpen(true);
    setActivePrize(prize);
  };

  const listOfAwards = (
    <div>
      <p>
        {activePrize?.initialQuantity} {activePrize?.name} - {activePrize?.type}
      </p>

      <div>
        <p>Họ và Tên</p>
        <div>{listOfWinners?.map((w) => <p key={w}>{w}</p>)}</div>
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-12">
        {prizes.map((prize) => (
          <div
            className="card-prize"
            onClick={() => handleClickPrize(prize)}
            key={prize.name}
          >
            <p className="text-center">
              {prize.quantity} {prize.name} - {prize.type}
            </p>
          </div>
        ))}
      </div>

      <Dialog
        title="KẾT QUẢ TRÚNG THƯỞNG"
        description={listOfAwards}
        open={open}
        rejectAction={{
          text: "Đóng",
          onClick: () => setOpen(false),
        }}
      />
    </>
  );
}
