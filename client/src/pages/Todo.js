import {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import UserContext from '../context/UserContext';
import {Navigate} from 'react-router-dom';
import Header from '../components/Header';
import ViewTodos from '../components/TodoActionComponents/ViewTodos';
import EditTodo from '../components/TodoActionComponents/EditTodo';
function Todo() {
  const user = useContext(UserContext);
  if (!user.email) {
    console.log('Your need to be logged in to see this page');
    return <Navigate to={'/login'} />;
  }

  return (
    <main className="vh-100 background-1">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card mb-5">
              <div className="card-body pt-4 px-5 pb-5">
                <Header />
                <Routes>
                  <Route exact path='/' element={<ViewTodos />} />
                  <Route exact path='/:id' element={<EditTodo />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}

export default Todo;
