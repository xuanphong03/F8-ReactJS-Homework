import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MODE } from '~/constant/modes';

TodoForm.propTypes = {
  onCreateTodo: PropTypes.func,
  onSearchTodo: PropTypes.func,
};

function TodoForm({ onCreateTodo, onSearchTodo }) {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState(MODE.CREATE);

  const handleChange = (e) => {
    const todoName = e.target.value;
    setValue(todoName);
    if (mode === MODE.SEARCH && onSearchTodo) {
      onSearchTodo(todoName);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    setMode(MODE.CREATE);
    if (!onCreateTodo || !value) return;
    await onCreateTodo(value, mode);
    setValue('');
  };

  const handleChangeToSearchMode = () => {
    if (onSearchTodo) {
      onSearchTodo(value);
    }
    setMode(MODE.SEARCH);
    if (mode !== MODE.SEARCH) {
      toast.success('Đã chuyển sang chế độ tìm kiếm');
    }
  };

  return (
    <form
      onSubmit={handleCreateTodo}
      className="border-b border-solid border-teal-500 py-5"
    >
      <div className="flex items-center justify-between gap-5">
        <input
          autoFocus
          autoComplete="off"
          value={value}
          onChange={handleChange}
          type="text"
          name="todo-name"
          placeholder="Thêm một công việc mới"
          className="flex-1 bg-transparent text-xs outline-none sm:text-sm md:text-base"
        />
        <button
          type="submit"
          className="rounded-md bg-teal-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-teal-700 sm:text-sm"
        >
          Thêm mới
        </button>
        <button
          onClick={handleChangeToSearchMode}
          className="rounded-md bg-orange-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-orange-700 sm:text-sm"
          type="button"
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
