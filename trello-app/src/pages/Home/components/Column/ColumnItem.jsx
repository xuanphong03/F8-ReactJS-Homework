import PropTypes from "prop-types";
import { MdOutlineNoteAdd } from "react-icons/md";
import CardList from "../Card/CardList";
import { AiOutlineDelete } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { postTask } from "../../../../stores/slices/trelloSlice";

ColumnItem.propTypes = {
  column: PropTypes.object,
};

function ColumnItem({ column }) {
  const dispatch = useDispatch();
  const { tasks, columns } = useSelector((state) => state.trello);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.column,
    data: { ...column },
  });

  const dndKitColumnStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const handleAddTask = () => {
    try {
      const payload = [];
      tasks.forEach((task) => {
        const col = columns.find((col) => col.column === task.column);
        if (col) {
          payload.push({
            content: task.content,
            column: col.column,
            columnName: col.columnName,
          });
        }
      });
      const newTask = {
        column: column.column,
        columnName: column.columnName,
        content: "Task mới",
      };
      payload.push(newTask);
      dispatch(postTask(payload));
    } catch (error) {
      throw new Error("Failed to add new task");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
      className="flex flex-col shrink-0 bg-white w-[350px] h-125 rounded overflow-hidden shadow-xl"
    >
      <div
        {...listeners}
        className="cursor-grab bg-gray-200 font-medium p-2 flex items-center justify-between"
      >
        <h3>{column?.columnName}</h3>
        <button className=" rounded-full hover:bg-white">
          <AiOutlineDelete className="text-xl" />
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        <CardList cards={column?.tasks} />
      </div>
      <button
        onClick={handleAddTask}
        className="w-full flex items-center gap-2 p-2 hover:bg-gray-200 transition-colors"
      >
        <MdOutlineNoteAdd />
        Thêm task
      </button>
    </div>
  );
}

export default ColumnItem;
