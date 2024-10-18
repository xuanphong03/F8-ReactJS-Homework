import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  MouseSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnList from "./components/Column/ColumnList";
import { groupTasksByColumn } from "../../utils/groupTasksByColumn";
import { arrayMove } from "@dnd-kit/sortable";
import ColumnItem from "./components/Column/ColumnItem";
import CardItem from "./components/Card/CardItem";
import { cloneDeep } from "lodash";
import { getTemplateFormPostTasks } from "../../utils/getTemplateFormPayloadPostTasks";
import {
  getTasksMiddleware,
  updateTaskMiddleware,
} from "../../stores/slices/trelloSlice";
import { REQUEST_STATUS } from "../../constants/request-status";

const ACTIVE_DRAG_ITEM_TYPE = {
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
};

function Home() {
  const dispatch = useDispatch();
  const {
    columns,
    tasks,
    status: dataSynchronizationStatus,
  } = useSelector((state) => state.trello);
  const [orderedColumns, setOrderedColumns] = useState([]);

  // Cùng một thời điểm chỉ có một thời phần tử đang được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);
  const lastOverId = useRef(null);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(mouseSensor);

  // Đồng bộ dữ liệu khi di chuyển cột hoặc task
  const handleDataSynchronization = (nextColumns) => {
    const newTasks = nextColumns.reduce((result, { tasks }) => {
      return [...result, ...tasks];
    }, []);
    const payloadPostTask = getTemplateFormPostTasks(newTasks, columns);
    dispatch(updateTaskMiddleware(payloadPostTask));
  };

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
    activeDraggingCardData,
    dataSynchronizationStatus = false
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

      if (dataSynchronizationStatus) {
        console.log("Fetch data");
        handleDataSynchronization(nextColumns);
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
        const dataSynchronizationStatus = true;
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          dataSynchronizationStatus
        );
        console.log("Call api đổi vị trí giữa 2 cột khác nhau ở đây!");
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

        const nextColumns = cloneDeep(orderedColumns);
        // Tìm tới column mà đang drop
        const targetColumn = nextColumns.find(
          (column) => column.column === overColumn.column
        );
        targetColumn.tasks = dndOrderedCards;
        setOrderedColumns(nextColumns);

        // Call api cập nhật lại vị trí
        if (newCardIndex !== oldCardIndex) {
          handleDataSynchronization(nextColumns);
        }
      }
    }

    // Xử lý kéo thả Column vị trí kéo thả khác với vị trí ban đầu
    if (
      activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
      active.id !== over.id
    ) {
      // Lấy vị trí cũ (từ active) và lấy vị trí mới (từ over)
      const oldColumnIndex = orderedColumns.findIndex(
        (c) => c.column === active.id
      );
      const newColumnIndex = orderedColumns.findIndex(
        (c) => c.column === over.id
      );
      const nextColumns = arrayMove(
        orderedColumns,
        oldColumnIndex,
        newColumnIndex
      );
      // Cập nhật lại state columns ban đầu sau khi kéo thả
      setOrderedColumns(nextColumns);
      // Call api cập nhật lại vị trí
      handleDataSynchronization(nextColumns);
    }

    // Sau khi kéo thả đưa về giá trị null mặc định ban đầu
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  // Custom lại thuật toán phát hiện va chạm tối ưu cho việc kéo thả
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      // First, let's see if there are any collisions with the pointer
      const pointerIntersection = pointerWithin(args);

      if (!pointerIntersection?.length) return;

      let overId = getFirstCollision(pointerIntersection, "id");
      if (overId) {
        const checkColumn = orderedColumns.find((col) => col.column === overId);
        if (checkColumn) {
          const orderedColumnIds = checkColumn?.tasks?.map((c) => c._id);
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId &&
                orderedColumnIds?.includes(container.id)
            )[0]?.id,
          });
          if (!overId.length) {
            overId = orderedColumnIds[orderedColumnIds.length - 1];
          }
        }
        lastOverId.current = overId;
        return [{ id: overId }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  useEffect(() => {
    dispatch(getTasksMiddleware());
  }, [dispatch]);

  useEffect(() => {
    const newOrderedColumns = groupTasksByColumn(tasks, columns);
    setOrderedColumns(newOrderedColumns);
  }, [columns, tasks]);

  return (
    <div className="flex items-center  gap-10 px-10">
      {dataSynchronizationStatus === REQUEST_STATUS.PENDING && (
        <p className="absolute top-4 left-1/2 -translate-x-1/2">
          Đang thực hiện đồng bộ dữ liệu...
        </p>
      )}
      <DndContext
        // collisionDetection={closestCorners}
        collisionDetection={collisionDetectionStrategy}
        sensors={sensors}
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
    </div>
  );
}

export default Home;
