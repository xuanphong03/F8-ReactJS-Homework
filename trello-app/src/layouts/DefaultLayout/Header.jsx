import { MdPostAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addColumn } from "../../stores/slices/trelloSlice";

function Header() {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.trello);
  const handleAddColumn = () => {
    const payload = {
      id: uuidv4(),
      column: uuidv4(),
      columnName: `Cột ${columns?.length + 1}`,
    };
    dispatch(addColumn(payload));
  };
  return (
    <header className="h-16 bg-blue-400 px-10 flex items-center">
      <button
        onClick={handleAddColumn}
        className="flex items-center justify-center gap-2 rounded px-6 py-2 bg-white bg-opacity-80 hover:bg-opacity-50 transition-opacity"
      >
        <MdPostAdd className="text-xl" /> Thêm cột mới
      </button>
    </header>
  );
}

export default Header;
