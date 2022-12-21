import { UpdatedDateBlog } from '../types/blog';

interface MainProps {
  activeBlog: UpdatedDateBlog | null;
}

function Main({ activeBlog }: MainProps) {
  return (
    <div className="grow max-w-full">
      {activeBlog && (
        <div>
          <div className="flex justify-center">
            <h1 className="font-bold text-5xl border-b-4">
              {activeBlog.title}
            </h1>
          </div>
          <article className="break-all p-10 text-center">
            <p>{activeBlog.content}</p>
          </article>
        </div>
      )}
    </div>
  );
}

export default Main;
