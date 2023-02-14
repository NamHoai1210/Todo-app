import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserContext from './context/UserContext';
import {useState} from 'react';
import {useEffect} from 'react';
import Todo from './pages/Todo';
import Login from './pages/Login';
import Home from './pages/Home';
import instance from './auth';
// css
import './App.css';
import './css/style.css';
function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem('refeshToken')) {
      instance.get('/')
          .then((response) => {
            setEmail(response.data.email);
            setName(response.data.name);
            setIsLoading(false);
          });
    }
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <UserContext.Provider value ={{email, setEmail, name, setName, isLoading, setIsLoading}}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/todo/*' element={<Todo/>}/>
          <Route exact path='/login/*' element={<Login/>}/>
          <Route exact path='*' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
