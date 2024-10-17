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
  return (
    <SortableContext
      items={cards?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <div className="flex flex-col gap-4 h-full">
        {cards?.map((card) => (
          <CardItem key={card?._id} card={card} />
        ))}
      </div>
    </SortableContext>
  );
}

export default CardList;
