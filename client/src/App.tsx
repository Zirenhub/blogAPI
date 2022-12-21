import { useEffect, useState } from 'react';
import Main from './components/main';
import Header from './components/header';
import { Blog, UpdatedDateBlog } from './types/blog';

function App() {
  const [blogs, setBlogs] = useState<UpdatedDateBlog[]>([]);
  const [activeBlog, setActiveBlog] = useState<UpdatedDateBlog | null>(null);

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
          throw new Error('Something went wrong fetching posts');
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <Header blogs={blogs} setBlog={setActiveBlog} />
      <Main activeBlog={activeBlog} />
    </div>
  );
}
export default App;
