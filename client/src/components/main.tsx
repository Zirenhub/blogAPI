import { useEffect, useState } from 'react';
import { UpdatedDateBlog } from '../types/blog';

function Main() {
  const [comment, setComment] = useState<string>('');
  const [blog, setBlog] = useState<UpdatedDateBlog | null>(null);

  function handleComment(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setComment(target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  useEffect(() => {
    // async function getComments() {
    //   try {
    //     // const res = await fetch('http://localhost:7500/');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    async function getBlog() {
      const res = await fetch(`http://localhost:7500/${id}`);
      const resData = res.json();
      console.log(resData);
    }

    if (id) getBlog();
  }, [id]);

  return (
    <div className="grow max-w-full">
      {/* {activeBlog && (
        <div>
          <div className="min-h-screen">
            <div className="flex justify-center">
              <h1 className="font-bold text-5xl border-b-4">
                {activeBlog.title}
              </h1>
            </div>
            <article className="break-all p-12 text-center">
              <p>{activeBlog.content}</p>
            </article>
          </div>
          <div className="flex justify-center border-t-2 pt-5 bg-gray-100">
            <form
              className="min-w-comment flex flex-col"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center gap-5">
                <div className="bg-profilePic w-10 h-10 bg-no-repeat bg-contain" />
                <label className="flex flex-col grow">
                  <textarea
                    value={comment}
                    onChange={handleComment}
                    className="p-1 border-4 rounded h-20"
                  />
                </label>
              </div>
              <input
                type="submit"
                value="Send"
                className="ml-auto px-5 py-1 bg-primary text-dimWhite rounded my-5 cursor-pointer"
              />
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Main;
