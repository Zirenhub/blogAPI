import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { CommentT } from '../types/comment';

interface DisplayCommentsProps {
  comments: CommentT[];
}

function DisplayComments({ comments }: DisplayCommentsProps) {
  const [options, setOptions] = useState<boolean>(false);
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="mt-5 flex flex-col gap-5">
      {comments?.map((comment: CommentT) => {
        return (
          <div
            key={comment._id}
            className="rounded border-2 bg-gray-50 p-2 w-fit"
          >
            <div className="flex justify-between gap-20">
              <p className="border-b-2 w-fit text-gray-500">
                {comment.author.username}
              </p>
              <div className="flex gap-5 items-center relative">
                <p className="text-gray-400">
                  {comment.createdAt.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </p>
                {user && comment.author._id === user._id && (
                  <button
                    type="button"
                    onClick={() => {
                      setOptions(!options);
                    }}
                  >
                    ...
                  </button>
                )}
                {options && (
                  <div className="absolute -right-10 top-7 bg-gray-100 rounded px-2 border-2">
                    <button type="button" className="hover:underline">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p>{comment.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DisplayComments;
