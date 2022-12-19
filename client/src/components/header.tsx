function Header() {
  return (
    <header className="bg-secondary flex items-center justify-between p-5 text-text font-bold">
      <h1 className="text-3xl">Personal Blog</h1>
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

export default Header;
