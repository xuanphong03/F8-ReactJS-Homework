import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PropTypes from "prop-types";
import { MdDeleteOutline } from "react-icons/md";

CardItem.propTypes = {
  card: PropTypes.object,
};

function CardItem({ card }) {
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

  const handleRemoveTask = () => {
    console.log("Xóa");
  };

  return (
    <div
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      className="bg-blue-500 rounded text-white cursor-grab"
    >
      <div className="flex justify-between">
        <h4 {...listeners} className="flex-1 px-3 py-2">
          {card?.content}
        </h4>
        <div className="flex items-center justify-center size-10">
          <button
            onClick={handleRemoveTask}
            className=" hover:bg-white hover:text-black rounded-full transition-all"
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardItem;
