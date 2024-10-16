import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import todoApi from '~/apis/todoApi';
import { logout } from '../LoginPanel/userSlice';
import { useDebounce } from '~/hooks/useDebounce';

import TodoSkeleton from '~/components/TodoSkeleton';
import TodoForm from '~/pages/TodoApp/components/TodoForm';
import TodoList from '~/pages/TodoApp/components/TodoList';
import LoadingSpinner from '~/components/LoadingSpinner';

import { MODE } from '~/constant/modes';

function TodoApp() {
  const dispatch = useDispatch();
  const [todoList, setTodoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTodoListStatus, setFetchTodoListStatus] = useState(false);
  const debounced = useDebounce(searchTerm, 500);

  const getTodoList = async (searchTerm) => {
    try {
      const params = {};
      if (searchTerm) {
        params.q = searchTerm;
      }
      setIsLoading(true);
      const {
        data: { listTodo },
      } = await todoApi.getAll(params);
      setTodoList(listTodo);
    } catch (error) {
      throw new Error('Fetch todo list failed');
    } finally {
      setIsLoading(false);
      setFetchTodoListStatus(true);
    }
  };

  const handleCreateTodo = async (todo, prevMode) => {
    try {
      setIsLoading(true);
      const { data } = await todoApi.create({ todo });
      if (prevMode === MODE.SEARCH) {
        getTodoList();
      } else {
        setTodoList((prevTodoList) => [data, ...prevTodoList]);
      }
      toast.success('Thêm mới todo thành công');
    } catch {
      toast.error('Thêm mới todo thất bại');
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
      setTodoList((prevTodoList) => {
        return prevTodoList.map((todoItem) => {
          if (todoItem._id === _id) {
            return { ...todoItem, ...todo };
          }
          return todoItem;
        });
      });
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
      setTodoList((prevTodoList) => {
        return prevTodoList.filter(({ _id }) => _id !== id);
      });
      toast.success('Xóa todo thành công');
    } catch (error) {
      toast.success('Xóa todo thất bại');
      throw new Error('Fail to delete todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    const action = logout();
    dispatch(action);
  };

  // useEffect(() => {
  //   getTodoList();
  // }, []);

  useEffect(() => {
    getTodoList(debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <Fragment>
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-white bg-opacity-50"></div>
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
        <div className="mx-auto w-full p-2 sm:p-4 xl:w-4/5 xl:p-8 2xl:w-3/5">
          <h1 className="text-center">Welcome to Todo App!</h1>
          <div className="mx-auto w-full px-5 md:w-2/3 md:px-0">
            <TodoForm
              onSearchTodo={setSearchTerm}
              onCreateTodo={handleCreateTodo}
            />
          </div>
          <div className="mx-auto mt-5 w-full px-5 md:w-4/5 md:px-0">
            {fetchTodoListStatus ? (
              <TodoList
                todoList={todoList}
                handleUpdateTodo={handleUpdateTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            ) : (
              [...Array(3)].map((_, index) => <TodoSkeleton key={index} />)
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TodoApp;
