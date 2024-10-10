// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  return (
    <main className="bg-white py-5">
      <div className="container mx-auto">{children}</div>
    </main>
  );
}

export default DefaultLayout;
