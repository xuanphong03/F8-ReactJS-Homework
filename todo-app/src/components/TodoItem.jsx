import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';

TodoItem.propTypes = {
  _id: PropTypes.string.isRequired,
  todo: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,

  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
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
      // Nếu người dùng bấm hủy thì sẽ reset lại trạng thái todo như ban đầu
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
          className={`w-full rounded border-2 border-solid border-gray-300 px-4 py-2 text-sm text-gray-700 outline-none focus:border-blue-500 ${data.isCompleted ? 'line-through' : ''}`}
        />
      </div>
      {isUpdating && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <p
              onClick={handleToggleCompletedStatus}
              className="cursor-pointer font-semibold leading-none tracking-wide"
              htmlFor={_id}
            >
              {data.isCompleted ? 'Completed' : 'Not completed'}
            </p>
            <div
              onClick={handleToggleCompletedStatus}
              className={`flex size-5 cursor-pointer items-center justify-center rounded border border-solid text-xs ${data.isCompleted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-500 bg-white'}`}
            >
              {data.isCompleted && <FaCheck />}
            </div>
          </div>
          <div className="flex items-center gap-3 font-medium">
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
        <div className="flex items-center gap-3 font-medium">
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
