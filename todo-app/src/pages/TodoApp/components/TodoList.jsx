import PropTypes from 'prop-types';
import TodoItem from '~/components/TodoItem';

TodoList.propTypes = {
  todoList: PropTypes.array,
};

function TodoList({ todoList = [], handleUpdateTodo, handleDeleteTodo }) {
  return (
    <ul className="text-xs sm:text-sm md:text-base">
      {todoList.length ? (
        todoList.map((todo) => (
          <li key={todo._id}>
            <TodoItem
              id
              {...todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          </li>
        ))
      ) : (
        <li className="rounded bg-white px-2 py-3 text-black md:px-4 md:py-6 xl:px-8">
          Không có todo
        </li>
      )}
    </ul>
  );
}

export default TodoList;
