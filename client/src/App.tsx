import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { redirect, useParams } from 'react-router-dom';
import { BlogOverview, BlogOverviewUpdated } from './types/blog';
import { User } from './types/user';
import Main from './components/main';
import Sidebar from './components/sidebar';
import Header from './components/header';
import SignUp from './components/signup';
import LogIn from './components/login';

function App() {
  const [blogs, setBlogs] = useState<BlogOverviewUpdated[]>([]);
  const [blog, setBlog] = useState<string | null>(null);
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('http://localhost:7500/');
        const resData = await res.json();
        if (resData.status === 'success') {
          const resBlogs: BlogOverview[] = resData.data;
          const updatedBlogs: BlogOverviewUpdated[] = resBlogs.map(
            (x: BlogOverview) => {
              return {
                ...x,
                createdAt: new Date(x.createdAt),
                updatedAt: new Date(x.updatedAt),
              };
            }
          );
          setBlogs(updatedBlogs);
        } else {
          throw { ...resData };
        }
      } catch (err: any) {
        setError(err);
      }
    }
    async function getUser() {
      const res = await fetch('http://localhost:7500/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
      const resData = await res.json();
      if (resData.status === 'success') {
        setUser(resData.data);
      }
    }

    if (!id) {
      return redirect('/63a311718384a3be7cb2b6be');
    }
    setBlog(id);

    fetchBlogs();
    getUser();
  }, [id]);

  return (
    <div className="h-full flex flex-col">
      {(signUp || logIn) && (
        <div className="absolute z-10 w-screen h-screen bg-gray-100/[.4]" />
      )}
      <Header
        setSidebar={setSidebar}
        setSignUp={setSignUp}
        setLogIn={setLogIn}
        setUser={setUser}
        user={user}
      />
      <Transition
        show={sidebar}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute h-full top-0 left-0"
      >
        <Sidebar blogs={blogs} setSidebar={setSidebar} error={error} />
      </Transition>
      <Transition
        show={signUp}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-1/3"
      >
        <SignUp setSignUp={setSignUp} />
      </Transition>
      <Transition
        show={logIn}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-1/3"
      >
        <LogIn setLogIn={setLogIn} />
      </Transition>
      <Main activeBlog={activeBlog} />
    </div>
  );
}
export default App;
