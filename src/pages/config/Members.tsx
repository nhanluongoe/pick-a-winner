import { SubmitHandler, useForm } from "react-hook-form";
import useMembers from "../../hooks/useMembers";

interface MemberForm {
  name: string;
}

export const Members = () => {
  const { members, addMembers } = useMembers();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemberForm>();

  const onSubmit: SubmitHandler<MemberForm> = (data) => {
    const members = data.name.split(", ").map((name) => ({ name }));
    addMembers(members);
    reset();
  };

  const listOfMembers = (
    <ul>
      {members.map((member) => (
        <li key={member.id}>{member.name}</li>
      ))}
    </ul>
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name: </label>
        <textarea
          rows={10}
          id="name"
          {...register("name", { required: true })}
        ></textarea>
        {errors.name && <span>This field is required</span>}

        <input type="submit" value="Submit"></input>
      </form>

      {listOfMembers}
    </div>
  );
};
