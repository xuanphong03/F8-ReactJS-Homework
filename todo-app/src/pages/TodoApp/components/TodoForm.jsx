import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm({ onSubmit }) {
  const [newTodo, setNewTodo] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setNewTodo(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo && onSubmit) {
      await onSubmit(newTodo);
      setNewTodo('');
    } else if (newTodo.length <= 1) {
      toast.warning('Todo cần có trên 1 kí tự');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b border-solid border-teal-500 py-5"
    >
      <div className="flex items-center justify-between gap-5">
        <input
          autoFocus
          autoComplete="off"
          value={newTodo}
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
      </div>
    </form>
  );
}

export default TodoForm;
