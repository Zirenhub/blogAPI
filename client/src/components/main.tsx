import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Blog } from '../types/blog';
import Comment from './comment';

function Main() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    async function getBlog() {
      const res = await fetch(`http://localhost:7500/${id}`);
      const resData = await res.json();

      if (resData.status === 'success') {
        setBlog(resData.data);
      } else {
        setError(resData.message || 'Post not found');
      }
    }

    if (id) getBlog();
  }, [id]);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grow max-w-full">
      {blog && (
        <div>
          <div className="min-h-screen">
            <div className="flex justify-center">
              <h1 className="font-bold text-5xl border-b-4">{blog.title}</h1>
            </div>
            <article className="break-all p-12 text-center">
              <p>{blog.content}</p>
            </article>
          </div>
          <div className="flex justify-center border-t-2 p-5 bg-gray-100">
            {blog && <Comment blogID={blog._id} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
