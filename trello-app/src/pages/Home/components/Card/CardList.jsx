import PropTypes from "prop-types";
import CardItem from "./CardItem";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

CardList.propTypes = {
  cards: PropTypes.array,
};

function CardList({ cards }) {
  const dndContextItems = cards?.map((c) => c._id);

  return (
    <SortableContext
      items={dndContextItems}
      strategy={verticalListSortingStrategy}
    >
      <div className="flex flex-col gap-4 h-full overflow-y-auto">
        {cards?.map((card) => (
          <CardItem key={card?._id} card={card} />
        ))}
      </div>
    </SortableContext>
  );
}

export default CardList;
