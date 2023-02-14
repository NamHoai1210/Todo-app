
import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import instance from '../../auth';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [haveError, setHaveError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  function registerUser(e) {
    e.preventDefault();
    const data = {firstName, lastName, email, password};
    instance.post('/register', data)
        .then(() => {
          setHaveError(false);
          setRedirect(true);
        })
        .catch(() => {
          setHaveError(true);
          setEmail('');
          setPassword('');
        });
  }

  if (redirect) {
    return <Navigate to={'/login'} />;
  }
  return (
    <>
      <h3 className="pt-4 text-2xl text-center">Hello! Let&apos;s join us</h3>
      <form className="px-8 pt-6 pb-8 bg-white rounded"
        action="" onSubmit={(e) => registerUser(e)}>
        {haveError && (
          <div className="bg-red-200 text-sm text-red-700 mb-3 px-4 py-2 rounded relative"
            role='alert'>
            REGISTER ERROR! input email exists!
          </div>
        )}
        <div className="mb-4 md:flex md:justify-between">
          <div className="md:mr-2 md:mb-0 w-full">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
              First Name
            </label>
            <input
              className="w-full px-3 py-2
                text-sm leading-tight text-gray-700 border rounded appearance-none
                focus:outline-none focus:shadow-outline"
              name="firstName" id="firstName" type="text" placeholder="First Name"
              minLength="2" required value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="md:ml-2 w-full">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="w-full px-3 py-2
              text-sm leading-tight text-gray-700 border rounded appearance-none
              focus:outline-none focus:shadow-outline"
              name="lastName" id="lastName" type="text" placeholder="Last Name"
              minLength="2" required value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
            Email
          </label>
          <input
            className="w-full px-3 py-2
              text-sm leading-tight text-gray-700 border rounded appearance-none
              focus:outline-none focus:shadow-outline"
            name="email" id="email" type="email" placeholder="name@email.com"
            minLength="8" required value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            name="password" id="password" type="password" placeholder="******************"
            minLength="6" required value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            className="w-full px-4 py-2
              font-bold text-white bg-green-500 rounded
              hover:bg-green-700 focus:outline-none focus:shadow-outline"
            type="submit">
            Register
          </button>
        </div>
      </form>
      <hr className="mb-6 border-t" />
      <div className="text-center">
        <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          href="/login">
          Already have an account? Login!
        </a>
      </div></>
  );
}
export default Register;
