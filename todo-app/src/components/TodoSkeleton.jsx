function TodoSkeleton() {
  return (
    <div className="mb-5 rounded-md bg-white px-8 py-6">
      <div className="mb-2 h-5 w-full animate-pulse rounded bg-slate-200"></div>
      <div className="mb-2 h-2 w-2/3 animate-pulse rounded bg-slate-200"></div>
      <div className="mb-4 h-2 w-2/3 animate-pulse rounded bg-slate-200"></div>
      <div className="flex items-center gap-3">
        <button className="animate-pulse rounded bg-green-500 px-5 py-2 hover:bg-opacity-80">
          Sửa
        </button>
        <button className="animate-pulse rounded bg-red-500 px-5 py-2 hover:bg-opacity-80">
          Xóa
        </button>
      </div>
    </div>
  );
}

export default TodoSkeleton;
