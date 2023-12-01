export const Header = () => {
  return (
    <div className="w-full flex border-b-2 border-gray-200 px-5 py-3">
      <span className="w-1/5 text-gray-400 font-semibold">
        <input type="checkbox" disabled />
      </span>
      <span className="w-1/5  text-gray-400 font-semibold">Name</span>
      <span className="w-1/5  text-gray-400 font-semibold">Email</span>
      <span className="w-1/5  text-gray-400 font-semibold">Role</span>
      <span className="w-1/5  text-gray-400 font-semibold">Actions</span>
    </div>
  );
};
