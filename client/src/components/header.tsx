interface HeaderProps {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setSidebar, setSignUp }: HeaderProps) {
  return (
    <div className="flex justify-between p-4 items-center bg-secondary text-dimWhite font-bold">
      <div className="flex gap-5 items-center">
        <button
          type="button"
          onClick={() => {
            setSidebar(true);
          }}
          className="w-6 flex flex-col gap-1"
        >
          <span className="w-4 block h-px bg-white rounded" />
          <span className="w-4 block h-px bg-white rounded" />
          <span className="w-4 block h-px bg-white rounded" />
        </button>
        <h1>Personal Blog</h1>
      </div>
      <div className="flex gap-5 items-center">
        <button type="button" onClick={() => setSignUp(true)}>
          Sign Up
        </button>
        <button type="button">Log In</button>
      </div>
    </div>
  );
}

export default Header;
