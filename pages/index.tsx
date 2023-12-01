import { Loader } from "@app/components/Loader";
import { Header } from "@app/components/Header";
import { List } from "@app/components/List";
import { useEffect, useMemo, useState } from "react";

export interface Data {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
}

const Home = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [currLimit, setLimit] = useState({
    min: 0,
    max: 10,
    page: 1,
  });

  const [selected, setSelected] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const bulkDelete = () => {
    const newData = data.filter((item) => !selected.includes(item.id));
    setData(newData);
    setSelected([]);
    handlePaginationOnDelete();
  };

  const handlePaginationOnDelete = () => {
    let isEmpty = pagination * 10 > data.length;
    if (currLimit.page === pagination && isEmpty) {
      handlePagination(pagination - 1);
    }
  };

  const handleSingleDelete = (val: string) => {
    const newData = data.filter((item) => val !== item.id);
    setData(newData);
  };

  const pagination = useMemo(() => {
    return Math.ceil(data.length / 10);
  }, [data]);

  const handlePagination = (val: number) => {
    let min = 10 * val - 10;

    setLimit({
      page: val,
      min,
      max: min + 10,
    });
  };

  const selectData = (val: string) => {
    const index = selected.indexOf(val);

    if (index === -1) {
      // Element not found, add it to the array
      setSelected((el) => [...el, val]);
    } else {
      // Element found, remove it from the array
      const newArray = [...selected];
      newArray.splice(index, 1);
      setSelected(newArray);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleUpdate = (id: string, name: string, email: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              name,
              email,
              id,
              role: item.role,
            }
          : item
      )
    );
  };

  return (
    <main className="p-10 h-screen">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search for a user"
          className="outline-none rounded-md py-1 px-2 border-2 border-gray-200"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          onClick={bulkDelete}
          className="border-2 border-red-500 px-3 rounded-md"
          disabled={selected.length === 0}
        >
          Bulk Delete
        </button>
      </div>
      {isLoading && <Loader />}
      {!isLoading && data.length > 0 && (
        <section className="min-h-[90%] border-2 border-gray-20 mt-10 rounded-md flex flex-col">
          <Header />
          {data
            .filter((el) =>
              el.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .slice(currLimit.min, currLimit.max)
            .map((el) => (
              <List
                handleUpdate={handleUpdate}
                handleDelete={handleSingleDelete}
                name={el.name}
                role={el.role}
                id={el.id}
                email={el.email}
                key={el.id}
                selectData={selectData}
              />
            ))}
          <div className="w-full flex border-b-2 border-gray-200 px-5 py-3 justify-between">
            <span className="text-sm font-semibold text-gray-400">
              {selected.length} of {data.length} selected
            </span>
            <div className="flex gap-3">
              {new Array(pagination).fill(false).map((_, index) => (
                <button
                  onClick={() => handlePagination(index + 1)}
                  key={index}
                  className={`border-2 border-gray-300 px-4 rounded-md ${
                    index + 1 === currLimit.page ? "bg-red-950 text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
