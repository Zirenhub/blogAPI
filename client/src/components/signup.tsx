interface SignUpPropms {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUp({ setSignUp }: SignUpPropms) {
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col bg-gray-200 rounded">
      <button
        type="button"
        onClick={() => setSignUp(false)}
        className="mt-5 mr-5 ml-auto"
      >
        X
      </button>
      <form className="px-8 pb-5 flex flex-col" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Username:
          <input type="text" className="p-1 rounded" />
        </label>
        <label className="flex flex-col">
          Email:
          <input type="email" className="p-1 rounded" />
        </label>
        <label className="flex flex-col">
          Password:
          <input type="password" className="p-1 rounded" />
        </label>
        <label className="flex flex-col">
          Confirm Password:
          <input type="password" className="p-1 rounded" />
        </label>

        <input
          type="submit"
          value="Send"
          className="py-1 px-5 bg-green-300 ml-auto rounded mt-5 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default SignUp;
