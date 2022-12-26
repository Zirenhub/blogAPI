import { User } from '../types/user';

interface HeaderProps {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  user: User | null;
}

function Header({
  setSidebar,
  setSignUp,
  setLogIn,
  setUser,
  user,
}: HeaderProps) {
  async function logOut() {
    const res = await fetch('http://localhost:7500/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const resData = await res.json();
    if (resData.status === 'success') {
      setUser(null);
    }
  }

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
        {user ? (
          <>
            <p>Hello {user.username}</p>
            <button type="button" onClick={() => logOut()}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setSignUp(true)}>
              Sign Up
            </button>
            <button type="button" onClick={() => setLogIn(true)}>
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
