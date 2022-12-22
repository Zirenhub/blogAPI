import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import Main from './components/main';
import Sidebar from './components/sidebar';
import Header from './components/header';
import { Blog, UpdatedDateBlog } from './types/blog';
import SignUp from './components/signup';

function App() {
  const [blogs, setBlogs] = useState<UpdatedDateBlog[]>([]);
  const [activeBlog, setActiveBlog] = useState<UpdatedDateBlog | null>(null);
  const [error, setError] = useState(null);
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('http://localhost:7500/');
        const resData = await res.json();
        if (resData.status === 'success') {
          const resBlogs: Blog[] = resData.data;
          const updatedBlogs: UpdatedDateBlog[] = resBlogs.map((blog: Blog) => {
            return {
              ...blog,
              createdAt: new Date(blog.createdAt),
              updatedAt: new Date(blog.updatedAt),
            };
          });

          setBlogs(updatedBlogs);
          const welcomeBlog = updatedBlogs.find(
            (blog) => blog.title === 'Welcome'
          );
          if (welcomeBlog) {
            setActiveBlog(welcomeBlog);
          }
        } else {
          throw { ...resData };
        }
      } catch (err: any) {
        setError(err);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <Header setSidebar={setSidebar} setSignUp={setSignUp} />
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
        <Sidebar
          blogs={blogs}
          setActiveBlog={setActiveBlog}
          setSidebar={setSidebar}
          error={error}
        />
      </Transition>
      <Transition
        show={signUp}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute">
          <SignUp setSignUp={setSignUp} />
        </div>
      </Transition>
      <Main activeBlog={activeBlog} />
    </div>
  );
}
export default App;
