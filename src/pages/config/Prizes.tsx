import usePrizes from "../../hooks/usePrizes";
import { useForm, SubmitHandler } from "react-hook-form";

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
    reset();
  };

  const listOfPrizes = (
    <ul>
      {prizes.map((prize) => (
        <li key={prize.id}>
          {prize.type} | {prize.quantity} | {prize.name}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="type">Type: </label>
          <input
            type="text"
            id="type"
            {...register("type", {
              required: true,
            })}
          ></input>
          {errors.type && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="name">name: </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: true,
            })}
          ></input>
          {errors.type && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            {...register("quantity", {
              required: true,
            })}
          ></input>
          {errors.type && <span>This field is required</span>}
        </div>

        <input type="submit" />
      </form>

      <div>{listOfPrizes}</div>
    </div>
  );
};
