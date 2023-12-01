import { Data } from "@app/pages/index";
import { Bucket } from "./Bucket";
import { EditModal } from "./EditModal";
interface IData extends Data {
  selectData: (id: string) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, name: string, email: string) => void;
}

export const List = ({
  name,
  email,
  role,
  id,
  selectData,
  handleDelete,
  handleUpdate,
}: IData) => {
  return (
    <div className="w-full flex border-b-2 border-gray-200 px-5 py-3 hover:bg-gray-100 ">
      <span className="w-1/5 text-gray-400 font-semibold">
        <input type="checkbox" onChange={() => selectData(id)} />
      </span>
      <span className="w-1/5 ">{name}</span>
      <span className="w-1/5 ">{email}</span>
      <span className="w-1/5 ">{role}</span>
      <span className="w-1/5 gap-3 flex">
        <EditModal
          name={name}
          email={email}
          id={id}
          handleUpdate={handleUpdate}
        />
        <button
          className="border-2 border-red-500 px-2 py-2 rounded-md text-red-600"
          onClick={() => handleDelete(id)}
        >
          <Bucket />
        </button>
      </span>
    </div>
  );
};
