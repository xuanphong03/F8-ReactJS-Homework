function DefaultLayout({ children }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-blue-400 flex items-center overflow-x-auto">
      {children}
    </div>
  );
}

export default DefaultLayout;
