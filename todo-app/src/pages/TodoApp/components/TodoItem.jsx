import PropTypes from 'prop-types';
import { useState } from 'react';

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
};

function TodoItem({ _id, todo, isCompleted, onUpdate, onDelete }) {
  const [data, setData] = useState({
    todo,
    isCompleted,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChangeValue = (e) => {
    const { value } = e.target;
    setData((prevData) => ({ ...prevData, todo: value }));
  };

  const handleToggleUpdateTodo = () => {
    setIsUpdating((prevStatus) => {
      if (prevStatus) {
        setData({ todo, isCompleted });
      }
      return !prevStatus;
    });
  };

  const handleDeleteTodo = () => {
    if (onDelete && window.confirm('Bạn chắc chắn muốn xóa Todo này không?')) {
      onDelete(_id);
    }
  };

  const handleUpdate = async () => {
    const payload = {
      _id,
      ...data,
    };
    if (onUpdate) {
      await onUpdate(payload);
      setIsUpdating(false);
    }
  };

  const handleToggleCompletedStatus = () => {
    setData((prevData) => ({
      ...prevData,
      isCompleted: !prevData.isCompleted,
    }));
  };

  return (
    <div className="mb-5 rounded-md bg-white px-8 py-6">
      <div className="relative mb-5">
        <input
          disabled={!isUpdating}
          type="text"
          name="todo-item"
          value={data.todo}
          onChange={handleChangeValue}
          className={`w-full rounded border border-solid border-gray-300 px-4 py-2 text-sm text-gray-700 ${data.isCompleted ? 'line-through' : ''}`}
        />
      </div>
      {isUpdating && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <label className="leading-none" htmlFor={_id}>
              Not completed
            </label>
            <input
              onChange={handleToggleCompletedStatus}
              type="checkbox"
              id={_id}
              name="completed_status"
              checked={data.isCompleted}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleUpdateTodo}
              className="rounded bg-yellow-500 px-5 py-2 hover:bg-opacity-80"
            >
              Thoát
            </button>
            <button
              onClick={handleUpdate}
              className="rounded bg-green-500 px-5 py-2 hover:bg-opacity-80"
            >
              Sửa
            </button>
            <button
              onClick={handleDeleteTodo}
              className="rounded bg-red-500 px-5 py-2 hover:bg-opacity-80"
            >
              Xóa
            </button>
          </div>
        </div>
      )}
      {!isUpdating && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleUpdateTodo}
            className="rounded bg-green-500 px-5 py-2 hover:bg-opacity-80"
          >
            Sửa
          </button>
          <button
            onClick={handleDeleteTodo}
            className="rounded bg-red-500 px-5 py-2 hover:bg-opacity-80"
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
