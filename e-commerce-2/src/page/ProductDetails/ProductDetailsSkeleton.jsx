function ProductDetailsSkeleton() {
  return (
    <div className="flex justify-center gap-20 items-center animate-pulse">
      <div className="basis-1/2">
        <div className="ml-auto w-3/4 p-5 border rounded border-solid border-slate-700 ">
          <div className="bg-slate-200 aspect-square">
            <img
              alt="image placeholder"
              src="https://ircsan.com/wp-content/uploads/2024/03/placeholder-image.png"
              className="size-full"
            />
          </div>
        </div>
      </div>
      <div className="basis-1/2 text-slate-700 flex flex-col justify-between gap-10">
        <div>
          <h1 className="h-8 w-60 bg-slate-200 mb-1 rounded"></h1>
          <h2 className="h-4 w-80 bg-slate-200 mb-1 rounded"></h2>
          <h3 className="h-4 w-80 bg-slate-200 mb-2 rounded"></h3>
          <div className="mb-5">
            <div className="h-2 w-80 bg-slate-200 mb-1 rounded"></div>
            <div className="h-2 w-96 bg-slate-200 mb-1 rounded"></div>
            <div className="h-2 w-80 bg-slate-200 mb-1 rounded"></div>
            <div className="h-2 w-96 bg-slate-200 mb-1 rounded"></div>
            <div className="h-2 w-80 bg-slate-200 mb-1 rounded"></div>
            <div className="h-2 w-96 bg-slate-200 mb-1 rounded"></div>
            <div className="h-2 w-80 bg-slate-200 mb-1 rounded"></div>
            <div className="h-2 w-96 bg-slate-200 mb-1 rounded"></div>
          </div>
          <h4 className="h-8 w-60 bg-slate-200 rounded"></h4>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-white bg-blue-500 transition-all rounded hover:cursor-not-allowed">
            Quay về trang chủ
          </button>
          <button className="px-4 py-2 text-white bg-green-500 transition-all rounded hover:cursor-not-allowed">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
