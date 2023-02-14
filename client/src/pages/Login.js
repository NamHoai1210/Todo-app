import LoginForm from '../components/LoginComponents/LoginForm';
import {Routes, Route} from 'react-router-dom';
import ChangePassword from '../components/LoginComponents/ChangePasswordForm';
import Register from '../components/LoginComponents/RegisterForm';
function Login() {
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center background-3">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg">
            <Routes>
              <Route exact path='/' element = {<LoginForm/>}/>
              <Route exact path='/change-password' element = {<ChangePassword/>}/>
              <Route exact path='/register' element = {<Register/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>


  );
}
export default Login;
