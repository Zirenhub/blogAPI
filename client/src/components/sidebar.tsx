import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import { BlogOverviewUpdated } from '../types/blog';

interface SidebarProps {
  blogs: BlogOverviewUpdated[];
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  error: any;
}

function Sidebar({ blogs, setSidebar, error }: SidebarProps) {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [filterIsExtended, setFilterIsExtended] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogOverviewUpdated[]>([]);

  useEffect(() => {
    function sortMostRecent() {
      return blogs.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }

    setFilteredBlogs(sortMostRecent());
    setCurrentFilter('Recent');
  }, [blogs]);

  return (
    <div
      className="flex h-full font-bold ease-in-out duration-300 flex-col gap-5 p-5 bg-primary absolute w-64 hover:w-96"
      onMouseOver={() => setIsExtended(true)}
      onMouseOut={() => setIsExtended(false)}
      onFocus={() => setIsExtended(true)} // jsx-a11y
      onBlur={() => setIsExtended(false)} // jsx-a11y
    >
      <button
        type="button"
        onClick={() => setSidebar(false)}
        className="text-white w-fit"
      >
        X
      </button>
      {error && <p>Something went wrong.</p>}
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
            onClick={() => redirect(`/${blog._id}`)}
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
