import { useEffect, useState } from 'react';
import { FormError } from '../types/form';

interface LogInPropms {
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function LogIn({ setLogIn }: LogInPropms) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError[] | null>(null);
  const [specificError, setSpecificError] = useState<string | null>(null);

  function handleEmail(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  }

  function handlePassword(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (canSubmit) {
      const res = await fetch('http://localhost:7500/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const resData = await res.json();
      if (resData.status === 'error') {
        if (resData.data?.errors.isArray()) {
          setErrors(resData.data.errors);
        } else if (resData.message) {
          setSpecificError(resData.message);
        }
      } else {
        setLogIn(false);
      }
    }
  }

  useEffect(() => {
    const emailPattern = /^\S+@\S+$/;
    const emailIsValid = emailPattern.test(email);
    const passwordIsValid = password.length >= 8;

    if (emailIsValid && passwordIsValid) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [email, password]);

  return (
    <div className="flex flex-col bg-gray-200 rounded">
      <button
        type="button"
        onClick={() => setLogIn(false)}
        className="mt-5 mr-5 ml-auto"
      >
        X
      </button>
      <form className="px-8 pb-5 flex flex-col" onSubmit={handleSubmit}>
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

export default LogIn;
