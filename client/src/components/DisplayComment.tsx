import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { CommentT } from '../types/comment';

interface DisplayCommentsProps {
  comment: CommentT;
  comments: CommentT[];
  setComments: React.Dispatch<React.SetStateAction<CommentT[]>>;
}

function DisplayComments({
  comment,
  comments,
  setComments,
}: DisplayCommentsProps) {
  const [options, setOptions] = useState<boolean>(false);
  const [user, setUser] = useContext(UserContext);
  const [deleteCommentErr, setDeleteCommentErr] = useState<string | null>(null);

  async function handleDelete(pickedComment: CommentT) {
    const commentId = pickedComment._id;
    const postId = pickedComment.post;

    try {
      const res = await fetch(
        `http://localhost:7500/${postId}/comments/${commentId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      const resData = await res.json();
      if (resData.status === 'success') {
        const newComments = comments.filter((x) => {
          return x._id !== commentId;
        });
        setComments(newComments);
      } else {
        throw { ...resData };
      }
    } catch (err: any) {
      setDeleteCommentErr(err?.message);
    }
  }

  return (
    <>
      {deleteCommentErr && <p>{deleteCommentErr}</p>}
      <div key={comment._id} className="rounded border-2 bg-gray-50 p-2 w-fit">
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
                <button
                  type="button"
                  className="hover:underline"
                  onClick={() => handleDelete(comment)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <p>{comment.content}</p>
      </div>
    </>
  );
}

export default DisplayComments;
