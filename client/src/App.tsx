import { useEffect, useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import { Blog } from './types/blog';

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('http://localhost:7500/');
        const newBlogs = await res.json();
        if (newBlogs.status === 'success') {
          setBlogs(newBlogs.data);
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
    <>
      <Header />
      <div className="flex grow">
        <Sidebar blogs={blogs} />
      </div>
    </>
  );
}
export default App;
