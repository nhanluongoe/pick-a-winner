import { Fragment, useState } from "react";
import Dialog from "../../components/dialog";
import useAwards from "../../hooks/use-awards";
import usePrizes from "../../hooks/use-prizes";
import { Prize } from "../../models/prize";
import useXlsx from "../../hooks/use-xlsx";
import { hidePrefix } from "../../utils/hide-prefix";

export default function Awards() {
  const { awards } = useAwards();
  const { prizes } = usePrizes();
  const [activePrize, setActivePrize] = useState<Prize>();
  const listOfWinners = awards.find((a) => a.prize === activePrize?.name)
    ?.members;

  const { download } = useXlsx();

  const [open, setOpen] = useState<boolean>(false);

  const handleClickPrize = (prize: Prize) => {
    setOpen(true);
    setActivePrize(prize);
  };

  const handleDownload = () => {
    download(
      listOfWinners?.map((w) => ({ name: w })),
      activePrize?.name ?? "export",
    );
  };

  const listOfAwards = (
    <div>
      <p className="text-center text-2xl">
        {activePrize?.initialQuantity} {activePrize?.name} - {activePrize?.type}
      </p>

      <div className="flex justify-center items-center flex-col my-8">
        <table className="table-auto">
          <tbody>
            {listOfWinners?.map((w, idx) => (
              <Fragment key={w}>
                <tr>
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">{hidePrefix(w)}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="ml-12">
      <div className="grid grid-cols-3 gap-12">
        {prizes.map((prize) => (
          <div
            className="card-prize"
            onClick={() => handleClickPrize(prize)}
            key={prize.name}
          >
            <p className="text-center">
              {prize.initialQuantity} {prize.name} - {prize.type}
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
        okAction={{
          text: "Xuất danh sách",
          onClick: () => {
            setOpen(false);
            handleDownload();
          },
        }}
      />
    </div>
  );
}
