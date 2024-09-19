import { useDispatch } from 'react-redux';
import TodoForm from '~/pages/TodoApp/components/TodoForm';
import TodoList from '~/pages/TodoApp/components/TodoList';
import { logout } from '../LoginPanel/userSlice';
import { Fragment, useEffect, useState } from 'react';
import todoApi from '~/apis/todoApi';
import LoadingSpinner from '~/components/LoadingSpinner';
import { toast } from 'react-toastify';
import TodoSkeleton from '~/components/TodoSkeleton';

function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getTodoList = async (params) => {
    try {
      setIsLoading(true);
      const {
        data: { listTodo },
      } = await todoApi.getAll(params);
      setTodoList(listTodo);
    } catch (error) {
      throw new Error('Fetch todo list failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewTodo = async (todo) => {
    try {
      setIsLoading(true);
      await todoApi.create({ todo });
      getTodoList();
    } catch {
      throw new Error('Failed to add todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTodo = async (data) => {
    try {
      setIsLoading(true);
      const { _id, ...todo } = data;
      await todoApi.update(_id, todo);
      getTodoList();
      toast.success('Cập nhật todo thành công');
    } catch (error) {
      toast.error('Cập nhật todo thất bại');
      throw new Error('Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setIsLoading(true);
      await todoApi.delete(id);
      getTodoList();
    } catch (error) {
      throw new Error('Fail to delete todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <Fragment>
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-gray-700 bg-opacity-20"></div>
          <LoadingSpinner />
        </div>
      )}
      <div className="min-h-screen w-full bg-slate-700 text-white">
        <button
          onClick={handleLogout}
          className="m-4 rounded bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-400"
        >
          Đăng xuất
        </button>
        <div className="xl:4/5 mx-auto w-full p-2 sm:p-4 xl:p-8 2xl:w-3/5">
          <h1 className="text-center">Welcome to Todo App!</h1>
          <div className="mx-auto w-full px-5 md:w-1/2 md:px-0">
            <TodoForm onSubmit={handleAddNewTodo} />
          </div>
          <div className="mx-auto mt-5 w-full px-5 md:w-4/5 md:px-0">
            {isLoading &&
              todoList.length === 0 &&
              [...Array(3)].map((_, index) => <TodoSkeleton key={index} />)}
            <TodoList
              todoList={todoList}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TodoApp;
