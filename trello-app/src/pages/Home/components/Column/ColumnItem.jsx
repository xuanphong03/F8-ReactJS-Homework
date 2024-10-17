import PropTypes from "prop-types";
import { MdOutlineNoteAdd } from "react-icons/md";
import CardList from "../Card/CardList";
import { AiOutlineDelete } from "react-icons/ai";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addTask,
  deleteTaskMiddleware,
  postTaskMiddleware,
} from "../../../../stores/slices/trelloSlice";
import { getTemplateFormPostTasks } from "../../../../utils/getTemplateFormPayloadPostTasks";

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
      const payload = getTemplateFormPostTasks(tasks, columns);
      const newTask = {
        column: column.column,
        columnName: column.columnName,
        content: `Công việc ${tasks.length + 1}`,
      };
      payload.push(newTask);
      dispatch(addTask({ _id: uuidv4(), ...newTask }));
      dispatch(postTaskMiddleware(payload));
    } catch (error) {
      throw new Error("Failed to add new task");
    }
  };

  const handleDeleteColumn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const newColumns = columns.filter((col) => col.column !== column.column);
      const payload = getTemplateFormPostTasks(tasks, newColumns);
      dispatch(deleteTaskMiddleware(payload));
    } catch (error) {
      throw new Error("Failed to delete column");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
      className="shrink-0 flex flex-col bg-white w-[350px] h-125 rounded overflow-hidden shadow-xl"
    >
      <div className=" bg-gray-200 h-10 font-medium flex items-center justify-between">
        <h3 {...listeners} className="cursor-grab flex-1 p-2">
          {column?.columnName}
        </h3>
        <button
          onClick={handleDeleteColumn}
          className="flex items-center justify-center size-6 rounded-full hover:bg-white mr-2"
        >
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
