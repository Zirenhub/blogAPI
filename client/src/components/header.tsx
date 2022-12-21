import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { UpdatedDateBlog } from '../types/blog';
import Sidebar from './sidebar';

interface HeaderProps {
  blogs: UpdatedDateBlog[];
  setBlog: React.Dispatch<React.SetStateAction<UpdatedDateBlog | null>>;
}

function Header({ blogs, setBlog }: HeaderProps) {
  const [sidebar, setSidebar] = useState<boolean>(false);

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
        <button type="button">Sign In</button>
        <button type="button">Log In</button>
      </div>
      <Transition
        show={sidebar}
        enter="transition-opacity ease-in-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute h-full top-0 left-0"
      >
        <Sidebar blogs={blogs} setBlog={setBlog} setSidebar={setSidebar} />
      </Transition>
    </div>
  );
}

export default Header;
