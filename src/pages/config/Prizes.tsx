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
    console.log("submit");
    console.log(data);
    addPrize(data);
    toast.success({
      title: "Thêm thành công",
    });
    reset();
  };

  const listOfPrizes = (
    <ul>
      {prizes.map((prize) => (
        <li key={prize.name}>
          {prize.quantity} | {prize.name} | {prize.type}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 justify-center items-center"
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
          {errors.type && <span>This field is required</span>}
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
          {errors.type && <span>This field is required</span>}
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
          {errors.type && <span>This field is required</span>}
        </div>

        <button type="submit" className="btn-tertiary">
          Thêm
        </button>
      </form>

      <div>{listOfPrizes}</div>
    </div>
  );
};
