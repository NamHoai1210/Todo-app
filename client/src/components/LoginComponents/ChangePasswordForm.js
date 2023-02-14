
import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import instance from './../../auth';
function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [haveError, setHaveError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  function changePassword(e) {
    e.preventDefault();

    const data = {newPassword, oldPassword};
    instance.post('/login/change-password', data)
        .then(() => {
          setHaveError(false);
          setRedirect(true);
        })
        .catch(() => {
          setHaveError(true);
        }).finally(() => {
          setOldPassword('');
          setNewPassword('');
        });
  }

  if (redirect) {
    return <Navigate to={'/todo'} />;
  }
  return (
    <>

      <h3 className="pt-4 text-2xl text-center">Change Password</h3>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
        action='' onSubmit={(e) => changePassword(e)}>
        {haveError && (
          <div className="bg-red-200 text-sm text-red-700 mb-3 px-4 py-2 rounded relative"
            role='alert'>
            CHANGE PASSWORD ERROR! something went wrong!
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="old-password">
            Old Password
          </label>
          <input
            className="w-full px-3 py-2
              text-sm leading-tight text-gray-700 border rounded appearance-none
              focus:outline-none focus:shadow-outline"
            name="oldPassword" id="old-password" type="password" placeholder="***********"
            minLength="6" required value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="new-password">
            New Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3
              text-sm leading-tight text-gray-700 border rounded appearance-none
              focus:outline-none focus:shadow-outline"
            name="newPassword" id="new-password" type="password" placeholder="***********"
            minLength="6" required value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            className="w-full px-4 py-2
              font-bold text-white bg-red-500 rounded
              hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="submit">
            Change Password
          </button>
        </div>
      </form>
      <hr className="mb-6 border-t" />
      <div className="text-center">
        <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
          href="/todo">
          Return to Todo page?
        </a>
      </div></>
  );
}
export default ChangePassword;
