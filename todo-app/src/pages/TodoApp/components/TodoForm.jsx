import { useState } from 'react';
import { toast } from 'react-toastify';
import { MODE } from '~/constant/modes';

import PropTypes from 'prop-types';

TodoForm.propTypes = {
  onCreateTodo: PropTypes.func,
  onSearchTodo: PropTypes.func,
};

function TodoForm({ onCreateTodo, onSearchTodo }) {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState(MODE.CREATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Nếu đang tạo todo thì sẽ prevent sự kiện thêm mới todo
    // tránh duplicate nhiều todo giống nhau
    if (!onCreateTodo || isSubmitting) return;
    if (value.length <= 1) {
      return toast.warning('Tên todo phải chứa nhiều hơn 1 ký tự');
    }
    setIsSubmitting(true);
    await onCreateTodo(value, mode);
    setValue('');
    setIsSubmitting(false);
  };

  const handleChangeToSearchMode = () => {
    if (onSearchTodo) {
      onSearchTodo(value);
    }
    setMode(MODE.SEARCH);
    toast.success('Đã chuyển sang chế độ tìm kiếm');
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
          className={`hover:bg-teal-700' cursor-pointer rounded-md bg-teal-500 px-4 py-2 text-xs font-medium text-white transition-colors sm:text-sm`}
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
