import { useEffect, useState } from 'react';
import { Blog, UpdatedDateBlog } from '../types/blog';

interface BlogsProps {
  blogs: Blog[];
}

function Sidebar({ blogs }: BlogsProps) {
  const [isExtended, setIsExtended] = useState(false);
  const [filterIsExtended, setFilterIsExtended] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string>('Recent');
  const [filteredBlogs, setFilteredBlogs] = useState<UpdatedDateBlog[]>([]);

  function navigateToBlog() {}

  useEffect(() => {}, [currentFilter]);

  useEffect(() => {
    const updatedBlogs: UpdatedDateBlog[] = blogs
      .map((blog) => {
        return {
          ...blog,
          createdAt: new Date(blog.createdAt),
          updatedAt: new Date(blog.updatedAt),
        };
      })
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

    setFilteredBlogs(updatedBlogs);
  }, [blogs]);

  return (
    <div
      className="flex font-bold ease-in-out duration-300 flex-col gap-5 p-5 bg-primary border-t-4 border-r-4 border-slate-700 w-60 hover:w-80"
      onMouseOver={() => setIsExtended(true)}
      onMouseOut={() => setIsExtended(false)}
      onFocus={() => setIsExtended(true)} // jsx-a11y
      onBlur={() => setIsExtended(false)} // jsx-a11y
    >
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setFilterIsExtended(!filterIsExtended)}
          className="text-dimWhite max-w-fit"
        >
          A-Z
        </button>
        {currentFilter && <p className="text-slate-500">{currentFilter}</p>}
      </div>
      {filterIsExtended && (
        <div className="p-5 rounded bg-slate-400 flex flex-col gap-5 max-w-fit">
          <button
            type="button"
            onClick={() => setCurrentFilter('Recent')}
            className="p-1 hover:underline"
          >
            Recent
          </button>
          <button
            type="button"
            onClick={() => setCurrentFilter('Alphabetically')}
            className="p-1 hover:underline"
          >
            Alphabetically
          </button>
        </div>
      )}
      {filteredBlogs.map((blog) => {
        let shortenedName;
        if (!isExtended) {
          if (blog.title.length >= 13) {
            shortenedName = `${blog.title.slice(0, 13)}...`;
          }
        }

        return (
          <button
            key={blog._id}
            type="button"
            onClick={navigateToBlog}
            className="text-text p-2 rounded bg-red-500 transition-all hover:scale-105 hover:bg-blue-400"
          >
            {shortenedName || blog.title}
          </button>
        );
      })}
    </div>
  );
}

export default Sidebar;
