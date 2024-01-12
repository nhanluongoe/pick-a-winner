import { SubmitHandler, useForm } from "react-hook-form";
import useMembers from "../../hooks/useMembers";

import { toast } from "react-stacked-toast";

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
    toast.success({
      title: "Thêm thành công",
    });
    reset();
  };

  const listOfMembers = (
    <ul>
      {members.map((member) => (
        <li key={member.name}>{member.name}</li>
      ))}
    </ul>
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <textarea
          className="w-full h-52 border border-gray-300 p-2 rounded-md"
          rows={10}
          id="name"
          placeholder="Danh sách tham gia, nhập tên cách nhau bởi dấu phẩy"
          {...register("name", { required: true })}
        ></textarea>
        {errors.name && <span>This field is required</span>}

        <div className="w-full flex justify-center mt-3">
          <button type="submit" className="btn-primary">
            Thêm
          </button>
        </div>
      </form>

      {listOfMembers}
    </div>
  );
};
