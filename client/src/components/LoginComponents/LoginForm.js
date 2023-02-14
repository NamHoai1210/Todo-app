import {useState, useContext} from 'react';

import {Navigate} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import instance from '../../auth';
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const user = useContext(UserContext);
  function loginUser(e) {
    e.preventDefault();

    const data = {email, password};
    instance.post('/login', data)
        .then((response) => {
          localStorage.setItem('refreshToken', response.data.refreshToken);
          instance.setToken(response.data.token);
          console.log(response.data.refreshToken);
          user.setEmail(response.data.email);
          user.setName(response.data.name);
          setLoginError(false);
          setRedirect(true);
        })
        .catch((err) => {
          setLoginError(true);
          console.log(err);
        });
  }

  if (redirect) {
    return <Navigate to={'/todo/'} />;
  }

  return (
    <>
      <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
        action='' onSubmit={(e) => loginUser(e)}>
        {loginError && (
          <div className="bg-red-200 text-sm text-red-700 mb-3 px-4 py-2 rounded relative"
            role='alert'>
            LOGIN ERROR! something went wrong!
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
            Email
          </label>
          <input
            className="w-full px-3 py-2
              text-sm leading-tight text-gray-700 border rounded appearance-none
              focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="name@email.com"
            required
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3
              text-sm leading-tight text-gray-700 border rounded appearance-none
              focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            minLength='6'
            required
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2
              font-bold text-white bg-blue-500 rounded
              hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <hr className="mb-6 border-t" />
        <div className="text-center">
          <a
            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
            href="/login/register"
          >
            Create an Account!
          </a>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
