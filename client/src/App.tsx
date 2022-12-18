function App() {
  return (
    <header className="bg-primary flex items-center justify-between p-5">
      <h1 className="text-3xl ">Personal Blog</h1>
      <div>
        <button
          type="button"
          className="transition-all hover:scale-105 hover:underline hover:underline-offset-4"
        >
          All Enteries
        </button>
      </div>
    </header>
  );
}

export default App;
