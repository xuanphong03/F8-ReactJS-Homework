import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addColumn, getTasks } from "../../stores/slices/trelloSlice";
import ColumnList from "./components/Column/ColumnList";
import { groupTasksByColumn } from "../../utils/groupTasksByColumn";
import { arrayMove } from "@dnd-kit/sortable";
import ColumnItem from "./components/Column/ColumnItem";
import CardItem from "./components/Card/CardItem";
import { cloneDeep } from "lodash";

const ACTIVE_DRAG_ITEM_TYPE = {
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
};

function Home() {
  const dispatch = useDispatch();
  const { columns, tasks } = useSelector((state) => state.trello);
  const [orderedColumns, setOrderedColumns] = useState([]);

  // Cùng một thời điểm chỉ có một thời phần tử đang được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  // Tìm một cái Column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column.tasks.map((task) => task._id)?.includes(cardId)
    );
  };

  // Func: Xử lý việc di chuyển card giữa 2 columns khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      // Tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard sắp được thả)
      const overCardIndex = overColumn?.tasks?.findIndex(
        (card) => card._id === overCardId
      );

      // Logic tính toán cho "cardIndex mới" (trên hoặc dưới của overCard)
      let newCardIndex;
      const isBellowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBellowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.tasks?.length + 1;

      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (c) => c.column === activeColumn.column
      );
      const nextOverColumn = nextColumns.find(
        (c) => c.column === overColumn.column
      );

      // Column cũ
      if (nextActiveColumn) {
        // Xóa card ở cái column active (column cũ, cái lúc mà kéo card sang column khác)
        nextActiveColumn.tasks = nextActiveColumn.tasks.filter(
          (task) => task._id !== activeDraggingCardId
        );
      }

      // nextOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa? Nếu có thì cần xóa nó trước
        nextOverColumn.tasks = nextOverColumn.tasks.filter(
          (task) => task._id !== activeDraggingCardId
        );
        // Cập nhật lại column chuẩn cho card
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          column: nextOverColumn.column,
        };
        // Thêm cái card đang kéo vào over column theo index mới
        nextOverColumn.tasks = nextOverColumn.tasks.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );
      }

      return nextColumns;
    });
  };

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnName
        ? ACTIVE_DRAG_ITEM_TYPE.COLUMN
        : ACTIVE_DRAG_ITEM_TYPE.CARD
    );
    setActiveDragItemData(event?.active?.data?.current);

    // Nếu là kéo card thì mới thực hiện hành động set gi column
    if (!event?.active?.data?.current?.columnName) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    // Không làm gì thêm nếu như kéo column vì đã xử lý kéo column ở handleDragEnd
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    // Xử lý kéo card qua lại giữa các column
    // console.log("handleDragOver", event);
    const { active, over } = event;

    // Nếu không tồn tại active hoặc over (Kéo linh tinh ra ngoài) thì sẽ không làm gì cả
    if (!active || !over) return;

    // activeDraggingId: Là cái card đang được kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    // overCard: Là cái card đang tương tác trên hoặc dưới so với cái card ở trên
    const { id: overCardId } = over;

    // Tìm ra 2 cái columns theo card id
    const activeColumn = findColumnByCardId(activeDragItemId);
    const overColumn = findColumnByCardId(overCardId);

    // Nếu kéo vào phần khoảng trắng của các column (không over qua các phần tử nào trong cột) thì mặc định newIndex ở cuối
    if (!activeColumn || !overColumn) {
      const { id: overColumnId } = over;
      setOrderedColumns((prevColumns) => {
        const overColumn = prevColumns.find((c) => c.column === overColumnId);
        const newCardIndex = overColumn.tasks.length;

        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumn = nextColumns.find(
          (c) => c.column === activeColumn.column
        );
        const nextOverColumn = nextColumns.find(
          (c) => c.column === overColumn.column
        );
        // Column cũ
        if (nextActiveColumn) {
          // Xóa card ở cái column active (column cũ, cái lúc mà kéo card sang column khác)
          nextActiveColumn.tasks = nextActiveColumn.tasks.filter(
            (task) => task._id !== activeDraggingCardId
          );
        }
        // Column mới
        if (nextOverColumn) {
          // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa? Nếu có thì cần xóa nó trước
          nextOverColumn.tasks = nextOverColumn.tasks.filter(
            (task) => task._id !== activeDraggingCardId
          );
          // Thêm cái card đang kéo vào over column theo index mới
          nextOverColumn.tasks = nextOverColumn.tasks.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          );
        }
        return nextColumns;
      });
      return;
    }

    if (activeColumn.column !== overColumn.column) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = (event) => {
    // console.log("handleDragEnd", event);
    const { active, over } = event;

    // Cần đảm bảo Nếu không tồn tại active hoặc over (Kéo linh tinh ra ngoài)
    // thì sẽ không làm gì cả
    if (!active || !over) return;

    // Xử lý kéo thả Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingId: Là cái card đang được kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      // overCard: Là cái card đang tương tác trên hoặc dưới so với cái card ở trên
      const { id: overCardId } = over;

      // Tìm ra 2 cái columns theo card id
      const activeColumn = findColumnByCardId(activeDragItemId);
      const overColumn = findColumnByCardId(overCardId);

      // Nếu không tồn tại 1 trong 2 column thì không làm gì hết
      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard.column !== overColumn.column) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        // Cập nhật lại state columns ban đầu sau khi kéo thả
        const oldCardIndex = oldColumnWhenDraggingCard?.tasks?.findIndex(
          (c) => c._id === activeDragItemId
        );
        const newCardIndex = overColumn?.tasks?.findIndex(
          (c) => c._id === overCardId
        );
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.tasks,
          oldCardIndex,
          newCardIndex
        );
        setOrderedColumns((prevOrderedColumns) => {
          const nextColumn = cloneDeep(prevOrderedColumns);
          // Tìm tới column mà đang drop
          const targetColumn = nextColumn.find(
            (column) => column.column === overColumn.column
          );
          targetColumn.tasks = dndOrderedCards;

          return nextColumn;
        });
      }
    }

    // Xử lý kéo thả Column vị trí kéo thả khác với vị trí ban đầu
    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      // Cập nhật lại state columns ban đầu sau khi kéo thả
      setOrderedColumns((prevOrderedColumns) => {
        // Lấy vị trí cũ (từ active) và lấy vị trí mới (từ over)
        const oldColumnIndex = prevOrderedColumns.findIndex(
          (c) => c.column === active.id
        );
        const newColumnIndex = prevOrderedColumns.findIndex(
          (c) => c.column === over.id
        );
        return arrayMove(prevOrderedColumns, oldColumnIndex, newColumnIndex);
      });
    }

    // Sau khi kéo thả đưa về giá trị null mặc định ban đầu
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const handleAddColumn = () => {
    const payload = {
      id: uuidv4(),
      column: uuidv4(),
      columnName: "Cột mới",
    };
    dispatch(addColumn(payload));
  };

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    setOrderedColumns(groupTasksByColumn(tasks, columns));
  }, [columns, tasks]);

  return (
    <div className="h-screen bg-blue-400 flex items-center justify-center overflow-x-auto">
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ColumnList columns={orderedColumns} />

        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemId || !activeDragItemType) && null}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <ColumnItem column={activeDragItemData} />
            )}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <CardItem card={activeDragItemData} />
            )}
        </DragOverlay>
      </DndContext>
      <div className="shrink-0 h-125 ml-10 w-80">
        <button
          onClick={handleAddColumn}
          className="flex items-center justify-center gap-2 w-full rounded px-3 py-2 bg-blue-200 bg-opacity-80 hover:bg-opacity-50 transition-opacity"
        >
          <MdPostAdd className="text-xl" /> Thêm cột
        </button>
      </div>
    </div>
  );
}

export default Home;
