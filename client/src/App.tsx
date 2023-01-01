import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SignUp from './components/Signup';
import LogIn from './components/Login';

function App() {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [logIn, setLogIn] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/63a311718384a3be7cb2b6be');
    }
  }, [id, navigate]);

  return (
    <div className="h-full flex flex-col relative">
      {(signUp || logIn) && (
        <div className="absolute z-10 w-screen h-screen bg-gray-100/[.4]" />
      )}
      <Header
        setSidebar={setSidebar}
        setSignUp={setSignUp}
        setLogIn={setLogIn}
      />
      <Transition
        show={sidebar}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute h-full top-0 left-0 bottom-0"
      >
        <Sidebar setSidebar={setSidebar} />
      </Transition>
      <Transition
        show={signUp}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-1/3"
      >
        <SignUp setSignUp={setSignUp} />
      </Transition>
      <Transition
        show={logIn}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-1/3"
      >
        <LogIn setLogIn={setLogIn} />
      </Transition>
      <Main />
    </div>
  );
}
export default App;
