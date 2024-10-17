import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateFormPostTasks } from "../../../../utils/getTemplateFormPayloadPostTasks";
import PropTypes from "prop-types";
import {
  deleteTask,
  deleteTaskMiddleware,
} from "../../../../stores/slices/trelloSlice";

CardItem.propTypes = {
  card: PropTypes.object,
};

function CardItem({ card }) {
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
    id: card._id,
    data: { ...card },
  });

  const dndKitCardStyles = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const handleDeleteTask = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const newTasks = tasks?.filter((task) => task._id !== card._id);
      const payload = getTemplateFormPostTasks(newTasks, columns);
      dispatch(deleteTask(card._id));
      dispatch(deleteTaskMiddleware(payload));
    } catch (error) {
      throw new Error("Failed to delete task");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      className="bg-blue-500 rounded text-white cursor-grab"
    >
      <div className="flex justify-between">
        <h3 {...listeners} className="flex-1 px-3 py-2">
          {card?.content}
        </h3>
        <div className="flex items-center justify-center size-10">
          <button
            onClick={handleDeleteTask}
            className="hover:bg-white size-7 flex items-center justify-center hover:text-black rounded-full transition-all"
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
