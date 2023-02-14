import {useEffect, useState} from 'react';
// components
import AddTask from '../AddTask';
import TaskList from '../TaskList';
import Navbar from '../Navbar';
import instance from '../../auth';
function ViewTodos() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  // const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    instance.get('/todo')
        .then((response) => {
          setTodos(response.data);
        });
  }, []);
  const filterByStatus = (listTodos = []) => {
    switch (status) {
      case 'active':
        return listTodos.filter((item) => !item['is_done']);
      case 'completed':
        return listTodos.filter((item) => item['is_done']);
      default:
        return listTodos;
    }
  };
  const addTodo = (todo = {}) => {
    setTodos([todo, ...todos]);
  };
  const updateTodo = (todo) => {
    const data = {id: todo.id, status: todo['is_done'], action: 'edit'};
    instance.post('/todo', data)
        .then(() => {
          const newTodos = todos.map((t) => {
            if (t.id === todo.id) {
              t['is_done'] = !t['is_done'];
            }
            return t;
          });
          setTodos([...newTodos]);
        });
  };
  const deleteTodo = (todo) => {
    const conf = window.confirm('You really want to delete this task?');
    if (conf) {
      const data = {id: todo.id, action: 'delete'};
      instance.post('/todo', data)
          .then(() => {
            const newTodos = todos.filter((t) => {
              return t.id !== todo.id;
            });
            setTodos([...newTodos]);
          });
    }
  };
  return (
    <>
      <AddTask addTodo={addTodo} />
      <Navbar setStatus={setStatus} status={status} />
      <TaskList
        todosList={filterByStatus(todos)}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}
export default ViewTodos;
