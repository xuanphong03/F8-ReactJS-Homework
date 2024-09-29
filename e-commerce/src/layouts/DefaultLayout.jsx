function DefaultLayout({ children }) {
  return (
    <main className=" bg-[#F5F5F5] py-10 min-h-[calc(100vh-64px)] mt-16">
      <div className="container mx-auto">{children}</div>
    </main>
  );
}

export default DefaultLayout;
