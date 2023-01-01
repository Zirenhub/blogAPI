import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { CommentT, CommentTRaw } from '../types/comment';

interface CommentProps {
  blogID: string | null;
}

function Comment({ blogID }: CommentProps) {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<CommentT[]>([]);
  const [getCommentsErr, setGetCommentsErr] = useState<string | null>(null);
  const [user, setUser] = useContext(UserContext);

  function handleComment(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setComment(target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (comment) {
      const res = await fetch(`http://localhost:7500/${blogID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: comment }),
      });
      const resData = await res.json();
      if (resData.status === 'success') {
        const resComment: CommentT = resData.data;
        setComments((current) => [resComment, ...current]);
      }
    }
  }

  useEffect(() => {
    async function getComments() {
      const res = await fetch(`http://localhost:7500/${blogID}/comments`);
      const resData = await res.json();
      if (resData.status === 'success') {
        const resComments = resData.data;
        const updatedComments: CommentT[] = resComments.map(
          (x: CommentTRaw) => {
            return {
              ...x,
              createdAt: new Date(x.createdAt),
              updatedAt: new Date(x.updatedAt),
            };
          }
        );
        setComments(updatedComments);
      } else {
        setGetCommentsErr(
          resData.message || 'Something went strong gettings comment'
        );
      }
    }
    getComments();
  }, [blogID]);

  return (
    <div className="max-w-2xl flex flex-col items-center">
      {user ? (
        <form className="min-w-comment flex flex-col" onSubmit={handleSubmit}>
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
      ) : (
        <p>Log In or Sign Up to comment.</p>
      )}
      {getCommentsErr ? (
        <p>{getCommentsErr}</p>
      ) : (
        <div className="mt-5 flex flex-col gap-5">
          {comments?.map((x) => {
            return (
              <div
                key={x._id}
                className="rounded border-2 bg-gray-50 p-2 w-fit"
              >
                <p className="border-b-2 w-fit text-gray-500">
                  {x.author.username}
                </p>
                <p>{x.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Comment;
