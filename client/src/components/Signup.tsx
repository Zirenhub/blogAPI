import { useEffect, useState } from 'react';
import { FormError } from '../types/form';

interface SignUpPropms {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

function SignUp({ setSignUp }: SignUpPropms) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError[] | null>(null);
  const [specificError, setSpecificError] = useState<string | null>(null);

  function handleUsername(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  }

  function handleEmail(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  }

  function handlePassword(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  function handleConfirmPassword(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setConfirmPassword(target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (canSubmit) {
      const res = await fetch('http://localhost:7500/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      const resData = await res.json();
      if (resData.status === 'error') {
        if (resData.data?.errors) {
          setErrors(resData.data.errors);
        } else if (resData.message) {
          setSpecificError(resData.message);
        }
      } else {
        setSignUp(false);
      }
    }
  }

  useEffect(() => {
    const usernameIsValid = username !== '';
    const emailPattern = /^\S+@\S+$/;
    const emailIsValid = emailPattern.test(email);
    const passwordIsValid =
      password.length >= 8 && password === confirmPassword;

    if (usernameIsValid && emailIsValid && passwordIsValid) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [username, email, password, confirmPassword]);

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
          <input
            type="text"
            value={username}
            onChange={handleUsername}
            className="p-1 rounded"
          />
        </label>
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            className="p-1 rounded"
          />
        </label>
        <label className="flex flex-col">
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            className="p-1 rounded"
          />
        </label>
        <label className="flex flex-col">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            className="p-1 rounded"
          />
        </label>
        {password.length < 8 && <p>Password must be at least 8 characters.</p>}
        {errors && (
          <ul>
            {errors.map((error) => {
              return (
                <li key={error.msg} className="text-red-600">
                  {error.msg}
                </li>
              );
            })}
          </ul>
        )}
        {specificError && <p>{specificError}</p>}

        <input
          type="submit"
          value="Send"
          className={`py-1 px-5 ${
            canSubmit ? 'bg-green-300' : 'bg-red-300'
          } ml-auto rounded mt-5 cursor-pointer`}
        />
      </form>
    </div>
  );
}

export default SignUp;
