import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';

function Comment() {
  const [comment, setComment] = useState<string>('');
  const [user, setUser] = useContext(UserContext);

  function handleComment(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setComment(target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <div>
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
    </div>
  );
}

export default Comment;
