import { useEffect, useState } from 'react';
import { Blog } from '../types/blog';
import Comment from './comment';

interface MainProps {
  blogID: string | null;
}

function Main({ blogID }: MainProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // async function getComments() {
    //   try {
    //     // const res = await fetch('http://localhost:7500/');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    async function getBlog() {
      const res = await fetch(`http://localhost:7500/${blogID}`);
      const resData = await res.json();

      if (resData.status === 'success') {
        setBlog(resData.data);
      } else {
        setError('Post not found');
      }
    }

    if (blogID) getBlog();
  }, [blogID]);

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
          <div className="flex justify-center border-t-2 pt-5 bg-gray-100">
            <Comment />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
