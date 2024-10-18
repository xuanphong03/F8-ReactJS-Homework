import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PropTypes from "prop-types";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  deleteTaskMiddleware,
  updateTaskContent,
  updateTaskMiddleware,
} from "../../../../stores/slices/trelloSlice";
import { getTemplateFormPostTasks } from "../../../../utils/getTemplateFormPayloadPostTasks";
import EdiText from "react-editext";
import { useState } from "react";

CardItem.propTypes = {
  card: PropTypes.object,
};

function CardItem({ card }) {
  const dispatch = useDispatch();
  const { tasks, columns } = useSelector((state) => state.trello);
  const [taskContent, setTaskContent] = useState(card?.content);
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

  const handleUpdateTaskContent = (content) => {
    setTaskContent(content);
    const payload = getTemplateFormPostTasks(tasks, columns);
    const targetTask = payload.find((t) => t.column === card.column);
    targetTask.content = content;
    dispatch(updateTaskContent({ column: card.column, content }));
    dispatch(updateTaskMiddleware(payload));
  };

  return (
    <div
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      className="bg-blue-500 rounded text-white cursor-grab border-2 border-solid border-black overflow-hidden"
    >
      <div className="flex justify-between bg-blue-400">
        <EdiText
          type="text"
          value={taskContent}
          onSave={handleUpdateTaskContent}
          className="flex-1 px-3 py-2 text-black"
        />
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
