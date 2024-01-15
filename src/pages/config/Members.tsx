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
    <div className="my-5">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Họ và tên</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.name}>
              <td className="border px-4 py-2">{member.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="ml-12">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <textarea
          className="w-full h-52 border border-gray-300 p-2 rounded-md"
          rows={10}
          id="name"
          placeholder="Danh sách tham gia, nhập tên cách nhau bởi dấu phẩy theo sau là dấu cách. VD: Nguyễn Văn A, Nguyễn Văn B"
          {...register("name", { required: true })}
        ></textarea>
        {errors.name && (
          <span className="block error-msg">This field is required</span>
        )}

        <div className="w-full flex justify-center mt-3">
          <button type="submit" className="btn-tertiary">
            Thêm
          </button>
        </div>
      </form>

      {listOfMembers}
    </div>
  );
};
