import usePrizes from "../../hooks/usePrizes";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-stacked-toast";

interface PrizeForm {
  type: string;
  name: string;
  quantity: number;
}

export const Prizes = () => {
  const { prizes, addPrize } = usePrizes();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrizeForm>();

  const onSubmit: SubmitHandler<PrizeForm> = (data) => {
    addPrize({ ...data, initialQuantity: data.quantity });
    toast.success({
      title: "Thêm thành công",
    });
    reset();
  };

  const listOfPrizes = (
    <div className="my-3">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Giải thưởng</th>
            <th className="px-4 py-2">Phần thưởng</th>
            <th className="px-4 py-2">Số lượng</th>
            <th className="px-4 py-2">Số lượng còn lại</th>
          </tr>
        </thead>

        <tbody>
          {prizes.map((prize) => (
            <tr key={prize.name}>
              <td className="border px-4 py-2">{prize.name}</td>
              <td className="border px-4 py-2">{prize.type}</td>
              <td className="border px-4 py-2">{prize.quantity}</td>
              <td className="border px-4 py-2">{prize.initialQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 justify-center items-center"
      >
        <div>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: true,
            })}
            placeholder="Tên giải thưởng"
          ></input>
          {errors.type && (
            <span className="block error-msg">This field is required</span>
          )}
        </div>

        <div>
          <input
            type="text"
            id="type"
            {...register("type", {
              required: true,
            })}
            placeholder="Tên phần thưởng"
          ></input>
          {errors.type && (
            <span className="block error-msg">This field is required</span>
          )}
        </div>

        <div>
          <input
            type="number"
            id="quantity"
            {...register("quantity", {
              required: true,
            })}
            placeholder="Số lượng"
          ></input>
          {errors.type && (
            <span className="block error-msg">This field is required</span>
          )}
        </div>

        <button type="submit" className="btn-tertiary">
          Thêm
        </button>
      </form>

      <div>{listOfPrizes}</div>
    </div>
  );
};
