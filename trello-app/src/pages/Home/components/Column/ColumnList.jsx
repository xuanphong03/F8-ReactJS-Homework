import PropTypes from "prop-types";
import ColumnItem from "./ColumnItem";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

ColumnList.propTypes = {
  columns: PropTypes.array,
};

function ColumnList({ columns }) {
  return (
    <SortableContext
      items={columns?.map((col) => col.column)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex gap-10 items-center">
        {columns?.map((col) => (
          <ColumnItem key={col.column} column={col} />
        ))}
      </div>
    </SortableContext>
  );
}

export default ColumnList;
