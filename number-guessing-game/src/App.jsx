import ThemeButton from "./components/ThemeButton";
import HomePage from "./pages/Home";

function App() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-500">
      <div className="absolute top-3 right-2">
        <ThemeButton />
      </div>
      <div className="px-2 py-5 border-t-8 border-solid border-teal-500">
        <HomePage />
      </div>
    </main>
  );
}

export default App;
